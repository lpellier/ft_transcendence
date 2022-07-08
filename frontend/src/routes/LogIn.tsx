import {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {toastThatError} from './routes'
import LoginIcon from '@mui/icons-material/Login';
import WebhookIcon from '@mui/icons-material/Webhook';
import {User} from 'interfaces';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Title, ButtonStyle, LinkStyle, IconStyle} from "../styles/tsxStyles/LogIn"

const AuthAPI = "http://127.0.0.1:3001/auth"
const UserAPI = "http://127.0.0.1:3001/users/me"
const MockAuthAPI = "http://127.0.0.1:3001/auth/mock"

const Input = styled('input')({
	display: 'none',
});

const TitleStyle = {
	fontWeight: '800', 
	textShadow: '1px 1px 1px black',
}

const LittleBoxForInput = {
	width: '50vw',
	
	padding: 2,
	border: '4px solid black',
	backgroundColor: 'rgb(120, 100, 220, 0.95)',
}

const FirstConnexionModal = {
	padding: 4,
	backgroundColor: 'rgb(128, 161, 212, 0.95)',
	border: '2px solid black',
	position: 'absolute',
	top: '20%',
	left: '20%',
}

function LogInButton()
{
	return (
        <Button
			sx={ButtonStyle}
            variant="contained"
            startIcon={<LoginIcon />}
            size="large"
            color="primary"
		>
          Log in
        </Button>
	);
}

function MockLogInButton()
 {
	return (
        <Button 
			sx={ButtonStyle}
            variant="contained"
            startIcon={<LoginIcon />}
            size="large"
            color="primary"
			>
          Mock Login
        </Button>
      );
}

function ChooseFirstName(props: {setter: any, value: string}) {
	const [firstName, setFirstName] = useState<string>("")

	console.log("firstName", firstName)
	console.log("props.value", props.value)

	useEffect(() => {
		props.setter(firstName)
	}, [firstName])

	return (
		<Box sx={LittleBoxForInput}>
			<Stack sx={{paddingLeft: '1vw', paddingTop: '1vh'}}>
					<Typography
						variant="h6"
						color='rgb(200, 100, 30)'
						sx={TitleStyle}
					>
						Choose your nickname :
					</Typography>
					<TextField
						color="warning"
						label="No space, no digit por favor !" 
						variant="standard"
						onChange={(e) => setFirstName(e.target.value)}
						style={{width: '50%', justifyContent: 'center'}}
					/>
			</Stack>
		</Box>
	)
}
	
export default function LogIn(props: {user: User | undefined, auth: boolean}) {
	const [open, setOpen] = useState(true);
	const [username, setUsername] = useState<string>("")
	const [selectedFile, setSelectedFile] = useState<any>();
	const [isSelected, setisSelected] = useState(false);
	const [canRedirect, setCanRedirect] = useState(false);
	
	const handleClose = () => {
		setOpen(false);
		setCanRedirect(true);
	};
	
	useEffect(() => {

		axios.get("http://127.0.0.1:3001/users/me",
		{ withCredentials: true })
		.then(res => { console.log("Get user success")})
		.catch(err => { console.log("Get user failed : ", err)})
	}, [])

	function submitNameAndAvatar() {

		if (username.length > 0) {
			axios.patch(UserAPI, {username: username}, {withCredentials: true})
			.then(res => {
				console.log("Change name success : ", username)
				setOpen(false)
		})}

		if (selectedFile) {
			handleSubmitAvatar();
		}		
		
		setOpen(false)
		setCanRedirect(true)
	}

	function handleSubmitAvatar() {

		const formData = new FormData();
		formData.append('avatar', selectedFile)

		axios.put("http://127.0.0.1:3001/users/upload-avatar",
		formData,
		{
			withCredentials: true,
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})
		.then(res => {console.log("Put avatar request success")})
		.catch(err => {toastThatError('Avatar upload failed')})
	};
	
	function ChooseFirstAvatar() {
	
		const changeHandler = (event: any) => {
			setSelectedFile(event.target.files[0]);
			setisSelected(true);
		};
	
		return (
			<Box sx={LittleBoxForInput}>
			<Stack sx={{paddingLeft: '1vw', paddingTop: '1vh'}} spacing={10} direction="row">
				<label htmlFor="icon-button-file">
					<Button 
						variant="contained"
						sx={{
							backgroundColor: 'rgb(180, 70, 100)',
							textShadow: '1px 1px 1px black',
							border: '2px solid black',
						}}
					>
						You can choose a file :
					</Button>
					<Input type="file" id="icon-button-file" name="file" onChange={changeHandler} />
					<IconButton component="span" sx={{color: 'rgb(200, 70, 70)'}}>
						<PhotoCamera />
					  </IconButton>
				</label>
				{isSelected ? 
				<div>
					<Typography>Filename: {selectedFile.name}</Typography>
					<Typography>Filetype: {selectedFile.type}</Typography>
					<Typography>Size in bytes: {selectedFile.size}</Typography>
				</div>
					:
					<Typography>No file selected yet</Typography>
				}
				</Stack>
			</Box>
		  );
	}

    return (
        <Stack spacing={10} sx={Title}>
			<div>
				GnaGna
				<WebhookIcon sx={IconStyle}/>
				Pong
			</div>
			<nav>
				<a href={AuthAPI} style={LinkStyle}>
					<LogInButton />
				</a>
			</nav>
			<nav>
				<a href={MockAuthAPI} style={LinkStyle}>
					<MockLogInButton />
				</a>
			</nav>
			{props.user && props.user.username === null ?
				<Modal open={open} >
					<Box sx={FirstConnexionModal}>
						<Stack spacing={3}>
							<Typography 
								variant="h5"
								color='rgb(85, 70, 230)'
								sx={TitleStyle}
							>
								Hey, First LogIn ?
							</Typography>
							<ChooseFirstName setter={setUsername} value={username} />
							<ChooseFirstAvatar />
							<Button 
								onClick={submitNameAndAvatar}
								variant="contained"
								sx={{
									backgroundColor: 'rgb(100, 190, 100)',
									border: '2px solid black',
									textShadow: '1px 1px 1px black',
								}}
								>
								I'm all set !
							</Button>
							<Button 
								onClick={handleClose}
								variant="contained"
								sx={{
									backgroundColor: 'rgb(180, 70, 100)',
									border: '2px solid black',
									textShadow: '1px 1px 1px black',
								}}
								>
								Nay I'll do it later...
							</Button>
						</Stack>
					</Box>
        		</Modal>
					:
				<div />			
			}
			{canRedirect === true ?
				<Navigate replace to='/game'/>
					:
				<div />	
			}
        </Stack>
	);
}
