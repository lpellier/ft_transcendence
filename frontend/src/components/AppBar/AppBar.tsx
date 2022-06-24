import {Link} from 'react-router-dom'

import {User} from 'interfaces';
import {PlayerAvatar} from	'../Avatars';

import FriendBar from 'components/FriendBar/FriendBar';


import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ForumIcon from '@mui/icons-material/Forum'
import GamesIcon from '@mui/icons-material/Games'
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip'
import WebhookIcon from '@mui/icons-material/Webhook'

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import axios from 'axios';

import { BarStyle } from '../../styles/tsxStyles/AppBar/AppBar'


function LogOutLink() {
  
	function logout() {
  
	  axios.get('http://127.0.0.1:3001/auth/logout',
	  {
		  withCredentials: true,
	  })
	  .then(res => {
		console.log("Logout ")
	  })
	  .catch(function (err) {
		console.log("Get request failed : ", err)
	  });
  
	}
  
	return (
	  <nav>
		<Link to="/" style={{ textDecoration: 'none' }}>
		  <Button
			  onClick={logout}
			  variant="contained"
			  startIcon={<MeetingRoomIcon />}
			  color="secondary">
			Log Out
		  </Button>
		</Link>
	  </nav>
	);
}

export function AppBarButton(props: {onClick: any, icon: any, tooltip: any}) {
	return (
		<nav>
		  <Tooltip title={props.tooltip} placement="bottom">
			<Button
				variant="contained"
				color="secondary"
				onClick={props.onClick}
			>
				{props.icon}
			</Button>
			</Tooltip>
		</nav>
	  );
}

function PlayerName(props: {name: string}) {
	return (
		<Typography
		  variant="h6"
		  noWrap
		  component="div"
		  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
		>
		  {props.name}
		</Typography>
	);
}

function ProjectName() {
	return (
		<Typography
		  variant="h4"
		  noWrap
		  component="div"
		  sx={{paddingLeft: '0.5em'}}
		>
		  		GnaGna
				<WebhookIcon />
				Pong
		</Typography>
	);
}

export default function SearchAppBar(props: {user: User, users: User[], component: string, setComponent: React.Dispatch<React.SetStateAction<string>>}) {

  return (
      <AppBar position="static">
        <Toolbar style={ BarStyle }>
			<Button onClick={() => props.setComponent("Profile")}>
				<PlayerAvatar image={'http://127.0.0.1:3001/avatars/' + props.user.id + '.png'}/>
			</Button>
			<PlayerName name={props.user.username}/>
			<ProjectName />
			<Stack direction="row" spacing={2}>
				<FriendBar user={props.user} users={props.users}/>
				<AppBarButton onClick={() => props.setComponent("Game")} tooltip={"New Game"} icon={<GamesIcon />}/>
				<AppBarButton onClick={() => props.setComponent("Chat")} tooltip={"Forum"} icon={<ForumIcon />}/>
				<AppBarButton onClick={() => props.setComponent("Settings")} tooltip={"Settings"} icon={<SettingsIcon />}/>
				<LogOutLink />
			</Stack>
        </Toolbar>
      </AppBar>
	);
}