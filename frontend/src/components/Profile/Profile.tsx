import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import PlayerInfoBand from './PlayerInfoBand'
import StatsBoards from './StatsBoards'

import {StatsPartStyle, AllHomeStyle} from '../../styles/tsxStyles/Home'
import {User} from 'interfaces'

function StatsPart(props: {user: User}) {
	return(
		<Stack spacing={1} sx={StatsPartStyle}>
			<PlayerInfoBand level={5}/>
			<StatsBoards user={props.user}/>
		</Stack>
	);
}

export default function Profile(props: {user: User | undefined}) {

    return (
			
			<Container>
				{props.user?
					<Stack direction="row" spacing={1} sx={AllHomeStyle}>
						<StatsPart user={props.user}/>
					</Stack>
				:
				<div/>
				}
			</Container>
    );
}