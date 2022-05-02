import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';

import { phoneSize } from 'index';
import {StatTitle, StatBox} from "../../styles/tsxStyles/Home"

function BoardComponent(props: {icon: any, title: string}) {
	return(
		<Stack spacing={1}>
			<Stack direction="row" sx={StatTitle} spacing={2}>
				{props.icon}
				<Typography>
					{props.title}
				</Typography>
			</Stack>
			<Box sx={StatBox}>
			</Box>
		</Stack>
	);
}

function Stats(){
	return (
		<BoardComponent
			icon={<TimelineIcon />} 
			title="Stats" />
		);
}

function Trophy(){
	return(
		<BoardComponent 
			icon={<EmojiEventsIcon />}
			title="Trophy" />
		);
}

function Leaderboard(){
	return(
		<BoardComponent 
			icon={<MilitaryTechIcon />}
			title="Leaderboard" />
		);
}

function Matchhistory(){
	return(
		<BoardComponent 
			icon={<UpdateIcon />}
			title="Match history" />
		);
}

export default function StatsBoards() {
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
				<Stats />
				<Trophy />
				<Leaderboard />
				<Matchhistory />
		</Stack>
	  );
	}
	return (
			<Stack direction="row" spacing={1}>
				<Stack spacing={1}>
						<Stats />
						<Trophy />
				</Stack>
				<Stack spacing={1}>
						<Leaderboard />
						<Matchhistory />
				</Stack>
			</Stack>
	);
}
