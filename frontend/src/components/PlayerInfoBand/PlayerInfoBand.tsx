import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SkillBar from 'react-skillbars';

import {PlayerBarStyle, SkillBarStyle, colors} from "../../styles/tsxStyles/Home";

const skills = [
	{type: "XX%", level: 85},
  ];

export default function PlayerInfoBand() {
	return (
			<Box sx={PlayerBarStyle}>
				<Stack>
					Level XX
					<div style={SkillBarStyle}>
						<SkillBar skills={skills} colors={colors}
						height={20}/>
					</div>
				</Stack>
			</Box>
	);
}