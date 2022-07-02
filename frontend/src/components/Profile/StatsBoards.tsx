import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {User} from 'interfaces';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';
import { phoneSize } from 'index';
import {StatTitle, StatBox} from "../../styles/tsxStyles/Home"
import {Stats} from 'interfaces'
import axios from 'axios'

function BoardComponent(props: {icon: any, title: string}) {
	return(
		<Stack direction="row" sx={StatTitle} spacing={2}>
				{props.icon}
				<Typography>
					{props.title}
				</Typography>
		</Stack>
	);
}

function StatsBox(props: {user: User}){
	const [totGames, setTotGame] = useState<number>(props.user.victories + props.user.losses)

	useEffect(() => {
		setTotGame(props.user.victories + props.user.losses)
	}, [props.user])

	return (
		<Stack spacing={1}>
			<BoardComponent
				icon={<TimelineIcon />} 
				title="Stats" />
				<Box sx={StatBox}>
					<h3> Victories : {props.user.victories} </h3>
					<h3> Games lost : {props.user.losses} </h3>
					<h3> Total games : {totGames} </h3>
				</Box>
		</Stack>
	);
}
	
function TrophyBox(){

		return(
			<Stack spacing={1}>
				<BoardComponent 
					icon={<EmojiEventsIcon />}
					title="Trophy" />
				<Box sx={StatBox}>
				</Box>
			</Stack>
		);
}


function LeaderboardBox(props: {users: User[]}){
	const [leaders, setLeaders] = useState<Stats[]>([])
	
	useEffect(() => {
		
		axios.get(
			"http://127.0.0.1:3001/stats/lead",
			{
			withCredentials: true
		}
		)
		.then(res => {
			console.log("Get leader success: ", res.data)
			setLeaders(res.data)
		})
		.catch(err => {
			console.log("Get leader failed : ", err)
		})
	}, [])
	
	function LeaderList(props: {users: User[]}) {
	
		return (
			<List >
				{props.users.map(item => (
					<div key={item.id}>
						<ListItem>
							<ListItemText primary={item.username}/>
						</ListItem>
					</div>
				))}
			</List>
		)
	
	}

	return(
		<div>
			{leaders? 
				<Stack spacing={1}>
					<BoardComponent 
						icon={<MilitaryTechIcon />}
						title="Leaderboard" />
						<Box sx={StatBox}>
							<LeaderList users={props.users}/>
						</Box>
				</Stack>
					:
				<div/>
			}
		</div>
	);
}

function MatchhistoryBox(){

	return(
		<Stack spacing={1}>
			<BoardComponent 
				icon={<UpdateIcon />}
				title="Match history" />
				<Box sx={StatBox}>
				</Box>
			</Stack>
	);
}

export default function StatsBoards(props: {user: User, users: User[]}) {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		
		const handleResizeWindow = () => setWidth(window.innerWidth);
		 window.addEventListener("resize", handleResizeWindow);
		 return () => {
		   window.removeEventListener("resize", handleResizeWindow);
		 };
	}, [])

	if (width <= phoneSize) {
	  return (
		<Stack spacing={1}>
				<StatsBox user={props.user}/>
				<TrophyBox />
				<LeaderboardBox users={props.users}/>
				<MatchhistoryBox />
		</Stack>
	  );
	}
	return (
		<Stack direction="row" spacing={1}>
			<Stack spacing={1}>
				<StatsBox user={props.user}/>
				<TrophyBox />
			</Stack>
			<Stack spacing={1}>
				<LeaderboardBox users={props.users}/>
				<MatchhistoryBox />
			</Stack>
		</Stack>
	);
}
