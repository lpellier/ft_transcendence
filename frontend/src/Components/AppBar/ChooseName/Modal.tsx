import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ChooseName from './ChooseName.tsx'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  
export default function ChooseNameModal() {
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
          <Box sx={{ ...style, width: '60%' }}>
            <ChooseName/> 
           </Box>
        </Modal>
        </Stack>
    );
  }