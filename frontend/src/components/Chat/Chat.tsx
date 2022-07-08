import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack'
import Messages from './Messages';
import Channels from './Channels';
import Box from '@mui/material/Box';
import '../../styles/Chat/Chat.css';
import {User, Room} from 'interfaces';
import {socket} from 'index';
import { toastThatError } from 'routes/routes';


const ChatBoxComponentStyle = {	
    width: '87vw',
    minWidth: '510px',
    height: '78vh',
	

	justifyContent: 'center',
	display: 'flex',

	border: '3px solid black',
    backgroundColor: 'rgb(120, 110, 220, 0.95)',
    backgroundPosition: 'bottom left',
	backgroundRepeat: 'no-repeat',
    filter: 'drop-shadow(20px 20px 1px black)',
}

const OverallChatStyle = {
	minheight: '812px',

	width: '100%',
	height: '100%',
	justifyContent: 'center', 
	display: 'flex', 
	paddingTop: '5vh',
}

function Chat(props: {user: User | undefined, users: User[], setOtherUser: React.Dispatch<React.SetStateAction<User | undefined>>, statusMap: Map<number, string>}) {
	
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
		<Box sx={OverallChatStyle}>
			<Box sx={ChatBoxComponentStyle}>
				{props.user?
					<Stack direction='row' className='chmsg'>
						<Stack>
							{status}
							<Channels user={props.user} users={props.users} currentRoom={currentRoom} setCurrentRoom = {setCurrentRoom} setCanWrite = {setCanWrite} roomAdmins={roomAdmins} setOtherUser={props.setOtherUser} statusMap={props.statusMap}/>
						</Stack>
						<Messages user={props.user} users={props.users} currentRoom={currentRoom} canWrite = {canWrite} />
					</Stack>
					:
					<div/>
				}
			</Box>
		</Box>
	);
}

export default Chat;