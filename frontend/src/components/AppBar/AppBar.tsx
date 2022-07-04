import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {User} from 'interfaces';
import {PlayerAvatar} from	'../Avatars';
import FriendBar from 'components/FriendBar/FriendBar';
import {ToastContainer} from 'react-toastify';
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
		  sx={{paddingRight: '10vw'}}
		>
		  		GnaGna
				<WebhookIcon />
				Pong
		</Typography>
	);
}

export default function SearchAppBar(props: {user: User, users: User[]}) {
	const [user, setUser] = useState<User>(props.user)

	useEffect(() => {
		axios.get(
		'http://127.0.0.1:3001/users/me',
		{
				withCredentials: true,
		})
		.then(res => {
			setUser(res.data)
		})
		.catch(err => {
			console.log("Appbar get request failed : ", err)
		})
	}, )


  return (
      <AppBar position="static">
		<ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
		/>
        <Toolbar style={ BarStyle }>
			<nav>
				<Link to="profile" style={{ textDecoration: 'none' }}>
					<PlayerAvatar image={'http://127.0.0.1:3001/avatars/' + user.id + '.png'} />
				</Link>
			</nav>
			<PlayerName name={user.username} />
			<ProjectName />
			<Stack direction="row" spacing={2}>
				<FriendBar user={props.user} users={props.users}/>
				<AppBarButton link="../game" tooltip={"Game"} icon={<GamesIcon />}/>
				<AppBarButton link="../chat" tooltip={"Forum"} icon={<ForumIcon />}/>
				<AppBarButton link="../settings" tooltip={"Settings"} icon={<SettingsIcon />}/>
				<LogOutLink />
			</Stack>
        </Toolbar>
    	</AppBar>
	);
}