import {Navigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { toastThatError } from './routes'

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

function PinField(props: {value: string, setPininput: any, setRedirect: any, setAuth: any}) {
	const [hasSubmitted, setHastSubmitted] = useState<boolean>(false)

	const {setPininput, setRedirect, setAuth} = props;

	useEffect(() => {
		if (hasSubmitted === true) {

			axios.post(
			'http://127.0.0.1:3001/auth/google-authenticator', 
			props.value,
			{
				withCredentials: true, 
			})
			.then(res => {
				console.log("Pin Post request success :")
				setRedirect(res.data)
				setAuth(res.data)
			})
			.catch(function (err) {
				console.log("Pin Post request failed :", err)
				toastThatError("Ho no! That Pin is not valid! :/")
			})
			setHastSubmitted(false)
		}
	}, [hasSubmitted, setAuth, setRedirect, props.value])

	function handleSubmit(e: any)
	{
		e.preventDefault();
		setPininput({value: e.target[0].value});
		e.target[0].value = "";
		setHastSubmitted(true)
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<TextField
					type="text"
					label={"Here !"}
					variant="standard"
					/>
			</form>
		</div>
	);
}

export default function TFAuth(props: {setAuth: any}) {
	const [pinInput, setPininput] = useState<string>("");
	const [redirect, setRedirect] = useState<boolean>(false);

	useEffect(() => {
		setRedirect(redirect)
	}, [redirect])

	return (
		<Box sx={BoxStyle}>
			<Stack>
				<h1 style={TitleStyle} >
					Hey, insert your Pin !
				</h1>
				<PinField value={pinInput} setPininput={setPininput} setRedirect={setRedirect} setAuth={props.setAuth}/>
				{redirect === true ?
					<Navigate to="/profile" />
						:
					<div/>
				}
			</Stack>
		</Box>
	)
}