import { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './Banner';
import io  from "socket.io-client";
import Stack from '@mui/material/Stack'
import Messages from './Messages';
import Channels from './Channels';

import '../../styles/Chat/Chat.css';

import {token} from 'index'
import {User} from 'interfaces'

const SERVER = "http://127.0.0.1:3001";
const socket = io(SERVER);

function App() {
	
	let [status, setStatus] = useState('waiting for connection');
	let [user, setUser] = useState<User>({avatar: "", id: -1, username: ""});

	useEffect(() => {
		socket.on('connect', () => {
			setStatus('connected');
			socket.on('disconnect', () => {
				setStatus('disconnected');
			})
		})
		if (socket.connected) {
			setStatus('connected');	
		}
		axios.get('http://127.0.0.1:3001/users/me',{
		headers: {
			'Authorization': token,
		}
		})
		.then(res => {
			console.log("Get request success")
			const test_data = res.data;
			socket.emit('new user', test_data.username);
			setUser(test_data)
		})
		.catch(function (err) {
			console.log("Get request failed : ", err)
		});
	}, [])

		return (
			<Stack>
				<Banner />
				<Stack className='chmsg'>
					{/* <Username /> */}
					{status}
					<Channels />
				</Stack>
				<Messages {...user}/>
			</Stack>
		);
}
export {SERVER};
export {socket};
export default App;


