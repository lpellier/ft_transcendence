import React, {Component} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const HeadBoxStyle = { width: '30vw',
					height: '6vh',
					color: 'white', 
					border: '3px solid black',
				}

const BoxStyle = {	height: '74vh',
					color: 'white', 
					border: '3px solid black',
				}

function FriendHeadBand() {
	return (
		<Box bgcolor='#7A28CB' sx={HeadBoxStyle}>
			Friend Status
		</Box>
	);
}

function FriendBar() {
	return (
		<Box bgcolor='rgb(195, 183, 215, 0.8)' sx={BoxStyle}>
			"friend name"
			"online button"
		</Box>
	);
}

export default function FriendBand() {
	return (
		<Stack spacing={1}>
			<FriendHeadBand />
			<FriendBar />
		</Stack>
	);
}