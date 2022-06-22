import {useState} from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {ButtonModalStyle, IconStyle} from '../../styles/tsxStyles/AppBar/PongMenu'
import {User} from 'interfaces'


export default function ChooseModal(props: {user: User, icon: any, 
	label: string, ModalBoxStyle: any, modalComp: any}) 
{
    const [open, setOpen] = useState(false);

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
          <props.icon sx={IconStyle}/>
          {props.label}
      </Button>
    	<Modal
          open={open}
          onClose={handleClose}
        > 
          <Box sx={props.ModalBoxStyle}>
			{props.modalComp}
          </Box>
        </Modal>
        </Stack>
    );
}
