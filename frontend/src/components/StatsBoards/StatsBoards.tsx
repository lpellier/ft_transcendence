import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';

import {StatTitle, StatBox} from "../../styles/tsxStyles/Home"

function BoardComponent(props: {icon: any, title: string}) {
	return(
		<Stack spacing={1}>
			<Stack sx={StatTitle} spacing={2}>
				{props.icon}
				{props.title}
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
