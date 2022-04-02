import React, {useState, useEffect} from "react";
import io from "socket.io-client";

/*css*/
// const ChatBoxStyle = {	
//     width: '70vw',
//     height: '70vh',
//     backgroundColor: 'primary.dark',
//     '&:hover': {
//         backgroundColor: 'primary.main',
//         opacity: [0.9, 0.8, 0.7]}
// }
/*css*/

// const SERVER = "ft_transcendence-backend-1";
// const socket = socketClient (SERVER);

const socket = io("localhost:3001");


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

export default Chat;