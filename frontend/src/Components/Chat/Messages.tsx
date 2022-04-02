import React, {useEffect, useState} from 'react';
import {socket} from './Chat.tsx';
import '../../styles/Messages.css';

function Messages(props : {currentUser:string}) {
    interface Provider {
        id:number;
        content: string;
        user: string;
		type: boolean;
    }
	
	let [messages, setMessages] = useState<Provider[]>([]);
	// let [sentMessages, setSentMessages] = useState([]);

	const addMessage = (newMessage:string, user:string, type:boolean) => setMessages(state => [...state, {id: state.length, content: newMessage, user: user, type: type}])

	function handleSubmit(e: any) {
		e.preventDefault();
		const message = e.target[0].value;
		// addMessage(message);
		if (message)
			socket.emit('chat message', message)
		e.target[0].value = '';
	}

	useEffect(() => {
		socket.on('chat message', (msg, username) => {
			addMessage(msg, username, true);
			console.log(msg);
			let objDiv = document.getElementById('messagebox');
            if (objDiv != null)
                objDiv.scrollTop = objDiv.scrollHeight;
		})
	}, [])

	useEffect(() => {
		socket.on('new user', (username) => {
			let msg = username + " has entered the discussion";
			console.log(msg);
			addMessage(msg, username, false);
			let objDiv = document.getElementById('messagebox');
            if (objDiv != null)
                objDiv.scrollTop = objDiv.scrollHeight;
		})
	}, [])

    return (
        <div className='chat'>
			<ul className='messages' id='messagebox'>
				{messages.map(item=> (
					<div key={item.id}>
						{item.type ?
							<div className='flexwrapper' >
								{item.user === props.currentUser ?
								<div className='message current flex'>
									<li className=''>{item.content}</li> 
									<div className='user'>{item.user}</div>
								</div>
								:
								<div className='message other flex'>
									<li className=''>{item.content}</li>
									<div className='user' >{item.user}</div>
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
				<input className='input' type="text" />
				<button className='button'>Miauw</button>
            </form>
        </div>
    )
}

export default Messages