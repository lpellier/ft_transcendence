import { useEffect, useState } from 'react';
import axios from 'axios';
import {token} from 'index';

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import ChooseAvatarModal from '../AppBar/ChooseAvatar/Modal'
import ChooseNameModal from '../AppBar/ChooseName/Modal'
import ChooseAuthModal from '../AppBar/ChooseAuth/Modal'

import {AllHomeStyle} from '../../styles/tsxStyles/Home'
import {User} from 'interfaces'

const SettingStyle = {
    height:  '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export default function Settings() {
    let [user, setUser] = useState<User>({avatar: "", id: -1, username: ""});

    useEffect(() => {
		axios.get('http://127.0.0.1:3001/users/me',{
		headers: {
			'Authorization': token,
		}
		})
		.then(res => {
			console.log("Get request success")
			const test_data = res.data;
			// socket.emit('new user', test_data.username);
			setUser(test_data);
		})
		.catch(function (err) {
			console.log("Get request failed : ", err)
		});
	}, [])

    return (
        <Box sx={SettingStyle}>
            <Stack spacing={5}>
            	<ChooseAvatarModal img=''/>
                <ChooseNameModal user={user}/>
                <ChooseAuthModal />
		    </Stack>
        </Box>
    )
}