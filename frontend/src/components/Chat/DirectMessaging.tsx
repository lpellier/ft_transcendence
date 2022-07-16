
import { useState, useEffect } from 'react';
import { User, Room } from 'interfaces';
import TextField from '@mui/material/TextField';
import '../../styles/Chat/Channels.css';
import '../../styles/Chat/DirectMessaging.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { socket } from 'index';
import PersonIcon from '@mui/icons-material/Person';
import BlockIcon from '@mui/icons-material/Block';
import Games from '@mui/icons-material/Games';
import { Backdrop, ButtonGroup, IconButton, Button, Stack, Alert, Tooltip } from '@mui/material';
import {Link} from 'react-router-dom';
import { toastThatError } from 'routes/routes';

import { GameInviteButton } from '../FriendBar/FriendBar';

interface CreateDMRoomDto {
    name: string;
    user1Id: number;
    user2Id: number;
}

export default function DirectMessaging(props: {user: User, users: User[], rooms: Room[], currentRoom: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, setOtherUser: React.Dispatch<React.SetStateAction<User | undefined>>, statusMap: Map<number, string>}) {
    
    let [showUserList, setShowUserList] = useState<boolean>(false);
    let [search, setSearch] = useState<string>("");
    let [blocked, setBlocked] = useState<User[]>([]);
    
    useEffect(() => {
        socket.emit('get blocked', props.user.id);
    }, [props.user.id])

    useEffect(() => {
        const handler = () => {socket.emit('get blocked', props.user?.id)}
        socket.on('add blocked', handler);
        return () => {
            socket.off('add blocked', handler);
        }
    }, [props.user?.id])

    useEffect(() => {
        const handler = (data: User[]) => {setBlocked(data);};
        socket.on('get blocked', handler);
        return () => {
            socket.off('get blocked', handler);
        }
    }, [])

    function    parseUser(roomName: string) {
        const user1Id:number = parseInt(roomName.split('-')[0]);
        const user2Id:number = parseInt(roomName.split('-')[1]);
        let   otherId:number;
        if (user1Id === props.user.id)
            otherId = user2Id;
        else
            otherId = user1Id;
        const otherUser = props.users.find(user => otherId === user.id);
        return otherUser;
    }
    
    function UserList(props: {currentUser: User, users: User[], rooms: Room[], setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, search: string}) {
    
        return (     
            <List className='user-list'>
                {props.users.map(user => (
                    <div key={user.id}>
                    {user.id !== props.currentUser.id && blocked.find(blockedUser => blockedUser.username === user.username) === undefined?
                        <div>
                            {user.username.includes(props.search)?
                                <ListItem >
                                    <ListItemText primary={user.username}/>
                                </ListItem >
                            :
                                <div/>
                            }
                        </div>
                    :
                        <div/>
                    }
                    </div>
                ))
            }
            </List>
        )
    }

    function handleFocus(event: any) {
        setShowUserList(true);
    }

    function handleBlur() {
        setShowUserList(false);
    }

    function handleOnChange(e:any) {
        setSearch(e.target.value)
    }

    function handleOnSubmit(e: any) {
        let roomName: string;
        e.preventDefault();
        const submittedUsername: string = e.target[0].value;
        console.log('submittedUsername = ', submittedUsername)
        let clickedUser:any = props.users.find(user => user.username === submittedUsername);
        if (clickedUser && clickedUser.id !== props.user.id)
        {
            if (clickedUser.id < props.user.id)
                roomName = clickedUser.id.toString() + '-' + props.user.id.toString();
            else
                roomName = props.user.id.toString() + '-' + clickedUser.id.toString();
            if (props.rooms.find(room => room.name === roomName))
            {
                let room: any = props.rooms.find(room => room.name === roomName);
                props.setCurrentRoom(room);
            }
            else
            {
                const createDMRoomDto: CreateDMRoomDto = {name: roomName, user1Id: clickedUser.id, user2Id: props.user.id}
                socket.emit('create dm room', createDMRoomDto)
            }
        }
        setShowUserList(false);
    }

	useEffect(() => {
		const handler = () => {
			socket.emit('get rooms', props.user.id)
			socket.emit('get public rooms');
		};
		socket.on('create room', handler);
		return ( () => {
			socket.off('create room', handler);
		})
	}, [props.user.id]);

	useEffect(() => {
		const handler = () => {
			socket.emit('get rooms', props.user.id)
		};
		socket.on('create dm room', handler);
		return ( () => {
			socket.off('create dm room', handler);
		})
	}, [props.user.id])
    
    
    function UserMod(props: {user: User, users: User[], room: Room, setOtherUser: React.Dispatch<React.SetStateAction<User | undefined>>, statusMap: Map<number, string>}) {
        
        let [showBackdrop, setShowBackdrop] = useState<boolean>(false);
        
        function    blockUser(blockedId: number | undefined) {
            socket.emit('add blocked', {userId: props.user.id, blockedId: blockedId} );
            setShowBackdrop(false);
        }

        function    goToProfile(user: User | undefined) {
            // axios.get("http://127.0.0.1:3001/users/"+user?.id.toString(),
            // { withCredentials: true })
            // .then((res) => { props.setOtherUser(res.data) })
            // .catch(err => { console.log("Get user failed : ", err)})
            // ;
            props.setOtherUser(user);
        }

        function    inviteForGame(user: User| undefined) {
            if (user)
            {
                if (user && props.statusMap.get(user?.id) === 'online')
                    socket.emit('invite for game', {userId: props.user.id, otherUserId: user?.id});
                else if (props.statusMap.get(user?.id) === 'in game')
                    toastThatError('user is already in game');
                else
                    toastThatError('user is offline');
            }
            else
                toastThatError('user is offline');
        }

        return (
            <div>
                <Stack justifyContent="space-between">
                    <ListItemText primary={parseUser(props.room.name)?.username}/>
                    <Stack direction="row" >
                        <Tooltip title="Go to profile">
                            <IconButton onClick={() => goToProfile(parseUser(props.room.name))} size="small">
                                <Link to="/profile"><PersonIcon/></Link>
                            </IconButton>
                        </Tooltip>
                        {/* {parseUser(props.room.name)? */}
                        <GameInviteButton user={props.user} otherUser={parseUser(props.room.name)} statusMap={props.statusMap}/>
                            {/* : */}
                            {/* <div/> */}
                        {/* } */}
                        <Tooltip title="Block user">
                            <IconButton color='error' onClick={() => setShowBackdrop(true)} size="small">
                                <BlockIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
                <Backdrop
                    open={showBackdrop}
                >
                    <Stack alignItems="center">
                        <Alert severity="warning">
                            Are you sure you want to block {parseUser(props.room.name)?.username}?
                        </Alert>
                        <ButtonGroup>
                            <Button variant="contained" color="success" onClick={() => blockUser(parseUser(props.room.name)?.id)}>
                                Yes
                            </Button>
                            <Button variant="contained" color="error" onClick={() => setShowBackdrop(false)}>
                                No
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Backdrop>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit} >
				<TextField
					onChange={handleOnChange}
					label="search"
					color="warning"
					variant="standard"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
				/>
            </form>
            {showUserList?
                <UserList currentUser={props.user} users={props.users} rooms={props.rooms} setCurrentRoom={props.setCurrentRoom} search={search}/>
            :
                <div/>
            } 
            <List>
                {props.rooms.map(room => (
                    <div key={room.id}>
                        {blocked.find(user => parseUser(room.name)?.username === user.username) === undefined && room.ownerId === 0?
                            <div>
                                { room.id !== props.currentRoom.id ?

                                    <ListItem button className="MenuItem" onClick={() => props.setCurrentRoom(room) } sx={{ alignContent:"center" }} >
                                        <UserMod user={props.user} users={props.users} room={room} setOtherUser={props.setOtherUser} statusMap={props.statusMap}/>
                                    </ListItem>
                                :
                                    <ListItem className="MenuItem" selected  sx={{ alignContent:"center"}}>
                                        <UserMod user={props.user} users={props.users} room={room} setOtherUser={props.setOtherUser} statusMap={props.statusMap}/>
                                    </ListItem>
                                }
                            </div>
                            :
                            <div/>
                        }
                    </div>
                ))}
            </List>
        </div>
    );
}