import {useEffect, useState} from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {toastThatError} from '../App'
import {User} from 'interfaces';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const UserAPI = process.env.REACT_APP_BACK_URL + "/users/me"

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

function ChooseFirstName(props: {setter: any, value: string}) {
	const [firstName, setFirstName] = useState<string>("")

	useEffect(() => {
		props.setter(firstName)
	}, [firstName, props])

	return (
		<Box sx={LittleBoxForInput}>
			<Stack sx={{paddingLeft: '1vw', paddingTop: '1vh'}}>
				<Typography
					variant="h6"
					color='rgb(200, 100, 30)'
					sx={TitleStyle}
				>
					Choose your username:
				</Typography>
				<TextField
					variant="standard"
					error={/^[\w]{2,16}$/.test(firstName) === false}
					helperText={"Your username may only contain letters, digits or underscore, and must be at least 2 characters long."}
					inputProps={{maxLength: 16}}
					onChange={(e) => setFirstName(e.target.value)}
					style={{width: '50%', justifyContent: 'center'}}
				/>
			</Stack>
		</Box>
	)
}

export default function FirstLoginPrompt(props: {user: User | undefined}) {
	const [username, setUsername] = useState<string>("")
	const [selectedFile, setSelectedFile] = useState<any>();
	const [open, setOpen] = useState(true);
	
	function submitNameAndAvatar() {
		axios.patch(UserAPI, {username: username}, {withCredentials: true})
		.then(res => {
			console.log("Change name success : ", username)
			setOpen(false)
			if (selectedFile) {
				const formData = new FormData();
				formData.append('avatar', selectedFile)
		
				axios.put(process.env.REACT_APP_BACK_URL + "/users/upload-avatar",
				formData,
				{
					withCredentials: true,
				})
				.then(res => {console.log("Put avatar request success")})
				.catch(err => {toastThatError('Avatar upload failed')})		
			}				
			window.location.reload()
		})
		.catch(err => { 
			toastThatError('Please choose another name')} )
	}


	function ChooseFirstAvatar() {	

		const changeHandler = (event: any) => {
			if (event.target.files[0].size < 1048577 && /^image/.test(event.target.files[0].type)) {
				setSelectedFile(event.target.files[0]);
			} else {
				setSelectedFile(null);
				toastThatError("Invalid file.")
			}
		};
	
		return (
			<Box sx={LittleBoxForInput}>
				<Stack spacing={5}>
					<Typography
						variant="h6"
						color='rgb(200, 100, 30)'
						sx={TitleStyle}
					>
						Choose your avatar:
					</Typography>
					<Stack spacing={5} direction="row">
						<Button
							component="label"
							variant="contained"
							startIcon={<PhotoCamera />}
							color="secondary"
						>
							Upload
							<input hidden accept="image/*" type="file" onChange={changeHandler} />
						</Button>
						{selectedFile ? (
							<Stack spacing={2} sx={{ margin: "20px" }}>
							<Typography variant="body2">Filename: {selectedFile.name}</Typography>
							<Typography variant="body2">Filetype: {selectedFile.type}</Typography>
							<Typography variant="body2">
								Size: {Math.round(selectedFile.size / 1024)}KB
							</Typography>
							</Stack>
						) : (
							<Stack spacing={2} sx={{ margin: "20px" }}>
							<Typography variant="body2">No file selected yet</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Box>
		  );
	}

	return (
		<Modal open={open} >
			<Box sx={FirstConnexionModal}>
				<Stack spacing={3}>
					<Typography 
						variant="h5"
						color='rgb(85, 70, 230)'
						sx={TitleStyle}
					>
						Hey, first login?
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
						disabled={/^[\w]{2,16}$/.test(username) === false}
						>
						I'm all set!
					</Button>
				</Stack>
			</Box>
		</Modal>
	)
}
