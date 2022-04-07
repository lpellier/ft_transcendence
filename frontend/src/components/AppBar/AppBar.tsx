import {Link} from 'react-router-dom'
import {useState} from 'react'
import PongMenu from './PongMenu'

import {PlayerAvatar} from	'../Avatars'

import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ForumIcon from '@mui/icons-material/Forum'
import GamesIcon from '@mui/icons-material/Games'
import Tooltip from '@mui/material/Tooltip'
import WebhookIcon from '@mui/icons-material/Webhook'

import { BarStyle } from '../../styles/tsxStyles/AppBar/AppBar'

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


function PlayerAvatarBar(props: {image: any}) {
	return (
		<nav>
			<Link to="/home" style={{ textDecoration: 'none' }}>
				<PlayerAvatar image={props.image}/>
			</Link>
	  	</nav>
	);
}

export default function SearchAppBar(props: {image: any}) {

	const img = useState(props.image);

  return (
      <AppBar position="static">
        <Toolbar style={ BarStyle }>
        	<PongMenu />
			<PlayerAvatarBar image={img}/>
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
