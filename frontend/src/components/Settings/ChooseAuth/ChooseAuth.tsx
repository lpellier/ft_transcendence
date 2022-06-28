import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import { ButtonStackStyle, Title } from '../../../styles/tsxStyles/Settings/Auth'
import { User } from 'interfaces'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import QRCode from 'react-qr-code'
import axios from 'axios'

function GenerateQRCode(props: {url: string}) {
	
	return (
		<Box sx={{'& > :not(style)': {m: 1,},}}>
			<Stack spacing={1}>
				< QRCode value={props.url} />
			</Stack>
		</Box>
	)
}

function TFAButton(props: {user: User}) {
	const [input, showedInput] = useState(false);
	const [url, setUrl] = useState("");

	const [secret, setSecret] = useState<string>("");


	function patchTfaTrue() {

		axios.patch(
			'http://127.0.0.1:3001/users/me', 
			{tfa:true},
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
			{tfa:false},
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

	if (props.user.tfa == false) {
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

export default function ChooseAuth(props: {user: User}) {
        return (
                <Stack spacing={5}>
                    <Typography sx={Title}>
                        Change Authentication
                    </Typography>
                    <Stack spacing={4} sx={ButtonStackStyle}>
                        <TFAButton user = {props.user}/>
                    </Stack>
                </Stack>
        );
}
