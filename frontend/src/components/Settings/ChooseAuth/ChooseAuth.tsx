import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import { ButtonStackStyle, Title } from '../../../styles/tsxStyles/Settings/Auth'
import { User } from 'interfaces'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import QRCode from 'react-qr-code'
import axios from 'axios'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import {ButtonModalStyle, IconStyle} from '../../../styles/tsxStyles/AppBar/PongMenu'
import {ModalChooseAuth} from '../../../styles/tsxStyles/Settings/Auth'

function GenerateQRCode(props: {url: string, setOpen: any}) {
	
	function handleClick() {
		props.setOpen(false)
	}

	return (
		<Box sx={{'& > :not(style)': {m: 1,},}}>
			<Stack spacing={1}>
				<Box sx={{display: 'flex', justifyContent: 'center'}}>
					< QRCode value={props.url} />
				</Box>
				< Button
					onClick={handleClick}
					variant="contained"
					color="secondary">
					OK I flashed !
				</Button>
			</Stack>
		</Box>
	)
}

function TFAButton(props: {user: User, setOpen: any}) {
	const [input, showedInput] = useState(false);
	const [url, setUrl] = useState("");
	const [user, setUser] = useState(props.user)

	useEffect(() => {
		axios.get(
		'http://127.0.0.1:3001/users/me',
		{
				withCredentials: true,
		})
		.then(res => {
			setUser(res.data)
		})
		.catch(err => {
			console.log("Appbar get request failed : ", err)
		})
	}, [props.setOpen])

	function patchTfaTrue() {

		axios.patch(
			'http://127.0.0.1:3001/users/me', 
			{tfa:true},
			{
				withCredentials: true, 
			})
			.then(res => {
				console.log("TFA activated")
				setUrl("otpauth://totp/transcendance_BoopBipBoop?secret=" + res.data);
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
		.then(res => {
			console.log("TFA disabled")
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
		props.setOpen(false)
	}

	return (
		<Stack>
			{user.tfa === false ?
				<div>
    				< Button
						onClick={showFlashcode}
						variant="contained"
						color="secondary">
						Activate Two Factor Authentication
					</Button>
					{input && <GenerateQRCode url={url} setOpen={props.setOpen} />}
				</div>
					:
    			< Button
					onClick={deactivateTfa}
					variant="contained"
					color="secondary">
					Deactivate Two Factor Authentication
				</Button>
			}
		</Stack>
	)
}

export default function ChooseAuth(props: {user: User}) {
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

    return (
		<Stack direction="row" style={{justifyContent: 'center'}}>
			<Button
				  onClick={handleOpen}
				  variant="contained"
				  color="secondary"
				  style={ButtonModalStyle}
				>
				<VpnKeyIcon sx={IconStyle}/>
				Choose Authentication
			</Button>
			<Modal
          		open={open}
          		onClose={handleClose}> 
				<Box sx={ModalChooseAuth}>
            		<Stack spacing={5}>
            		    <Typography sx={Title}>
            		        Change Authentication
            		    </Typography>
            		    <Stack spacing={4} sx={ButtonStackStyle}>
            		        <TFAButton user={props.user} setOpen={setOpen}/>
            		    </Stack>
            		</Stack>
				</Box>
			</Modal>
		</Stack>
    );
}
