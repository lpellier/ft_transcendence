import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import PlayerInfoBand from './PlayerInfoBand'
import StatsBoards from './StatsBoards'

import {StatsPartStyle} from '../../styles/tsxStyles/Home'
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
		<Box sx={{display: 'flex', justifyContent: 'center', paddingTop: '4vh'}}>
			<Box sx={{whiteSpace: 'nowrap'}}>
				{props.user?
					<Stack direction="row" spacing={1} >
						<StatsPart user={props.user}/>
					</Stack>
						:
						<div/>
					}
			</Box>
		</Box>
    );
}