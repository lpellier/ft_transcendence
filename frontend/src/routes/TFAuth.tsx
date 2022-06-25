import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { valueToPercent } from '@mui/base'

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

	function handleSubmit(e: any)
	{
		e.preventDefault();
		props.setPininput({value: e.target[0].value});
		e.target[0].value = "";
	}

	useEffect(() => {

		axios.post('http://127.0.0.1:3001/auth/google-authenticator',
		JSON.parse(JSON.stringify(props.value)),
		{
			withCredentials: true,
		})
		.then(function (response) {
			console.log("Post request success");
		  })
		.catch(function (err) {
			console.log("Post request failed : ", err)
		});

	}, [props.value])

	return (
		<form id='' onSubmit={handleSubmit}>
			<TextField
				type="text"
				label={"Here !"}
				variant="standard"
			/>
		</form>
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
				<PinField  value={pinInput} setPininput={setPininput}/>
			</Stack>
		</Box>
	)

}