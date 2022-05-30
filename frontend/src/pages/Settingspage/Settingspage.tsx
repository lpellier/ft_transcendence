import React from 'react';
import Stack from '@mui/material/Stack'
import Settings from 'components/Settings/Settings'
import SearchAppBar from 'components/AppBar/AppBar'


import Box from '@mui/material/Box';




export default function Settingspage() {
    return (
		<Stack >
			<SearchAppBar image={''}/>
			<Box >
				<Settings />
			</Box>
		</Stack>
    )
}