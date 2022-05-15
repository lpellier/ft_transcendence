import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ChooseName from './ChooseName'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import {ModalStyle} from '../../../styles/tsxStyles/AppBar/Name'

import {User} from 'interfaces'

export default function ChooseNameModal(props: {user: User}) {
    const [open, setOpen] = React.useState(false);
  
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
            startIcon={<DriveFileRenameOutlineIcon />}
            color="secondary">
          Choose Name
        </Button>
    <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={ModalStyle}>
            <ChooseName user={props.user}/> 
           </Box>
        </Modal>
        </Stack>
    );
  }