import { useState, useEffect } from 'react';
import axios from 'axios';
import io  from "socket.io-client";
import Stack from '@mui/material/Stack'
import Messages from './Messages';
import Channels from './Channels';

import '../../styles/Chat/Chat.css';

import {token} from 'index';
import {User, Room} from 'interfaces';

const SERVER = "http://127.0.0.1:3001";
export const socket = io(SERVER, {
	withCredentials:true,
});


function Chat() {
	
	let [status, setStatus] = useState('waiting for connection');
	let [user, setUser] = useState<User>();
	let [currentRoom, setCurrentRoom] = useState<Room> ({id: 1, name: "general", ownerId: 60040, visibility: "public"});
	let [users, setUsers] = useState<User[]>([]);
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
		axios.get('http://127.0.0.1:3001/users/me',{
			headers: {
				'Authorization': token,
			}
			})
			.then(res => {
				console.log("Get request success")
				const user_data: User= res.data;
				setUser(user_data);
			})
			.catch(function (err) {
				console.log("Get request failed : ", err)
			});
		}, [])
		
		useEffect(() => {
		const init = () => {
			setStatus('connected');
			if (user)
			{
				socket.emit('get rooms', user.id);
				socket.emit('get public rooms', user.id);
				socket.emit('get all messages', user.id);
				socket.emit('new user', {userId: user.id, roomId: currentRoom.id});
			}
			if (!socket.connected)
				setStatus('disconnected');
		}
		if (socket.connected)
			init();
		else
			socket.on('connect', init)
		
	}, [user])

	useEffect(() => {
		const handler = (usersData: User[]) => {
			setUsers(usersData);
			// socket.emit('get admins', currentRoom.id);
			// console.log('socket.on("new user called")')
		}
		socket.on('new user', handler);
		return (() => {
			socket.off('new user', handler);
		})
	}, [])
	
		return (
			<Stack>
				{status}
				{user?
					<Stack direction='row' spacing='2' className='chmsg'>
						<Channels user={user} users={users} currentRoom={currentRoom} setCurrentRoom = {setCurrentRoom} setCanWrite = {setCanWrite} roomAdmins={roomAdmins}/>
						<Messages user={user} users={users} currentRoom={currentRoom} canWrite = {canWrite} />
					</Stack>
					:
					<div/>
				}
			</Stack>
		);
}

export default Chat;


