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
	let [current_room, setCurrentRoom] = useState<Room> ({id: 1, name: "general", ownerId: 60040, visibility: "public"});
	let [users, setUsers] = useState<User[]>([]);
	let [canWrite, setCanWrite] = useState<boolean>(true);


	
	useEffect(() => {
		axios.get('http://127.0.0.1:3001/users/me',{
			headers: {
				'Authorization': token,
			}
			})
			.then(res => {
				console.log("Get request success")
				const test_data: User= res.data;
				setUser(test_data);
			})
			.catch(function (err) {
				console.log("Get request failed : ", err)
			});
		}, [])
		
		useEffect(() => {
		socket.on('connect', () => {
			setStatus('connected');
			if (user)
			{
				socket.emit('get rooms', user.id);
				socket.emit('get public rooms', user.id);
				socket.emit('get all messages', user.id);
				socket.emit('new user', current_room.id);
			}
				socket.on('disconnect', () => {
				setStatus('disconnected');
			})
		})
		if (socket.connected)
		{
			setStatus('connected');
			if (user)
			{
				socket.emit('get rooms', user.id);
				socket.emit('get public rooms', user.id);
				socket.emit('get all messages', user.id);
				socket.emit('new user', current_room.id);
			}
			if (!socket.connected)
				setStatus('disconnected');
		}
	}, [user])

	useEffect(() => {
		socket.on('new user', () => {
			axios.get('http://127.0.0.1:3001/users',{
			headers: {
				'Authorization': token,
			}
			})
			.then(res => {
				console.log("Get request success")
				const test_data: User[] = res.data;
				setUsers(test_data);
			})
			.catch(function (err) {
				console.log("Get request failed : ", err)
			});
		})
	}, [])
	
		return (
			<Stack>
				{status}
				{user?
					<Stack direction='row' spacing='2' className='chmsg'>
						<Channels user={user} users={users} currentRoom={current_room} setCurrentRoom = {setCurrentRoom} setCanWrite = {setCanWrite}/>
						<Messages user={user} users={users} current_room={current_room} canWrite = {canWrite} />
					</Stack>
					:
					<div/>
				}
			</Stack>
		);
}

export default Chat;


