import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { NameButtonStyle } from '../../../styles/tsxStyles/Settings/Name'
import axios from 'axios';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import {ModalChooseName} from '../../../styles/tsxStyles/Settings/Name'
import {ButtonModalStyle, IconStyle} from '../../../styles/tsxStyles/AppBar/PongMenu'
import {User} from 'interfaces'
import {toastThatError} from '../../../routes/routes'

function NameButton() {
	return (
		<Button
			style={{ backgroundColor: 'rgb(150, 100, 200)' }}
			sx={NameButtonStyle}
			variant="contained"
			color="secondary">
			Choose New name :
		</Button>
	);
}

function NameInput(props: {username: string, setter: any, setOpen: any, setUser: React.Dispatch<React.SetStateAction<User | undefined>>}) {
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	const [value, setValue] = useState<string>("")

	function closeModal() {props.setOpen(false)}

	function handleSubmit(e: any) {setIsSubmitted(true)}

	function PatchRequest() {

		axios.patch(
			'http://127.0.0.1:3001/users/me',
			{username : value},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		.then(async res => {
			console.log("Changing name success : ", props.username)
			props.setOpen(false)
			await axios.get( 'http://127.0.0.1:3001/users/me',{ withCredentials: true,})
			.then(res => {
				props.setUser(res.data)
				console.log("User : ", res.data);
			})
			.catch(err => {
				console.log("Appbar get request failed : ", err)
			})
		})
		.catch(err => {
			toastThatError('invalid username');
		});
	}

	return (
		<div>
			<Stack spacing={4}>
				<TextField
					type="text"
					label="Your name" 
					variant="standard"
					onChange={(e) => setValue(e.target.value) } 
					style={{width: '85%', justifyContent: 'center'}}
					id='name'
				/>
				<form id='ChangeNameForm' style={{width: '100%'}}>
					<Stack direction="row" spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
						<Button
							onClick={handleSubmit}
							variant="contained"
							sx={{backgroundColor: 'rgb(70, 195, 150, 0.65)', width: '20vw'}}
							>
							Ok I'm done !
						</Button>
						<Button
							onClick={closeModal}
							variant="contained"
							sx={{backgroundColor: 'rgb(195, 60, 40, 0.65)', width: '20vw'}}
							>
							Nope !
						</Button>
					</Stack>
				</form>
				</Stack>
				{isSubmitted === true?
					PatchRequest()
					:
					<div/>
				}
			</div>
	);
}

export default function ChooseName(props: {user: User, setUser: React.Dispatch<React.SetStateAction<User | undefined>>}) {
    const [new_username, setNewUsername] = useState(props.user.username);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
      		<Button
            	onClick={handleOpen}
            	variant="contained"
            	color="secondary"
            	style={ButtonModalStyle}>
          		<DriveFileRenameOutlineIcon sx={IconStyle}/>
          		Choose Name
      		</Button>
			<Modal
			  open={open}
			  onClose={handleClose}
			>
				<Box sx={ModalChooseName}>
					<Stack spacing={3}>
            	    	<NameButton />
						<NameInput
							username={new_username} 
							setter={setNewUsername} 
							setOpen={setOpen}
							setUser={props.setUser}/>
					</Stack>
          		</Box>
        	</Modal>
        </div>
    );
}
