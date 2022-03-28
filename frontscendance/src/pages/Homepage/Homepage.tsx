import React from "react";
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import SearchAppBar from '../../Components/AppBar/AppBar.tsx'
import FriendBand from '../../Components/FriendBand/FriendBand.tsx'
import PlayerInfoBand from '../../Components/PlayerInfoBand/PlayerInfoBand.tsx'
import StatsBoards from '../../Components/StatsBoards/StatsBoards.tsx'


function StatsPart() {
	return(
		<Stack spacing={1} style={{width: '100vw'}}>
			<PlayerInfoBand />
			<StatsBoards />
		</Stack>
	);
}

export default class Homepage extends React.Component {
    render() { 
        return (
			<Stack spacing={1}>
            	<SearchAppBar />
				<Container style={{width: '100vw'}}>
					<Stack direction="row" spacing={1}>
						<FriendBand />
						<StatsPart />
					</Stack>
				</Container>
			</Stack>
        );
    }
}
