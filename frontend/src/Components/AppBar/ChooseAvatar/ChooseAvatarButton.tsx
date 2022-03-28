import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Modal from '@mui/material/Modal';

import CustomAvatar from './CustomAvatar.tsx';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '30%',
  bgcolor: 'rgb(195, 183, 215, 0.8)',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ChooseAvatarButton() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={2} style={{marginTop: '5%', justifyContent: 'center'}}>
      <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<AutoAwesomeIcon />}
          color="secondary">
        	Custom avatar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        	<CustomAvatar />
        </Box>
      </Modal>
    </Stack>
  );
}
