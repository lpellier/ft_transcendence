
import {useState, cloneElement} from 'react';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import FaceIcon from '@mui/icons-material/Face'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import AvatarList from './ChooseAvatar/ChooseAvatar'
import ChooseName from './ChooseName/ChooseName'
import ChooseAuth from './ChooseAuth/ChooseAuth'
import {ModalChooseName} from '../../styles/tsxStyles/Settings/Name'
import {ModalChooseAuth} from '../../styles/tsxStyles/Settings/Auth'
import {ModalChooseAvatar} from '../../styles/tsxStyles/Settings/Avatar'
import Button from '@mui/material/Button';
import {ButtonModalStyle, IconStyle} from '../../styles/tsxStyles/AppBar/PongMenu'
import {User} from 'interfaces'


const SettingStyle = {
    height:  '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

function ChooseAvatarModal(props: {user: User, setOpen: any, open: boolean}) {
	return (
		<ChooseModal
			user={props.user} 
			icon={FaceIcon}
			label={"Choose avatar"}
			ModalBoxStyle={ModalChooseAvatar}
			modalComp={<AvatarList user={props.user} />}
			setOpen={props.setOpen}
			open={props.open}
		/>
	)
}

function ChooseNameModal(props: {user: User, setOpen: any, open: boolean}) {
	return (
		<ChooseModal
			user={props.user} 
			icon={DriveFileRenameOutlineIcon}
			label={"Choose Name"}
			ModalBoxStyle={ModalChooseName}
			modalComp={<ChooseName user={props.user} setOpen={props.setOpen}/>}
			setOpen={props.setOpen}
			open={props.open}
		/>
	)
}

function ChooseAuthModal(props: {user: User, setOpen: any, open: boolean}) {
	return (
		<ChooseModal
			user={props.user} 
			icon={VpnKeyIcon}
			label={"Choose Authentication"}
			ModalBoxStyle={ModalChooseAuth}
			modalComp={<ChooseAuth user={props.user}/>}
			setOpen={props.setOpen}
			open={props.open}
		/>
	)
}

function ChooseModal(props: {user: User, icon: any, 
	label: string, ModalBoxStyle: any, modalComp: any, open: boolean, setOpen: any}) 
{
    const handleOpen = () => {
      props.setOpen(true);
    };
  
    const handleClose = () => {
      props.setOpen(false);
    };
  
    return (
      <Stack direction="row" spacing={2} style={{justifyContent: 'center'}}>
      <Button
            onClick={handleOpen}
            variant="contained"
            color="secondary"
            style={ButtonModalStyle}
          >
          <props.icon sx={IconStyle}/>
          {props.label}
      </Button>
    	<Modal
          open={props.open}
          onClose={handleClose}
        > 
          <Box sx={props.ModalBoxStyle}>
			{props.modalComp}
          </Box>
        </Modal>
        </Stack>
    );
}

export default function Settings(props: {user: User | undefined}) {
	const [isOpenTFA, setOpenTFA] = useState(false);
	const [isOpenAvatar, setOpenAvatar] = useState(false);
	const [isOpenName, setOpenName] = useState(false);

    return (
        <Box sx={SettingStyle}>
			{props.user?
            	<Stack spacing={5}>
            		<ChooseAvatarModal user={props.user} open={isOpenAvatar} setOpen={setOpenAvatar}/>
            	    <ChooseNameModal user={props.user} open={isOpenName} setOpen={setOpenName}/>
            	    <ChooseAuthModal user={props.user} open={isOpenTFA} setOpen={setOpenTFA}/>
		    	</Stack>
					:
				<div/>
			}
        </Box>
    )
}