import {useEffect, useState} from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import WebhookIcon from '@mui/icons-material/Webhook';
import {User} from 'interfaces';
import {Title, ButtonStyle, LinkStyle, IconStyle} from "../styles/tsxStyles/LogIn"

const AuthAPI = "http://127.0.0.1:3001/auth"
const MockAuthAPI = "http://127.0.0.1:3001/auth/mock"

function LogInButton()
{

	return (
        	<Button
				sx={ButtonStyle}
        	    variant="contained"
        	    startIcon={<LoginIcon />}
        	    size="large"
        	    color="primary"
			>
        	  Log in
        	</Button>
	);
}

function MockLogInButton()
 {
	return (
        <Button 
			sx={ButtonStyle}
            variant="contained"
            startIcon={<LoginIcon />}
            size="large"
            color="primary"
			>
          Mock Login
        </Button>
      );
}

export default function LogIn(props: {user: User | undefined, auth: boolean}) {
	
	useEffect(() => {

		axios.get("http://127.0.0.1:3001/users/me",
		{ withCredentials: true })
		.then(res => { console.log("Get user success")})
		.catch(err => { console.log("Get user failed : ", err)})
	}, [])

    return (
        <Stack spacing={10} sx={Title}>
			<div>
				GnaGna
				<WebhookIcon sx={IconStyle}/>
				Pong
			</div>
			<nav>
				<a href={AuthAPI} style={LinkStyle}>
					<LogInButton />
				</a>
			</nav>
			<nav>
				<a href={MockAuthAPI} style={LinkStyle}>
					<MockLogInButton />
				</a>
			</nav>
        </Stack>
	);
}
