import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import socketClient  from "socket.io";
import Messages from './Messages';
import Username from './Username';
import Channels from './Channels';

import '../styles/App.css';

const SERVER = "http://localhost:8080";
const socket = socketClient(SERVER);

function Chat() {
	
	
	let [status, setStatus] = useState('waiting for connection');
	let [user, setUser] = useState('');
	
	useEffect(() => {
		socket.on('connection', () => {
			setStatus('connected');
			socket.on('disconnect', () => {
				setStatus('disconnected');
			})
		})
	}, [])

	if (user === '')
    {
		return (
			<div>
				<Banner />
				<Username user={user} setUser={setUser}/>
			</div>
		);
	}
	else
	{
		return (
			<div>
				<Banner />
				{/* <Username /> */}
				{status}
				<div className='chmsg'>
					<Channels />
					<Messages currentUser={user} />
				</div>
			</div>
		);
	}	
}
export {SERVER};
export {socket};
export default Chat;

