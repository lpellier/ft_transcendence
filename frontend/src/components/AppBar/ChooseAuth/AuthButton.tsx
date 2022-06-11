import {useState} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import QRCode from 'react-qr-code'
import axios from 'axios'
import {token} from 'index'

function GenerateQRCode(props: {url: string}) {

	return (
		<Box sx={{'& > :not(style)': {m: 1,},}}>
			< QRCode value={props.url} />
		</Box>
	)
}

function TFAButton() {
	const [input, showedInput] = useState(false);
	const [url, setUrl] = useState("");
	const [secret, setSecret] = useState("");
	
	function pinChoice() {
		//const otpUrl = "otpauth://totp/transcendance?secret=" +  ;
		const res = axios.get('http://127.0.0.1:3001/auth',{
		headers: {
			'Authorization': token,
			'Access-Control-Allow-Origin': 'http://127.0.0.1:3001',
		}
		})
		.then(res => {
			console.log("Get otp secret success")
			const getData = res.data;
			console.log("get secret result : ", res.data)
			setSecret(getData);
		})
		.catch(function (err) {
			console.log("Get secret failed : ", err)
		});

		showedInput(true)
		setUrl(secret)
	}

	return (
		<Stack>
    		< Button
				onClick={pinChoice}
				variant="contained"
				color="secondary">
				Activate Two Factor Authentication
			</Button>
			{input && < GenerateQRCode url={url} />}
		</Stack>
    );
  }

export {TFAButton}