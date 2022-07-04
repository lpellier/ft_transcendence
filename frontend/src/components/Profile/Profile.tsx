import {useEffect, useState, useRef} from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import StatsBoards from './StatsBoards'
import Typography from '@mui/material/Typography'
import {User} from 'interfaces'
import {PlayerBarStyle, SkillBarContourStyle, TitleStyle} from "../../styles/tsxStyles/Home";
import './../../styles/Other/SkillBar.css'

const OverallBoxStyle = {
	paddingTop: '4vh',
	display: 'flex',
	justifyContent: 'center',
}

function SkillBar(props: {progression: number}) {
	const [length, setLength] = useState(0);
	const totwidth = length + "px";
	const SkillBox = useRef();

	useEffect(() => {
		//@ts-ignore: next-line
		setLength((props.progression / 100) * SkillBox.current.offsetWidth);
	}, [props.progression]);

	return (
		<Box ref={SkillBox} sx={SkillBarContourStyle} >
			<div style={{width: totwidth}} className="SkillBar">
					<Typography variant="subtitle2" sx={TitleStyle}>
						{props.progression}%
					</Typography>
			</div>
		</Box>
	);
}

function PlayerInfoBand(props: {level: number}) {
	const [xp, setXp] = useState<number>((props.level * 100) % 100) 
	const [level, setLevel] = useState<number>(Math.trunc(props.level)) 

	useEffect(() => {
		setXp((props.level * 100) % 100)
	}, [])
	
	return (
			<Box sx={PlayerBarStyle}>
				<Stack spacing={2}>
					<Typography variant="h6">
						Level {level}
					</Typography>
					<SkillBar progression={xp}/>
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