import {useEffect, useState} from 'react';
import {socket} from './Chat';
// import io  from "socket.io-client";


import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import '../../styles/Chat/Messages.css';

import {User, Message, Room} from 'interfaces'

// import {user} from '../../pages/Homepage/Homepage'


function Messages(props : {user: User, current_room: Room}) {
	
	let [messages, setMessages] = useState<Message[]>([]);

	const addMessage = (newMessage:string, user:User, room:Room, type:boolean) => setMessages(state => [...state, {id: state.length, content: newMessage, user: {avatar:user.avatar, id: user.id, username: user.username}, room: {id: room.id, name: room.name} ,type: type}]);
	
	
	function handleSubmit(e: any) {
		e.preventDefault();
		const message = e.target[0].value;
		// console.log("submit message room_id = ", props.current_room.id);
		// addMessage(message, user.username, true);
		if (message)
			socket.emit('chat message', message, props.user, props.current_room);
		e.target[0].value = '';
	}

	useEffect(() => {
		socket.on('chat message', (msg, user, room) => {
			// console.log(msg);
			// console.log(user);
			// console.log("recieved message room_id = ", room);
			addMessage(msg, user, room, true)	;
			let objDiv = document.getElementById('messagebox');
            if (objDiv != null)
                objDiv.scrollTop = objDiv.scrollHeight;
		})
	}, [])

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
        <Stack className='chat' spacing={2} justifyContent='space-between'>
			<ul className='messages' id='messagebox'>
				{messages.map(item=> (
					<div key={item.id}>
						{item.room.id === props.current_room.id ?
							<div>
								{item.type ?
									<div className='flexwrapper' >
										{item.user.id === props.user.id ?
										<div className='message current flex'>
											<li className=''>{item.content}</li> 
											<div className='user'><img className='avatar' src={item.user.avatar}/>{item.user.username}</div>
											
										</div>
										:
										<div className='message other flex'>
											<li className=''>{item.content}</li>
											<div className='user' ><img className='avatar' src={item.user.avatar}/>{item.user.username}</div>
											
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