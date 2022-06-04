import {useState, useEffect} from 'react';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AvatarList from './ChooseAvatar'
import FaceIcon from '@mui/icons-material/Face';

import {ButtonModalStyle, IconStyle} from '../../../styles/tsxStyles/AppBar/PongMenu'
import {AvatarListStyle} from '../../../styles/tsxStyles/AppBar/Avatar'

import {User} from 'interfaces'

export default function ChooseAvatarModal(props: {user: User}) {
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
          <FaceIcon sx={IconStyle}/>
          Choose avatar
      </Button>
    	<Modal
          open={open}
          onClose={handleClose}
        > 
          <Box sx={AvatarListStyle}>
              <AvatarList user={props.user}/>
          </Box>
        </Modal>
        </Stack>
    );
  }
