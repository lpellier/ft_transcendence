import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import PongMenu from './PongMenu'

import axios from 'axios';
import {token} from 'index';
import {User} from 'interfaces';



import {PlayerAvatar} from	'../Avatars'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ForumIcon from '@mui/icons-material/Forum'
import GamesIcon from '@mui/icons-material/Games'
import Tooltip from '@mui/material/Tooltip'
import WebhookIcon from '@mui/icons-material/Webhook'

import {tabletSize, phoneSize} from 'index'
import { BarStyle, SearchStyle, SearchIconWrapper, StyledInputBase } from '../../styles/tsxStyles/AppBar/AppBar'

function SearchComponent() {
	return (
		<SearchStyle>
		<SearchIconWrapper>
		  <SearchIcon />
		</SearchIconWrapper>
		<StyledInputBase
		  placeholder="Search…"
		  inputProps={{ 'aria-label': 'search' }}
		/>
	</SearchStyle>
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
		  sx={{paddingLeft: '0.5em'}}
		>
		  		Eneana
				<WebhookIcon />
				Pong
		</Typography>
	);
}

function PlayerAvatarBar(props: {image: any}) {
	return (
		<nav>
			<Link to="/home" style={{ textDecoration: 'none' }}>
				<PlayerAvatar image={props.image}/>
			</Link>
	  	</nav>
	);
}

export default function SearchAppBar(props: {image: string}) {
	const [width, setWidth] = useState(window.innerWidth);
	const img = useState(props.image);
	let [user, setUser] = useState<User>({avatar: "", id: -1, username: ""});


	useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth);
		 window.addEventListener("resize", handleResizeWindow);
		 return () => {
		   window.removeEventListener("resize", handleResizeWindow);
		 };
	}, [])

	useEffect(() => {
		axios.get('http://127.0.0.1:3001/users/me',{
		headers: {
			'Authorization': token,
		}
		})
		.then(res => {
			console.log("Get request success")
			const test_data = res.data;
			// socket.emit('new user', test_data.username);
			setUser(test_data);
		})
		.catch(function (err) {
			console.log("Get request failed : ", err)
		});
	}, [user])

	if (width <= phoneSize)
	{
		return(
			<AppBar position="static">
			<Toolbar style={ BarStyle }>
				<PongMenu user = {user}/>
				<ProjectName />
			</Toolbar>
		  </AppBar>
		);
	}
	if (width <= tabletSize)
	{
		return(
			<AppBar position="static">
			<Toolbar style={ BarStyle }>
				<PongMenu user = {user}/>
				<PlayerAvatarBar image={user.avatar}/>
				<PlayerName name={""}/>
				<Stack direction="row" spacing={2}>
					<ProjectName />
					<AppBarButton link={'/game'} tooltip={"New Game"} icon={<GamesIcon />}/>
					<AppBarButton link={'/chat'} tooltip={"Forum"} icon={<ForumIcon />}/>
				</Stack>
			</Toolbar>
		  </AppBar>
		);
	}
  return (
      <AppBar position="static">
        <Toolbar style={ BarStyle }>
        	<PongMenu user = {user}/>
			<PlayerAvatarBar image={user.avatar}/>
			<PlayerName name={user.username}/>
			<ProjectName />
			<Stack direction="row" spacing={2}>
				<AppBarButton link={'/game'} tooltip={"New Game"} icon={<GamesIcon />}/>
				<AppBarButton link={'/chat'} tooltip={"Forum"} icon={<ForumIcon />}/>
			</Stack>
        	<SearchComponent />
        </Toolbar>
      </AppBar>
  );
}
