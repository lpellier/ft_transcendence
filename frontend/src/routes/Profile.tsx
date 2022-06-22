import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import SearchAppBar from 'components/AppBar/AppBar'
import FriendBand from 'components/Home/FriendBand'
import PlayerInfoBand from 'components/Home/PlayerInfoBand'
import StatsBoards from 'components/Home/StatsBoards'

import {StatsPartStyle, AllHomeStyle} from '../styles/tsxStyles/Home'

function StatsPart() {
	return(
		<Stack spacing={1} sx={StatsPartStyle}>
			<PlayerInfoBand level={5}/>
			<StatsBoards />
		</Stack>
	);
}

export default function Profile() {

    return (
		<Stack spacing={2}>
        	<SearchAppBar />
			<Container>
				<Stack direction="row" spacing={1} sx={AllHomeStyle}>
					<FriendBand />
					<StatsPart />
				</Stack>
			</Container>
		</Stack>
    );
}