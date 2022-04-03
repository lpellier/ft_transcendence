import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

import ChooseAvatarModal from './ChooseAvatar/Modal'
import ChooseNameModal from './ChooseName/Modal'
import ChooseAuthModal from './ChooseAuth/Modal'

function LogOutLink() {
  return (
    <nav>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
            variant="contained"
            startIcon={<MeetingRoomIcon />}
            color="secondary">
          Log Out
        </Button>
      </Link>
    </nav>
  );
}

export default function PongMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
	<Tooltip title="Menu" placement="bottom">
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
        </IconButton>
		</Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem  	>
          <ChooseNameModal />
        </MenuItem>
        <MenuItem  >
          <ChooseAvatarModal />
        </MenuItem>
        <MenuItem  >
          <ChooseAuthModal />
        </MenuItem>
        <MenuItem>
         <LogOutLink />
        </MenuItem>
      </Menu>
    </div>
  );
}
