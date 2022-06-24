import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import PlayerInfoBand from 'components/Profile/PlayerInfoBand'
import StatsBoards from 'components/Profile/StatsBoards'

import {StatsPartStyle, AllHomeStyle} from '../../styles/tsxStyles/Home'

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
			<Container>
				<Stack direction="row" spacing={1} sx={AllHomeStyle}>
					<StatsPart />
				</Stack>
			</Container>
    );
}