
import { useState, useEffect } from 'react';
import { User, Room } from 'interfaces';

import '../../styles/Chat/Channels.css';
import '../../styles/Chat/DirectMessaging.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { socket } from 'index';
import PersonIcon from '@mui/icons-material/Person';
import BlockIcon from '@mui/icons-material/Block';
import { Backdrop, ButtonGroup, IconButton, Button, Stack, Alert } from '@mui/material';
import {Link} from 'react-router-dom'

interface CreateDMRoomDto {
    name: string;
    user1Id: number;
    user2Id: number;
}


export default function DirectMessaging(props: {user: User, users: User[], rooms: Room[], currentRoom: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {
    
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
    })

    console.log("blocked = ", blocked);

    useEffect(() => {
        const handler = (data: User[]) => {setBlocked(data);};
        socket.on('get blocked', handler);
        return () => {
            socket.off('get blocked', handler);
        }
    })

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
        if (clickedUser)
        {
            if (clickedUser.id < props.user.id)
                roomName = clickedUser.id.toString() + '-' + props.user.id.toString();
            else
                roomName = props.user.id.toString() + '-' + clickedUser.id.toString();
            if (props.rooms.find(room => room.name === roomName))
            {
                console.log('room exists')
                let room: any = props.rooms.find(room => room.name === roomName);
                props.setCurrentRoom(room);
            }
            else
            {
                const createDMRoomDto: CreateDMRoomDto = {name: roomName, user1Id: clickedUser.id, user2Id: props.user.id}
                socket.emit('create dm room', createDMRoomDto)
            }
        }
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
	})

	useEffect(() => {
		const handler = () => {
			socket.emit('get rooms', props.user.id)
		};
		socket.on('create dm room', handler);
		return ( () => {
			socket.off('create dm room', handler);
		})
	})
    
    
    function UserMod(props: {user: User, users: User[], room: Room}) {
        
        let [showBackdrop, setShowBackdrop] = useState<boolean>(false);
        
        function    blockUser(blockedId: number | undefined) {
            socket.emit('add blocked', {userId: props.user.id, blockedId: blockedId} );
            setShowBackdrop(false);
        }

        return (
            <div>
                <Stack direction="row" justifyContent="space-between">
                    <ListItemText primary={parseUser(props.room.name)?.username}/>
                    <Stack direction="row" >
                        <Link to="profile"><PersonIcon/></Link>
                        <IconButton onClick={() => setShowBackdrop(true)} ><BlockIcon/></IconButton>
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
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder='search'
                onChange={handleOnChange}
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
                        {room.ownerId === 0 && blocked.find(user => parseUser(room.name)?.username === user.username) === undefined?
                            <div>
                                { room.id !== props.currentRoom.id ?

                                    <ListItem button className="MenuItem" onClick={() => props.setCurrentRoom(room) } sx={{ alignContent:"center" }} >
                                        <UserMod user={props.user} users={props.users} room={room}/>
                                    </ListItem>
                                :
                                    <ListItem className="MenuItem" selected  sx={{ alignContent:"center"}}>
                                           <UserMod user={props.user} users={props.users} room={room}/>
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