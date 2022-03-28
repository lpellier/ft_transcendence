import React from 'react';
import { socket } from './App';

function Username(props: {user:string, setUser:React.Dispatch<React.SetStateAction<string>>}) {
	
	
	// let [user, setUser] = useState('');

	function handleSubmit( e: any){
		
		e.preventDefault();
		props.setUser(e.target[0].value);
		socket.emit('set username', e.target[0].value);
	}

	return (
		<div>
			<form id='form' onSubmit={handleSubmit}>
				Choose a username <br/>
				<input type='text' placeholder='username' name='user'/>
				<button>Submit</button>
			</form>
		</div>
	);

}

export default Username;