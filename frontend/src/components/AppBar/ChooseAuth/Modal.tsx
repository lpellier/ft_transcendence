import * as React from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ChooseAuth from './ChooseAuth'
import VpnKeyIcon from '@mui/icons-material/VpnKey'

import {ModalStyle} from '../../../styles/tsxStyles/AppBar/AuthStyle'
import {ButtonModalStyle, IconStyle} from '../../../styles/tsxStyles/AppBar/PongMenu'

export default function ChooseAuthModal() {
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <Stack direction="row" spacing={2} style={{ justifyContent: 'center'}}>
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
          onClose={handleClose}
        >
          <Box sx={ModalStyle}>
              <ChooseAuth/> 
            </Box>
            </Modal>
        </Stack>
    );
  }