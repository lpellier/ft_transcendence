import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import DotsMobileStepper from './Stepper'
import {User} from 'interfaces'
import Box from '@mui/material/Box';
import FaceIcon from '@mui/icons-material/Face'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Modal from '@mui/material/Modal';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { CustomAvatarStyle } from '../../../styles/tsxStyles/Settings/Avatar';
import {ModalChooseAvatar} from '../../../styles/tsxStyles/Settings/Avatar'
import {ButtonModalStyle, IconStyle} from '../../../styles/tsxStyles/AppBar/PongMenu'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useState} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
import { ownerWindow } from '@mui/material';

const Input = styled('input')({
	display: 'none',
  });

function NoButton(props: {onClick: any}) {
	return (
		<Button 
			variant="contained" 
			style={{backgroundColor: 'rgb(200, 50, 50)',  border: '2px solid black', borderRadius: '20px'}}
			onClick={props.onClick}>
			Change my mind !
		</Button>
	);
}

function YesButton(props: {onClick: any}) {
	return (
		<Button 
			variant="contained" 
			onClick={props.onClick}
			style={{backgroundColor: 'rgb(50, 200, 50)', border: '2px solid black', borderRadius: '20px'}}>
			Let's go !
		</Button>
	);
}

function UploadButton(props: {setOpen: any}) {
	const [selectedFile, setSelectedFile] = useState<any>();
	const [isSelected, setisSelected] = useState(false);

	const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
		setisSelected(true);
	};

	function handleSubmit() {
		console.log("data input : ", selectedFile, " is :", typeof(selectedFile))

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
		.then(res => {
			console.log("Put avatar request success")
			props.setOpen(false)
		})
		.catch(err => {
			console.log("Put avatar request failed : ", err)
		})

		props.setOpen(false)
		window.location.reload()
	};

	function closeModal() {
		props.setOpen(false)
	}
	
	return (
		<div>
			<label htmlFor="icon-button-file">
				<Button 
    	    		variant="contained"
    	    		color="secondary"
					>
    				Choose file :
    			</Button>
				<Input type="file" id="icon-button-file" name="file" onChange={changeHandler} />
				<IconButton color="primary" aria-label="upload picture" component="span">
					<PhotoCamera />
  				</IconButton>
			</label>
			{isSelected ? 
			<div>
				<p>Filename: {selectedFile.name}</p>
				<p>Filetype: {selectedFile.type}</p>
				<p>Size in bytes: {selectedFile.size}</p>
			</div>
				:
				<p>No file selected yet</p>
			}
			<Stack direction="row" spacing={3}>
				<YesButton onClick={handleSubmit}/>
				<NoButton onClick={closeModal}/>
			</Stack>
		</div>
	  );
}
		
function CustomAvatar(props: {setOpen: any}) {
  return (
    <Stack spacing={2} style={{marginTop: '5%'}}>
    	<Stack direction="row" spacing={2} style={{marginTop: '5%'}}>
    		<UploadButton setOpen={props.setOpen}/>
		</Stack>
    </Stack>
  );
}

function ChooseAvatarButton(props: {user: User, setOpenOne: any}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeOne = () => {
    props.setOpenOne(false);
	window.location.reload()
  };

  return (
    <Stack direction="row" spacing={2} style={{marginTop: '5%', justifyContent: 'center'}}>
      <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<AutoAwesomeIcon />}
          color="secondary">
        	Custom avatar
      </Button>
      <Modal
		open={open}
		onClose={handleClose}
      >
    	<Box sx={CustomAvatarStyle}>
    		<CustomAvatar setOpen={setOpen}/>
    	</Box>
      </Modal>
	  <Button
          onClick={closeOne}
          variant="contained"
          startIcon={<KeyboardReturnIcon />}
          color="secondary">
        	I'm done !
      </Button>
    </Stack>
  );
}

export default function AvatarList(props: {user: User}){
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

    return (
		<Stack direction="row" spacing={2} style={{justifyContent: 'center'}}>
      		<Button
      		      onClick={handleOpen}
      		      variant="contained"
      		      color="secondary"
      		      style={ButtonModalStyle}
      		    >
      		    <FaceIcon sx={IconStyle}/>
      		    Choose avatar
      		</Button>
			  <Modal
        	  open={open}
        	  onClose={handleClose}
        	>
        	  <Box sx={ModalChooseAvatar}>
        	    <Container>
        	      <Stack spacing={2} style={{justifyContent: 'center'}}>
        	            {/* <DotsMobileStepper /> */}
        	            <ChooseAvatarButton user={props.user} setOpenOne={setOpen}/>
        	      </Stack>
        	    </Container>
				</Box>
        	</Modal>
        </Stack>
    );
}
