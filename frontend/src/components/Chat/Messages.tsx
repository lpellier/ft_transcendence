import {useEffect, useState} from 'react';
import {socket} from './Chat';
import axios from 'axios';
import {token} from 'index';
// import io  from "socket.io-client";


import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import '../../styles/Chat/Messages.css';

import {User, Message, Room} from 'interfaces'

// import {user} from '../../pages/Homepage/Homepage'


function Messages(props : {user: User, current_room: Room}) {
	
	let [messages, setMessages] = useState<Message[]>([]);
	let [users, setUsers] = useState<User[]>([]);

	const addMessage = (newMessage: Message) => setMessages(state => [...state, {id: state.length, content: newMessage.content, userId: newMessage.userId, roomId: newMessage.roomId ,type: newMessage.type}]);
	
	useEffect(() => {
		socket.emit('get users', props.current_room.id)
	}, [])
	
	useEffect(() => {
		socket.on('get users', (users_list) => {
			setUsers(users_list);
		})
	}, [])

	function handleSubmit(e: any) {
		e.preventDefault();
		const message: string = e.target[0].value;
		const messageDto: {content: string; user: number; room: number; type: boolean} = {content: message, user: props.user.id, room: props.current_room.id, type: true} 
		if (message)
			socket.emit('chat message', messageDto);
		e.target[0].value = '';
	}

	useEffect(() => {
		socket.on('chat message', (msg) => {
			addMessage(msg);
			let objDiv = document.getElementById('messagebox');
            if (objDiv != null)
                objDiv.scrollTop = objDiv.scrollHeight;
		})
	}, [])

	// useEffect(() => {
	// 	socket.on('new user', (username) => {
	// 		let msg = username + " has entered the discussion";
	// 		addMessage(msg,);
	// 		let objDiv = document.getElementById('messagebox');
    //         if (objDiv != null)
    //             objDiv.scrollTop = objDiv.scrollHeight;
	// 	})
	// })

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
											<div className='user'><img className='avatar' src={users.find(user => user.id == item.id)?.avatar}/>{users.find(user => user.id == item.id)?.name}</div>
											
										</div>
										:
										<div className='message other flex'>
											<li className=''>{item.content}</li>
											<div className='user' ><img className='avatar' src={users.find(user => user.id == item.id)?.avatar}/>{users.find(user => user.id == item.id)?.name}</div>
											
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