import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AvatarList from './ChooseAvatar'
import FaceIcon from '@mui/icons-material/Face';
import AppSearchBar from '../AppBar'

import {ButtonModalStyle, IconStyle} from '../../../styles/tsxStyles/AppBar/PongMenu'
import {AvatarListStyle} from '../../../styles/tsxStyles/AppBar/Avatar'

export default function ChooseAvatarModal(props: {img: any}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
      AppSearchBar(props.img);
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
              <AvatarList/>
          </Box>
        </Modal>
        </Stack>
    );
  }
