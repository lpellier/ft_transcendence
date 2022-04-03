import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import io  from "socket.io-client";
import Messages from './Messages';
import Username from './Username';
import Channels from './Channels';

import '../../styles/Chat.css';

const SERVER = "http://localhost:3001";
const socket = io(SERVER);

function App() {
	
	
	let [status, setStatus] = useState('waiting for connection');
	let [user, setUser] = useState('');
	
	console.log(socket.connected)
	useEffect(() => {
		socket.on('connect', () => {
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
export default App;


