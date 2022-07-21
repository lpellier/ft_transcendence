import {Link, useNavigate} from 'react-router-dom'
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
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useAuth } from "components/AuthProvider";
import { Container, TextField } from '@mui/material';
import { client, toastThatError } from 'App';
import { useState } from 'react';
import { List, ListItem } from '@mui/material';
import Avatar from '@mui/material/Avatar'
import Autocomplete from '@mui/material/Autocomplete';



function LogOutLink() {
	let auth = useAuth();
	let navigate = useNavigate();

	async function logout() {
		try {
			client.get('/auth/logout');
			console.log("Logout successful.");
			auth.signout(() => navigate("/login"));
		} catch {
			console.log("Logout failed.")
		}
	}

	return (
		<Tooltip title={"Logout"} placement="bottom">
			<Button
				onClick={logout}
				variant="contained"
				startIcon={<MeetingRoomIcon />}
				color="secondary"
			/>
		</Tooltip>
	);
}

function AppBarButton(props: {icon: any, link: string, tooltip: any}) {
	return (
		<Tooltip title={props.tooltip} placement="bottom">
			<Button
				variant="contained"
				color="secondary"
				component={Link}
				to={props.link}>
				{props.icon}
			</Button>
		</Tooltip>
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
		  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, paddingLeft: '10%', overflow: 'hidden', textOverflow: 'ellipsis'}}
		>The Ponger's Guide to the Galaxy</Typography>
	);
}


function ProfileSearch(props : {user: User, users: User[]}) {
	let navigate = useNavigate();

	function handleOnSubmit(e: any, selectedUser: User | string | null) {
		if (typeof selectedUser === 'object' && !!selectedUser) {
			navigate(`/profile/${selectedUser.id}`);
		} else if (typeof selectedUser === 'string') {
			if (props.users.find(user => user.username === selectedUser))
				navigate(`/profile/${props.users.find(user => user.username === selectedUser)?.id}`);
		}
	}

	return (
	<Autocomplete
		id="search..."
		freeSolo
		onChange={handleOnSubmit}
		options={props.users}
		getOptionLabel={(option: any) => option?.username || option}
		renderInput={(params) => <TextField {...params} label="search..." />}
	/>
	)
}

export default function SearchAppBar(props: {user: User, users: User[], statusMap: Map<number, string>, setStatusMap: React.Dispatch<React.SetStateAction<Map<number, string>>>}) {

  return (
      <AppBar position="static">
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Link to="profile">
					<PlayerAvatar image={process.env.REACT_APP_BACK_URL + '/avatars/' + props.user.id + '.png'} />
				</Link>
				<PlayerName name={props.user.username} />
				<ProjectName />
				<Stack direction="row" spacing={2}>
					<ProfileSearch user={props.user} users={props.users} />
					<FriendBar user={props.user} users={props.users} statusMap={props.statusMap} setStatusMap={props.setStatusMap}/>
					<AppBarButton link="../game" tooltip={"Game"} icon={<GamesIcon />}/>
					<AppBarButton link="../chat" tooltip={"Forum"} icon={<ForumIcon />}/>
					<AppBarButton link="../settings" tooltip={"Settings"} icon={<SettingsIcon />}/>
					<LogOutLink />
				</Stack>
			</Toolbar>
		</Container>
	</AppBar>
	);
}
