import {Navigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import {getUser} from 'requests'
import { User, init_user } from 'interfaces'

const profileUrl= "http://127.0.0.1:3000/profile"

const BoxStyle = {
	width: '30vw',
	height: '20vh',
	backgroundColor: 'rgb(130, 150, 240, 0.96)',
	border: '3px solid black',
	
	display: 'flex',
	justifyContent: 'center',
	VerticalAlign: 'center',
	position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const TitleStyle = {
	color: 'rgb(255, 150, 55)',
	textShadow: '1px 1px 2px black',
}

function PinField(props: {value: string, setPininput: any}) {
	const [hasSubmited, sethasSubmited] = useState<boolean>(false)
	const [user, setUser] = useState<User>(init_user)

	function handleSubmit(e: any)
	{
		e.preventDefault();
		props.setPininput({value: e.target[0].value});
		e.target[0].value = "";
		
		sethasSubmited(true);
		getUser(setUser);
	}

	useEffect(() => {
		getUser(setUser)
	}, [user])

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<TextField
					type="text"
					label={"Here !"}
					variant="standard"
					/>
			</form>
			{hasSubmited === true ?
				<Navigate replace to="profile" />
					:
					window.location.href === "http://127.0.0.1:3000/" ?
						<h3> Wrong login </h3>
						:
				<div/>
			}
		</div>
	);
}

export default function TFAuth() {
	const [pinInput, setPininput] = useState<string>("");

	return (
		<Box sx={BoxStyle}>
			<Stack>
				<h1 style={TitleStyle} >
					Hey, insert your Pin !
				</h1>
				<PinField value={pinInput} setPininput={setPininput}/>
			</Stack>
		</Box>
	)
}