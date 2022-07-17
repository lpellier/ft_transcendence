import {useEffect, useState} from 'react';
import {socket} from 'index';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

import '../../styles/Chat/Messages.css';

import {User, Message, Room} from 'interfaces'

interface CreateMessageDto {
    content: string;
    user: number;
    room: number;
    type: boolean;
}

function Messages(props : {user: User, users: User[], currentRoom: Room, canWrite: boolean}) {
	
	let [messages, setMessages] = useState<Message[]>([]);

	const addMessage = (newMessage: Message) => setMessages(state => [...state, {id: newMessage.id, content: newMessage.content, userId: newMessage.userId, roomId: newMessage.roomId ,type: newMessage.type}]);

	function handleSubmit(e: any) {
		e.preventDefault();
		const message: string = e.target[0].value;
		const messageDto: CreateMessageDto = {content: message, user: props.user.id, room: props.currentRoom.id, type: true} 
		if (message)
			socket.emit('chat message', messageDto);
		e.target[0].value = '';
	}

	useEffect(() => {
		const handler = (newMessage: Message) => {
			addMessage(newMessage)
			let objDiv = document.getElementById('messagebox');
            if (objDiv != null)
				objDiv.scrollTop = objDiv.scrollHeight;
		}
		socket.on('chat message', handler)
		return () => {
			socket.off('chat message', handler)
		}
	}, [])

	useEffect(() => {
		const handler = (data: Message[]) => {setMessages(data);};
		socket.on('get all messages', handler);
		return () => {
			socket.off('get all messages', handler);
		}
	}, [])



    return (
	<Box sx={{width:'100%'}}>
        <Stack className='chat' spacing={2} justifyContent='space-between'>
			<ul className='messages' id='messagebox'>
				{messages.map(item=> (
					<div key={item.id}>
						{item.roomId === props.currentRoom.id ?
								<div className='flexwrapper' >
									{item.userId === props.user.id ?
									<div className='message current flex'>
										<Stack direction="row" className='user' spacing={1}>
											<li className=''>{item.content}</li>
											<Avatar src={process.env.REACT_APP_BACK_URL + "/avatars/"+item.userId.toString()+".png"} sx={{ width: 35, height: 35 }}/>
										</Stack>
											<div className='user'>
												{props.users.find(user => user.id === item.userId)?.username}
											</div>
									</div>
									:
									<div className='message other flex'>
										<Stack direction="row" className='user' spacing={1}>
											<Avatar src={process.env.REACT_APP_BACK_URL + "/avatars/"+item.userId.toString()+".png"} sx={{ width: 35, height: 35 }}/>
											<li className=''>{item.content}</li>
										</Stack>
												<div className='user' >
													{props.users.find(user => user.id === item.userId)?.username}
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
			{props.canWrite?
			<form className="message-form" id="form" onSubmit={handleSubmit}>
				<Stack direction='row' spacing={1} justifyContent='space-between' className="message-form">
					<input className='input' type="text" />
					<button className='miauw-button'>Miauw</button>
				</Stack>
            </form>
			:
			<div/>
			}
        </Stack>
	</Box>
    )
}

export default Messages