import {useState, useEffect} from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';

import {Stats, init_stats, User, init_user} from 'interfaces';
import { getUser } from 'requests';
import { phoneSize } from 'index';
import {StatTitle, StatBox} from "../../styles/tsxStyles/Home"


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

function StatsBox(props: {myStats: Stats}){
	const mywins = props.myStats.wins;
	const mylosses = props.myStats.losses;
	const totGames = mywins + mylosses;

	return (
		<Stack spacing={1}>
		<BoardComponent
			icon={<TimelineIcon />} 
			title="Stats" />
			<Box sx={StatBox}>
				<h3> Victories : {mywins} </h3>
				<h3> Games lost : {mylosses} </h3>
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

function LeaderboardBox() {
	const [users, setUsers] = useState<User[]>([init_user]);

	function getWinners() {
		for (let i = 0; i < users.length; i++)
		{
			


		}
	}

	return(
		<Stack spacing={1}>
			<BoardComponent 
				icon={<MilitaryTechIcon />}
				title="Leaderboard" />
				<Box sx={StatBox}>
					<h3> Rank 1 : 'name first winner' 'level first winner'</h3>
					<h3> Rank 2 : 'name second winner' 'level second winner'</h3>
					<h3> Rank 3 : 'name third winner' 'level third winner'</h3>
				</Box>
			</Stack>
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

export default function StatsBoards() {
	const [width, setWidth] = useState(window.innerWidth);
	let [user, setUser] = useState<User>(init_user);

	useEffect(() => {
		getUser(setUser);

		const handleResizeWindow = () => setWidth(window.innerWidth);
		 window.addEventListener("resize", handleResizeWindow);
		 return () => {
		   window.removeEventListener("resize", handleResizeWindow);
		 };
	}, [])

	if (width <= phoneSize) {
	  return (
		<Stack spacing={1}>
				<StatsBox myStats={user.stats}/>
				<TrophyBox />
				<LeaderboardBox />
				<MatchhistoryBox />
		</Stack>
	  );
	}
	return (
			<Stack direction="row" spacing={1}>
				<Stack spacing={1}>
						<StatsBox myStats={user.stats}/>
						<TrophyBox />
				</Stack>
				<Stack spacing={1}>
						<LeaderboardBox />
						<MatchhistoryBox />
				</Stack>
			</Stack>
	);
}
