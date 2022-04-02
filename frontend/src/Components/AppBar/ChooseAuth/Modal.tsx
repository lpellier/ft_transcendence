import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ChooseAuth from './ChooseAuth.tsx'
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45%',
    height: '25%',
    bgcolor: 'rgb(195, 183, 215, 0.8)',
    border: '3px solid black',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  
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
            startIcon={<VpnKeyIcon />}
            color="secondary">
          Choose Authentication
        </Button>
    <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
              <ChooseAuth/> 
            </Box>
            </Modal>
        </Stack>
    );
  }