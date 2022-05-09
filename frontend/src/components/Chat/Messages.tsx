import {useEffect, useState} from 'react';
// import {socket} from './Chat';
import io  from "socket.io-client";


import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import '../../styles/Chat/Messages.css';

import {User, Message, Room} from 'interfaces'
// import {user} from '../../pages/Homepage/Homepage'


function Messages(props : {user: User, current_room: Room}) {
	const SERVER = "http://127.0.0.1:3001";
	const socket = io(SERVER, {
		withCredentials:true,
	});
	
	let [messages, setMessages] = useState<Message[]>([]);

	const addMessage = (newMessage:string, user:User, room:Room, type:boolean) => setMessages(state => [...state, {id: state.length, content: newMessage, user: {avatar:user.avatar, id: user.id, username: user.username}, room: {id: room.id, name: room.name} ,type: type}])
	
	
	console.log(props.user.username)
	function handleSubmit(e: any) {
		e.preventDefault();
		const message = e.target[0].value;
		// addMessage(message, user.username, true);
		if (message)
			socket.emit('chat message', message, props.user, props.current_room)
		e.target[0].value = '';
	}

	useEffect(() => {
		socket.on('chat message', (msg) => {
			addMessage(msg[0], msg[1], props.current_room, true);
			let objDiv = document.getElementById('messagebox');
            if (objDiv != null)
                objDiv.scrollTop = objDiv.scrollHeight;
		})
	})

	useEffect(() => {
		socket.on('new user', (username) => {
			let msg = username + " has entered the discussion";
			addMessage(msg, username, props.current_room, false);
			let objDiv = document.getElementById('messagebox');
            if (objDiv != null)
                objDiv.scrollTop = objDiv.scrollHeight;
		})
	})

    return (
	<Container >
        <Stack className='chat' spacing={6}>
			<ul className='messages' id='messagebox'>
				{messages.map(item=> (
					<div key={item.id}>
						{item.type ?
							<div className='flexwrapper' >
								{item.user.id === props.user.id ?
								<div className='message current flex'>
									<li className=''>{item.content}</li> 
									<div className='user'>{item.user.username}</div>
								</div>
								:
								<div className='message other flex'>
									<li className=''>{item.content}</li>
									<div className='user' >{item.user.username}</div>
								</div>
								}
							</div>
						:
						<div className='flexwrapper'>
								<div className='newuser'>
									{item.content}
								</div>
							</div>
						}
					</div>
				))}
			</ul>
			<form className="form" id="form" onSubmit={handleSubmit}>
			<Stack direction='row' spacing={1}>
				<input className='input' type="text" />
				<button className='button'>Miauw</button>
			</Stack>
            </form>
        </Stack>
	</Container>
    )
}

export default Messages