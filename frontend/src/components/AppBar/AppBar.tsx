import * as React from 'react';
import {Link} from 'react-router-dom';
import PongMenu from './PongMenu'
import {PlayerAvatar} from	'../Avatars'
import Cactus from			"../../images/Avatar/Cactus.png"

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ForumIcon from '@mui/icons-material/Forum';
import GamesIcon from '@mui/icons-material/Games';
import Tooltip from '@mui/material/Tooltip';
import WebhookIcon from '@mui/icons-material/Webhook';

const BarStyle = { backgroundColor: 'rgb(40, 80, 255)',
				}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100vw',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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
		  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
		>
		  		Eneana
				<WebhookIcon />
				Pong
		</Typography>
	);
}

function PlayerAvatarBar() {
	return (
		<nav>
			<Link to="/home" style={{ textDecoration: 'none' }}>
				<PlayerAvatar img={Cactus}/>
			</Link>
	  	</nav>
	);
}

export default function SearchAppBar() {
  return (
      <AppBar position="static">
        <Toolbar style={ BarStyle }>
        	<PongMenu />
			<PlayerAvatarBar />
			<PlayerName name={"Stan"}/>
			<ProjectName />
			<Stack direction="row" spacing={2}>
				<AppBarButton link={'/game'} tooltip={"New Game"} icon={<GamesIcon />}/>
				<AppBarButton link={'/chat'} tooltip={"Forum"} icon={<ForumIcon />}/>
			</Stack>
        	<Search>
            	<SearchIconWrapper>
            	  <SearchIcon />
            	</SearchIconWrapper>
            	<StyledInputBase
            	  placeholder="Search…"
            	  inputProps={{ 'aria-label': 'search' }}
            	/>
        	</Search>
        </Toolbar>
      </AppBar>
  );
}