import {useState, useEffect, MouseEvent} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ForumIcon from '@mui/icons-material/Forum'
import GamesIcon from '@mui/icons-material/Games'
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper'

import ChooseAvatarModal from './ChooseAvatar/Modal'
import ChooseNameModal from './ChooseName/Modal'
import ChooseAuthModal from './ChooseAuth/Modal'

import { phoneSize } from 'index'
import { IconButtonStyle } from '../../styles/tsxStyles/AppBar/PongMenu'

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

function GameLink() {
  return (
    <nav>
      <Link to="/game" style={{ textDecoration: 'none' }}>
        <Button
            variant="contained"
            startIcon={<GamesIcon />}
            color="secondary">
          Game
        </Button>
      </Link>
    </nav>
  );
}

function HomeLink() {
  return (
    <nav>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <Button
            variant="contained"
            startIcon={<HomeIcon />}
            color="secondary">
          Home
        </Button>
      </Link>
    </nav>
  );
}

function ChatLink() {
  return (
    <nav>
      <Link to="/chat" style={{ textDecoration: 'none' }}>
        <Button
            variant="contained"
            startIcon={<ForumIcon />}
            color="secondary">
          Chat
        </Button>
      </Link>
    </nav>
  );
}

function PhoneButton() {
  return (
    <div>
      <MenuItem  	>
        <HomeLink />
      </MenuItem>
      <MenuItem  	>
        <GameLink />
      </MenuItem>
      <MenuItem  	>
        <ChatLink />
      </MenuItem>
    </div>
  );
}

export default function PongMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth);
		 window.addEventListener("resize", handleResizeWindow);
		 return () => {
		   window.removeEventListener("resize", handleResizeWindow);
		 };
	}, [])

  return (
    <div>
	<Tooltip title="Menu" placement="bottom">
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={IconButtonStyle}
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
    <Paper style={{backgroundColor: 'rgb(70, 50, 220)'}}>
        {width <= phoneSize && <PhoneButton/>}
        <MenuItem>
          <ChooseNameModal />
        </MenuItem>
        <MenuItem>
          <ChooseAvatarModal img={""}/>
        </MenuItem>
        <MenuItem >
          <ChooseAuthModal />
        </MenuItem>
        <MenuItem>
         <LogOutLink />
        </MenuItem>
          </Paper>
      </Menu>
    </div>
  );
}
