import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import StatsBoards from './StatsBoards'
import Typography from '@mui/material/Typography'
import {User} from 'interfaces'
import {PlayerBarStyle} from "../../styles/tsxStyles/Home";
import './../../styles/Other/SkillBar.css'

const OverallBoxStyle = {
	paddingTop: '4vh',
	display: 'flex',
	justifyContent: 'center',
}


function PlayerInfoBand(props: {level: number}) {
	return (
			<Box sx={PlayerBarStyle}>
				<Stack spacing={2}>
					<Typography variant="h6">
						Level {props.level}
					</Typography>
				</Stack>
			</Box>
	);
}

export default function Profile(props: {user: User | undefined, users: User[]}) {

    return (
		<Box sx={OverallBoxStyle}>
			{props.user?
				<Stack spacing={1}>
					<PlayerInfoBand level={props.user.level}/>
					<StatsBoards user={props.user} users={props.users}/>
				</Stack>
					:
					<div/>
			}
		</Box>
    );
}