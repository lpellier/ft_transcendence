import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';

const HeadBoxStyle = { width: '29vw',
					height: '4vh',
					textAlign: 'center',
					color: 'white',
					border: '3px solid black'}

const BoxStyle = { 	height: '30vh',
					color: 'white', 
					border: '3px solid black'}

function Stats(){
	return(
		<Stack spacing={1}>
			<Box bgcolor='#7A28CB' sx={HeadBoxStyle}>
				<TimelineIcon />
				Stats
			</Box>
			<Box bgcolor='#D3ACDF' sx={BoxStyle}>
			</Box>
		</Stack>
	);
}

function Trophy(){
	return(
		<Stack spacing={1}>
			<Box bgcolor='#7A28CB' sx={HeadBoxStyle}>
				<EmojiEventsIcon />
				Trophy
			</Box>
			<Box bgcolor='#D3ACDF' sx={BoxStyle}>
			</Box>
		</Stack>
	);
}

function Leaderboard(){
	return(
		<Stack spacing={1}>
			<Box bgcolor='#7A28CB' sx={HeadBoxStyle}>
				<MilitaryTechIcon />
				Leaderboard
			</Box>
				<Box bgcolor='#D3ACDF' sx={BoxStyle}>
			</Box>
		</Stack>
	);
}

function Matchhistory(){
	return(
		<Stack spacing={1}>
			<Box bgcolor='#7A28CB' sx={HeadBoxStyle}>
				<UpdateIcon />
				Match history
			</Box>
			<Box bgcolor='#D3ACDF' sx={BoxStyle}>
			</Box>
		</Stack>
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
