import { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ChooseAvatarModal from '../AppBar/ChooseAvatar/Modal'
import ChooseNameModal from '../AppBar/ChooseName/Modal'
import ChooseAuthModal from '../AppBar/ChooseAuth/Modal'
import {init_user, User} from 'interfaces'

const SettingStyle = {
    height:  '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export default function Settings() {
    let [user, setUser] = useState<User>(init_user);

    useEffect(() => {
		axios.get('http://127.0.0.1:3001/users/me',{
			withCredentials: true
		})
		.then(res => {
			console.log("Get request success")
			const user_data = res.data;
			setUser(user_data);
		})
		.catch(function (err) {
			console.log("Get request failed : ", err)
		});
	}, [])

    return (
        <Box sx={SettingStyle}>
            <Stack spacing={5}>
            	<ChooseAvatarModal user={user}/>
                <ChooseNameModal user={user}/>
                <ChooseAuthModal />
		    </Stack>
        </Box>
    )
}