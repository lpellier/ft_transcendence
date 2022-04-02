import React, { useState, useEffect } from 'react';
import Banner from './Banner.tsx';
import socketClient  from "socket.io-client";
import Messages from './Messages.tsx';
import Username from './Username.tsx';
import Channels from './Channels.tsx';

import '../../styles/Chat.css';

const SERVER = "http://localhost:3001";
const socket = socketClient(SERVER);

function Chat() {
	
	let [status, setStatus] = useState('waiting for connection');

	useEffect(() => {
		socket.on('connect', () => {
			setStatus('connected');
		})
	}, [])

	  console.log(socket.connected)

	return (
		<div>
			{status}
		</div>
	);	
}
export {SERVER};
export {socket};
export default Chat;

