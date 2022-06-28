import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack'
import Messages from './Messages';
import Channels from './Channels';
import Box from '@mui/material/Box';


import '../../styles/Chat/Chat.css';

import {User, Room} from 'interfaces';
import {socket} from 'index';
import { Container } from '@mui/system';



const ChatBoxStyle = {	
    width: '80vw',
    minWidth: '320px',
    height: '70vh',

	border: '3px solid black',
    backgroundColor: 'rgb(120, 110, 220, 0.95)',
	// backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/09/13/22/18/stretching-2747269_960_720.png")',
	backgroundSize: '20%',
    backgroundPosition: 'bottom left',
	backgroundRepeat: 'no-repeat',
    filter: 'drop-shadow(20px 20px 1px black)',
}

function Chat(props: {user: User, users: User[], setComponent: React.Dispatch<React.SetStateAction<string>>}) {
	
	let [status, setStatus] = useState('waiting for connection');
	let [currentRoom, setCurrentRoom] = useState<Room> ({id: 1, name: "general", ownerId: 60040, visibility: "public", password:""});
	let [canWrite, setCanWrite] = useState<boolean>(true);
	let [roomAdmins, setRoomAdmins] = useState<User[]>([]);

	useEffect (() => {
		const handler = (data: User[]) => { 
			setRoomAdmins(data);
		};
		socket.on('get admins', handler);
		return () => {
			socket.off('get admins', handler);
		}
	}, [])

	useEffect(() => {
		const handler = () => { 
			socket.emit('get admins', currentRoom.id);
		};
		socket.on('admin added to room', handler);
		return () => {
			socket.off('admin added to room', handler);
		}
	})

	useEffect(() => {
		const handler = () => { 
			socket.emit('get admins', currentRoom.id);
		};
		socket.on('admin removed from room', handler);
		return () => {
			socket.off('admin removed from room', handler);
		}
	})
		
	useEffect(() => {
	const init = () => {
		setStatus('connected');
		if (props.user)
		{
			socket.emit('get rooms', props.user.id);
			socket.emit('get public rooms', props.user.id);
			socket.emit('get all messages', props.user.id);
			// socket.emit('new user', {userId: props.user.id, roomId: 1});
		}
		if (!socket.connected)
			setStatus('disconnected');
		}
		if (socket.connected)
			init();
		else
			socket.on('connect', init)
	}, [props.user])
	

	return (
		<Box sx={ChatBoxStyle} style={{ alignItems: 'center' }}>
			{status}
			{props.user?
				<Stack direction='row' spacing='2' className='chmsg'>
					<Box>
						<Channels user={props.user} users={props.users} currentRoom={currentRoom} setCurrentRoom = {setCurrentRoom} setCanWrite = {setCanWrite} roomAdmins={roomAdmins} setComponent={props.setComponent} />
					</Box>
					<Messages user={props.user} users={props.users} currentRoom={currentRoom} canWrite = {canWrite} />
				</Stack>
				:
				<div/>
			}
		</Box>
	);
}

export default Chat;


