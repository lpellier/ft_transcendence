import React from 'react'
import { socket } from './Chat'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles';
import {orangeTheme} from '../Themes'

const UserNameStyle = {
		padding: '2%',
		width: '30%',
		alignItems: 'center',
		colour: 'orange',
	}

function Username(props: {user:string, setUser:React.Dispatch<React.SetStateAction<string>>}) {
	
	// let [user, setUser] = useState('');

	function handleSubmit( e: any){
		
		e.preventDefault();
		props.setUser(e.target[0].value);
		socket.emit('set username', e.target[0].value);
	}

	return (
		<form id='form' onSubmit={handleSubmit}>
			<ThemeProvider theme={orangeTheme}>
				<Box sx={UserNameStyle}>
						<TextField id="outlined-basic" label="Username" variant="filled"
							type='text' placeholder='username' name='user'/>
				</Box>
			</ThemeProvider>
		</form>
	);

}

export default Username;