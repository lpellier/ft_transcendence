import {useState, cloneElement} from 'react';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import FaceIcon from '@mui/icons-material/Face'
import AvatarList from './ChooseAvatar/ChooseAvatar'
import ChooseName from './ChooseName/ChooseName'
import ChooseAuth from './ChooseAuth/ChooseAuth'
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
	const [isOpenAvatar, setOpenAvatar] = useState(false);
	const [isOpenName, setOpenName] = useState(false);

    return (
        <Box sx={SettingStyle}>
			{props.user?
            	<Stack spacing={5}>
            		<ChooseAvatarModal user={props.user} open={isOpenAvatar} setOpen={setOpenAvatar}/>
            	    <ChooseName user={props.user} />
            	    <ChooseAuth user={props.user} />
		    	</Stack>
					:
				<div/>
			}
        </Box>
    )
}