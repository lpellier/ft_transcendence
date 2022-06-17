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
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import {reqLogout} from 'requests';
import { phoneSize } from 'index';
import { IconButtonStyle } from '../../styles/tsxStyles/AppBar/PongMenu';
import {User} from 'interfaces';

function ALink(props: {linkto: string, title: string, icon: any}) {
	return (
		<nav>
		  <Link to={props.linkto} style={{ textDecoration: 'none' }}>
			<Button
				variant="contained"
				startIcon={<SettingsIcon />}
				color="secondary">
			  {props.title}
			</Button>
		  </Link>
		</nav>
	  );
}

function LogOutLink() {
	
	return (
    <nav>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
            onClick={reqLogout}
            variant="contained"
            startIcon={<MeetingRoomIcon />}
            color="secondary">
          Log Out
        </Button>
      </Link>
    </nav>
  );
}

function SettingsLink() {
	return ( <ALink linkto={"/settings"} title={"Settings"} icon={<SettingsIcon/>} /> )
}

function GameLink() {
	return ( <ALink linkto={"/game"} title={"Game"} icon={<GamesIcon />}/> )
}

function HomeLink() {
	return ( <ALink linkto={"/home"} title={"Home"} icon={<HomeIcon />} /> )
}

function ChatLink() {
	return ( <ALink linkto={"/chat"} title={"Chat"} icon={<ForumIcon />} /> )
}

function PhoneButton() {
  return (
    <div>
      <MenuItem> <HomeLink /> </MenuItem>
      <MenuItem> <GameLink /> </MenuItem>
      <MenuItem> <ChatLink /> </MenuItem>
    </div>
  );
}

export default function PongMenu(props: {user: User}) {
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
              <SettingsLink/>
            </MenuItem>
            <MenuItem>
              <LogOutLink />
            </MenuItem>
        </Paper>
      </Menu>
    </div>
  );
}
