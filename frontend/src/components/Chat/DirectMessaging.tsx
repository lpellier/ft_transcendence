
import { useState, useEffect } from 'react';
import { User, Room, Message } from 'interfaces';

import '../../styles/Chat/Channels.css';
import '../../styles/Chat/DirectMessaging.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { socket } from 'index';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';


interface CreateDMRoomDto {
    name: string;
    user1Id: number;
    user2Id: number;
}

function UserList(props: {currentUser: User, users: User[], rooms: Room[], setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, search: string}) {
    

    return (     
        <List className='user-list'>
            {props.users.map(user => (
                <div key={user.id}>
                {user.id !== props.currentUser.id?
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

export default function DirectMessaging(props: {user: User, users: User[], rooms: Room[], currentRoom: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, setComponent: React.Dispatch<React.SetStateAction<string>>}) {

    let [showUserList, setShowUserList] = useState<boolean>(false);
    let [search, setSearch] = useState<string>("");


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

    function    parseUser(roomName: string) {
        const user1Id:number = parseInt(roomName.split('-')[0]);
        const user2Id:number = parseInt(roomName.split('-')[1]);
        let   otherId:number;
        if (user1Id === props.user.id)
            otherId = user2Id;
        else
            otherId = user1Id;
        const otherUser = props.users.find(user => otherId === user.id);
        return otherUser?.username;
    }

    function    goToProfile(userId: number) {
        props.setComponent("Profile");
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
                {props.rooms.map(item => (
                    <div key={item.id}>
                        {item.ownerId == 0?
                            <div>
                                { item.id !== props.currentRoom.id ?

                                    <ListItem button className="MenuItem" onClick={() => props.setCurrentRoom(item) } >
                                        <ListItemText primary={parseUser(item.name)}/>
                                        <IconButton onClick={() => goToProfile(item.id)} ><PersonIcon/></IconButton>
                                    </ListItem>
                                :
                                    <ListItem className="MenuItem" selected >
                                        <ListItemText primary={parseUser(item.name)}/>
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