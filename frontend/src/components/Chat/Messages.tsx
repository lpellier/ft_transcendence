import {useEffect, useState} from 'react';
import {socket} from './Chat';
import axios from 'axios';
import {token} from 'index';
// import io  from "socket.io-client";


import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import '../../styles/Chat/Messages.css';

import {User, Message, Room} from 'interfaces'

interface CreateMessageDto {
    content: string;
    user: number;
    room: number;
    type: boolean;
}

function Messages(props : {user: User, users: User[], current_room: Room}) {
	
	let [messages, setMessages] = useState<Message[]>([]);

	const addMessage = (newMessage: Message) => setMessages(state => [...state, {id: newMessage.id, content: newMessage.content, userId: newMessage.userId, roomId: newMessage.roomId ,type: newMessage.type}]);

	function handleSubmit(e: any) {
		e.preventDefault();
		const message: string = e.target[0].value;
		const messageDto: CreateMessageDto = {content: message, user: props.user.id, room: props.current_room.id, type: true} 
		console.log("messageDto = ", messageDto);
		if (message)
			socket.emit('chat message', messageDto);
		e.target[0].value = '';
	}

	useEffect(() => {
		socket.on('chat message', (msg:Message) => {
			console.log("msg = ", msg);
			addMessage(msg);
			let objDiv = document.getElementById('messagebox');
            if (objDiv != null)
				objDiv.scrollTop = objDiv.scrollHeight;
		})
	}, [])

	useEffect(() => {
		socket.on('get all messages', (msgs:Message[]) => {
			setMessages(msgs);
		})
	}, [])

    return (
	<Container >
        <Stack className='chat' spacing={2} justifyContent='space-between'>
			<ul className='messages' id='messagebox'>
				{messages.map(item=> (
					<div key={item.id}>
						{item.roomId === props.current_room.id ?
							<div>
								{item.type ?
									<div className='flexwrapper' >
										{item.userId === props.user.id ?
										<div className='message current flex'>
											<li className=''>{item.content}</li> 
											<div className='user'><img className='avatar' src={props.users.find(user => user.id === item.userId)?.avatar} alt="avatar"/>{props.users.find(user => user.id === item.userId)?.username}</div>
											
										</div>
										:
										<div className='message other flex'>
											<li className=''>{item.content}</li>
											<div className='user' ><img className='avatar' src={props.users.find(user => user.id === item.userId)?.avatar} alt="avatar"/>{props.users.find(user => user.id === item.userId)?.username}</div>
											
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
							:
							<div/>
						}
					</div>
				))}
			</ul>
			<form className="form" id="form" onSubmit={handleSubmit}>
				<Stack direction='row' spacing={1} justifyContent='space-between'>
					<input className='input' type="text" />
					<button className='button'>Miauw</button>
				</Stack>
            </form>
        </Stack>
	</Container>
    )
}

export default Messages