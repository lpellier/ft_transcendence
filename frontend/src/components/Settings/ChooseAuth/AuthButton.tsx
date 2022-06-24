import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import QRCode from 'react-qr-code'

import axios from 'axios'
import {getUser} from 'requests'
import {User, init_user} from 'interfaces'

function GenerateQRCode(props: {url: string}) {

	return (
		<Box sx={{'& > :not(style)': {m: 1,},}}>
			<Stack spacing={1}>
				< QRCode value={props.url} />
			</Stack>
		</Box>
	)
}

function TFAButton() {
	const [input, showedInput] = useState(false);
	const [url, setUrl] = useState("");
	const [user, setUser] = useState<User>(init_user);
	const [secret, setSecret] = useState<string>("");

	useEffect(() => {

		getUser(setUser)

	}, [])

	function patchTfaTrue() {

		axios.patch(
			'http://127.0.0.1:3001/users/me', 
			{tfa: true},
			{
				withCredentials: true, 
			})
			.then(res => {
				const secret = res.data;
				setUrl("otpauth://totp/transcendance_BoopBipBoop?secret=" + secret);
			})
			.catch(function (err) {
				console.log("Setting tfa failed :", err)
			})
	}

	function patchTfaFalse() {

		axios.patch(
			'http://127.0.0.1:3001/users/me', 
			{tfa: false},
			{
				withCredentials: true,
			})
			.catch(function (err) {
				console.log("Setting tfa failed :", err)
			})
	}

	function showFlashcode() {
			patchTfaTrue()
			showedInput(true)
	}

	function deactivateTfa() {
		patchTfaFalse()
	}

	if (user.tfa === false) {
		return (
			<Stack>
    			< Button
					onClick={showFlashcode}
					variant="contained"
					color="secondary">
					Activate Two Factor Authentication
				</Button>
				{input && < GenerateQRCode url={url} /> }
			</Stack>
    	);}
		return (
			<Stack>
    			< Button
					onClick={deactivateTfa}
					variant="contained"
					color="secondary">
					Deactivate Two Factor Authentication
				</Button>
			</Stack>
		)
  }

export {TFAButton}