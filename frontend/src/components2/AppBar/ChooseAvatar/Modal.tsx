import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AvatarList from './ChooseAvatar'
import FaceIcon from '@mui/icons-material/Face';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgb(128, 161, 212, 0.7)',
  border: '3px solid black',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ChooseAvatarModal() {
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
            startIcon={<FaceIcon />}
            color="secondary">
          Choose avatar
        </Button>
    	<Modal
          open={open}
          onClose={handleClose}
        > 
          <Box sx={style}>
              <AvatarList/>
          </Box>
        </Modal>
        </Stack>
    );
  }
