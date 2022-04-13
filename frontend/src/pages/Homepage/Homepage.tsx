import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import SearchAppBar from 'components/AppBar/AppBar'
import FriendBand from 'components/FriendBand/FriendBand'
import PlayerInfoBand from 'components/PlayerInfoBand/PlayerInfoBand'
import StatsBoards from 'components/StatsBoards/StatsBoards'


function StatsPart() {
	return(
		<Stack spacing={1} style={{width: '100vw'}}>
			<PlayerInfoBand />
			<StatsBoards />
		</Stack>
	);
}

export default function Homepage() {
        return (
			<Stack spacing={1}>
            	<SearchAppBar image={''}/>
				<Container style={{width: '100vw'}}>
					<Stack direction="row" spacing={1}>
						<FriendBand />
						<StatsPart />
					</Stack>
				</Container>
			</Stack>
        );
}
