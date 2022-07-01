import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import StatsBoards from './StatsBoards'
import Typography from '@mui/material/Typography'
import {StatsPartStyle} from '../../styles/tsxStyles/Home'
import {User} from 'interfaces'
import {PlayerBarStyle} from "../../styles/tsxStyles/Home";
import './../../styles/Other/SkillBar.css'

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

function StatsPart(props: {user: User}) {
	return(
		<Stack spacing={1} sx={StatsPartStyle}>
			<PlayerInfoBand level={props.user.level}/>
			<StatsBoards user={props.user}/>
		</Stack>
	);
}

export default function Profile(props: {user: User | undefined}) {

    return (
		<Box sx={{width: '90vw',  whiteSpace: 'nowrap',}}>
			{props.user?
				<Stack direction="row" spacing={1} >
					<StatsPart user={props.user}/>
				</Stack>
					:
					<div/>
			}
		</Box>
    );
}