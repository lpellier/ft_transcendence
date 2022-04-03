import React, {Component} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SkillBar from 'react-skillbars';

const BoxSttyle = {	width: '60vw',
					height: '6vh',
					textAlign: 'center',
					alignComponent: 'center',
					color: 'white', 
					border: '3px solid black'}
					
const SkillBarStyle = { width: '50vh', 
						paddingTop: '1%'}

const colors = {
	bar: 'blue',
	title: {
	  text: 'white',
	  background: 'purple'
	}
  }

const skills = [
	{type: "XX%", level: 85},
  ];

export default function PlayerInfoBand() {
	return (
			<Box bgcolor='#7A28CB' sx={BoxSttyle}>
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