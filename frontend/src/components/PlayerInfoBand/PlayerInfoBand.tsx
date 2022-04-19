import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {PlayerBarStyle} from "../../styles/tsxStyles/Home";
import Typography from '@mui/material/Typography'

const SkillBarStyle = {
	padding: '2px',
	border: "3px solid black",
	backgroundColor: 'rgb(80, 70, 230)',
	borderRadius: '20px',
}

const TitleStyle = {
	textAlign: 'end',
	marginRight: '10px',
}


function SkillBar(props: {progression: number}) {
	const [length, setLength] = useState(0);

	useEffect(() => {
		setLength((props.progression / 100) * window.screen.width);
	});

	return (
		<Box sx={SkillBarStyle}>
			<div style={{
						height: '',
						width: '${length}px', 
						backgroundColor: 'rgb(150, 100, 235)',
						borderRadius: '20px',
						border: "3px solid black",
						}}>
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
				<Stack spacing={10}>
					Level {props.level}
					<SkillBar progression={10}/>
				</Stack>
			</Box>
	);
}