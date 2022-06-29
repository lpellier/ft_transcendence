import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import AvatarList from './ChooseAvatar/ChooseAvatar'
import ChooseName from './ChooseName/ChooseName'
import ChooseAuth from './ChooseAuth/ChooseAuth'
import {User} from 'interfaces'
import { useEffect } from 'react'


const SettingStyle = {
    height:  '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export default function Settings(props: {user: User | undefined}) {

    return (
        <Box sx={SettingStyle}>
			{props.user?
            	<Stack spacing={5}>
            		<AvatarList user={props.user} />
            	    <ChooseName user={props.user} />
            	    <ChooseAuth user={props.user} />
		    	</Stack>
					:
				<div/>
			}
        </Box>
    )
}