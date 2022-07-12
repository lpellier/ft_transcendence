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
import {BarStyle} from '../../styles/tsxStyles/AppBar/AppBar'

function LogOutLink() {

	function logout() {
  
	  axios.get(process.env.REACT_APP_BACK_URL + '/auth/logout',
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
		<Link to="/login" style={{ textDecoration: 'none' }}>
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

function AppBarButton(props: {icon: any, link: string, tooltip: any}) {
	return (
		<nav>
		  <Link to={props.link} style={{ textDecoration: 'none' }}>
		  <Tooltip title={props.tooltip} placement="bottom">
			<Button
				variant="contained"
				color="secondary">
				{props.icon}
			</Button>
			</Tooltip>
		  </Link>
		</nav>
	);
}

function PlayerName(props: {name: string}) {
	
	return (
		<div>
			<Typography
			  variant="h6"
			  noWrap
			  component="div"
			  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
			  >
				{props.name}
			</Typography>
		</div>
	);
}

function ProjectName() {
	return (
		<Typography
		  variant="h4"
		  noWrap
		  component="div"
		  sx={{paddingRight: '15vw', paddingLeft: '25vw'}}
		>
		  		GnaGna
				<WebhookIcon />
				Pong
		</Typography>
	);
}

export default function SearchAppBar(props: {user: User, users: User[], setOtherUser: React.Dispatch<React.SetStateAction<User | undefined>>, statusMap: Map<number, string>, setStatusMap: React.Dispatch<React.SetStateAction<Map<number, string>>>}) {

  return (
      <AppBar position="static">
        <Toolbar style={ BarStyle }>
			<nav>
				<Link to="profile" style={{ textDecoration: 'none' }}>
					<PlayerAvatar image={process.env.REACT_APP_BACK_URL + '/avatars/' + props.user.id + '.png'} onClick={() => props.setOtherUser(props.user)} />
				</Link>
			</nav>
			<PlayerName name={props.user.username} />
			<ProjectName />
			<Stack direction="row" spacing={2}>
				<FriendBar user={props.user} users={props.users} statusMap={props.statusMap} setStatusMap={props.setStatusMap}/>
				<AppBarButton link="../game" tooltip={"Game"} icon={<GamesIcon />}/>
				<AppBarButton link="../chat" tooltip={"Forum"} icon={<ForumIcon />}/>
				<AppBarButton link="../settings" tooltip={"Settings"} icon={<SettingsIcon />}/>
				<LogOutLink />
			</Stack>
        </Toolbar>
    	</AppBar>
	);
}
