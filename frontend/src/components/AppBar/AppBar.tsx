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
import axios from 'axios';
import { useAuth } from "components/AuthProvider";
import { Container } from '@mui/material';

function LogOutLink() {
	let auth = useAuth();
	let navigate = useNavigate();

	function logout() {
	  axios.get(process.env.REACT_APP_BACK_URL + '/auth/logout',
	  { withCredentials: true, })
	  .then(res => {
		console.log("Logout ")
		auth.signout(() => navigate("/login"));
	})
	  .catch(function (err) {
		console.log("Get request failed : ", err)
	  });
	}

	return (
		<Tooltip title={"Logout"} placement="bottom">
			<Button
				onClick={logout}
				variant="contained"
				startIcon={<MeetingRoomIcon />}
				color="secondary"
				sx={{height: "100%"}}
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
