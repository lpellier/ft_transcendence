import { useEffect, useState } from 'react'
import axios from 'axios';

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ChooseModal from './Modal'
import FaceIcon from '@mui/icons-material/Face'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'

import AvatarList from './ChooseAvatar/ChooseAvatar'
import ChooseName from './ChooseName/ChooseName'
import ChooseAuth from './ChooseAuth/ChooseAuth'

import {ModalChooseName} from '../../styles/tsxStyles/Settings/Name'
import {ModalChooseAuth} from '../../styles/tsxStyles/Settings/Auth'
import {ModalChooseAvatar} from '../../styles/tsxStyles/Settings/Avatar'
import {User, init_user} from 'interfaces'
import {getUser} from 'requests'


const SettingStyle = {
    height:  '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

function ChooseAvatarModal(props: {user: User}) {
	return (
		<ChooseModal
			user={props.user} 
			icon={<FaceIcon />}
			label={"Choose avatar"}
			ModalBoxStyle={ModalChooseAvatar}
			modalComp={<AvatarList user={props.user}/>}
		/>
	)
}

function ChooseNameModal(props: {user: User}) {
	return (
		<ChooseModal
			user={props.user} 
			icon={<DriveFileRenameOutlineIcon />}
			label={"Choose Name"}
			ModalBoxStyle={ModalChooseName}
			modalComp={<ChooseName user={props.user}/>}
		/>
	)
}

function ChooseAuthModal(props: {user: User}) {
	return (
		<ChooseModal
			user={props.user} 
			icon={<VpnKeyIcon />}
			label={"Choose Authentication"}
			ModalBoxStyle={ModalChooseAuth}
			modalComp={<ChooseAuth />}
		/>
	)
}

export default function Settings() {
    let [user, setUser] = useState<User>(init_user);

    useEffect(() => {
		getUser(setUser)
	}, [])

    return (
        <Box sx={SettingStyle}>
            <Stack spacing={5}>
            	<ChooseAvatarModal user={user}/>
                <ChooseNameModal user={user}/>
                <ChooseAuthModal user={user}/>
		    </Stack>
        </Box>
    )
}