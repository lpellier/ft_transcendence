import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import SearchAppBar from 'components/AppBar/AppBar'
import FriendBand from 'components/FriendBand/FriendBand'
import PlayerInfoBand from 'components/PlayerInfoBand/PlayerInfoBand'
import StatsBoards from 'components/StatsBoards/StatsBoards'

import {StatsPartStyle, AllHomeStyle} from '../../styles/tsxStyles/Home'

function StatsPart() {
	return(
		<Stack spacing={1} sx={StatsPartStyle}>
			<PlayerInfoBand />
			<StatsBoards />
		</Stack>
	);
}

export default function Homepage() {
	const [width, setWidth] = useState(window.innerWidth);
  	const breakpoint = 425;

	useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth);
		 window.addEventListener("resize", handleResizeWindow);
		 return () => {
		   window.removeEventListener("resize", handleResizeWindow);
		 };
	}
	)
	

	if (width < breakpoint) {
	  return (
	    <Stack spacing={2}>
			<h1 style={{color:'white'}}>{width}</h1>
        	<SearchAppBar image={''}/>
			<Container>
				<Stack direction="row" spacing={1} sx={AllHomeStyle}>
					<StatsPart />
				</Stack>
			</Container>
		</Stack>
	  );
	}
    return (
		<Stack spacing={2}>
			<h1 style={{color:'white'}}>{width}</h1>
        	<SearchAppBar image={''}/>
			<Container>
				<Stack direction="row" spacing={1} sx={AllHomeStyle}>
					<FriendBand />
					<StatsPart />
				</Stack>
			</Container>
		</Stack>
    );
}
