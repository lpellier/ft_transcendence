import { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './Banner';
import io  from "socket.io-client";
import Stack from '@mui/material/Stack'
import Messages from './Messages';
import Channels from './Channels';

import '../../styles/Chat/Chat.css';

import {token} from 'index'
import {User, Room} from 'interfaces'

const SERVER = "http://127.0.0.1:3001";
export const socket = io(SERVER, {
	withCredentials:true,
});


function Chat() {
	
	let [status, setStatus] = useState('waiting for connection');
	let [user, setUser] = useState<User>();
	let [current_room, setCurrentRoom] = useState<Room> ({id: 1, name: "general"});
	let [users, setUsers] = useState<User[]>([]);


	
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
			console.log("user = ", user);
			if (user)
				socket.emit('get rooms', user.id)
			socket.on('disconnect', () => {
				setStatus('disconnected');
			})
		})
		if (socket.connected)
		{
			setStatus('connected');
			// console.log("user = ", user);
			if (user)
				socket.emit('get rooms', user?.id)
			if (!socket.connected)
				setStatus('disconnected');
		}
	}, [user])

	useEffect(() => {
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
	}, [])

		return (
			<Stack>
				{status}
				{user?
					<Stack direction='row' spacing='2' className='chmsg'>
						<Channels user={user} users={users} current_room={current_room} setCurrentRoom = {setCurrentRoom} />
						<Messages user={user} users={users} current_room={current_room} />
					</Stack>
					:
					<div/>
				}
			</Stack>
		);
}

export default Chat;


