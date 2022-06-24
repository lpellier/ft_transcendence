import {useEffect, useState, useRef} from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {PlayerBarStyle} from "../../styles/tsxStyles/Home";
import Typography from '@mui/material/Typography'
import './../../styles/Other/SkillBar.css'

export default function PlayerInfoBand(props: {level: number}) {
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