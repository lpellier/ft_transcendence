import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Modal from '@mui/material/Modal';

import CustomAvatar from './CustomAvatar';
import { CustomAvatarStyle } from '../../../styles/tsxStyles/Settings/Avatar';
import {User} from 'interfaces'

export default function ChooseAvatarButton(props: {user: User}) {
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
        <Box sx={CustomAvatarStyle}>
        	<CustomAvatar setOpen={setOpen}/>
        </Box>
      </Modal>
    </Stack>
  );
}
