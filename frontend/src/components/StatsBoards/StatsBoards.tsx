import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {token} from 'index';
import {User} from 'interfaces';

import axios from 'axios';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';

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

function StatsBox(props: {myStats: User}){
	const totGames = props.myStats.wins + props.myStats.losses;

	return (
		<Stack spacing={1}>
		<BoardComponent
			icon={<TimelineIcon />} 
			title="Stats" />
			<Box sx={StatBox}>
				<h3> Victories : {props.myStats.wins} </h3>
				<h3> Games lost : {props.myStats.losses} </h3>
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

function LeaderboardBox(){

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
	let [stats, setStats] = useState<User>({id: -1, avatar: "", username: "", wins: -1, losses: -1});
	//let [stats, setStats] = useState<Stats>({wins: -1, losses: -1});
	//let [leadboard, setLeadboard] = useState<LeaderBoard>({Rank: -1, PlayerName: '', PlayerLevel: -1});

	axios.get('http://127.0.0.1:3001/user/me',{
       headers: {
           'Authorization': token,
       }})
       .then(res => {
           console.log("Get request success")
           const resStats = res.data;
           //setStats(resStats);
       })
       .catch(function (err) {
           console.log("Get request failed : ", err)
    });

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
				<StatsBox myStats={stats}/>
				<TrophyBox />
				<LeaderboardBox />
				<MatchhistoryBox />
		</Stack>
	  );
	}
	return (
			<Stack direction="row" spacing={1}>
				<Stack spacing={1}>
						<StatsBox myStats={stats}/>
						<TrophyBox />
				</Stack>
				<Stack spacing={1}>
						<LeaderboardBox />
						<MatchhistoryBox />
				</Stack>
			</Stack>
	);
}
