import {useEffect, useState, useRef} from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {PlayerBarStyle} from "../../styles/tsxStyles/Home";
import Typography from '@mui/material/Typography'
import './../../styles/Other/SkillBar.css'
import {SkillBarContourStyle, TitleStyle} from './../../styles/tsxStyles/Home'

function SkillBar(props: {progression: number}) {
	const [length, setLength] = useState(0);
	const totwidth = length + "px";
	const SkillBox = useRef();

	useEffect(() => {
		//@ts-ignore: next-line
		setLength((props.progression / 100) * SkillBox.current.offsetWidth);
	});

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

export default function PlayerInfoBand(props: {level: number}) {
	return (
			<Box sx={PlayerBarStyle}>
				<Stack spacing={2}>
					<Typography variant="h6">
						Level {props.level}
					</Typography>
					<SkillBar progression={50}/>
				</Stack>
			</Box>
	);
}