import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider } from '@mui/styles';
import WebhookIcon from '@mui/icons-material/Webhook';

import {orangeTheme} from 'components/Themes'
import {Title, ButtonStyle, LinkStyle} from "../../styles/tsxStyles/LogIn"

import React, { useEffect, useState,  } from "react";
import axios from "axios";

const AuthAPI = "https://api.intra.42.fr/oauth/authorize?client_id=599878db9c7f713d0988e2c1e2672a5d888593be77d49fed8bec54b4b1d404bc&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Fauth%2Fcallback&response_type=code"

function LogInButton(props: {login: any})
 {
	return (
		<ThemeProvider theme={orangeTheme}>
                <Button 
					onClick={props.login}
					sx={ButtonStyle}
                    variant="contained"
                    startIcon={<LoginIcon />}
                    size="large"
                    color="primary" 
					>
                  Log in
                </Button>
        </ThemeProvider>
      );
}
	
export default function LogIn() {

	useEffect(() => {

	axios.get(AuthAPI)
		.then((result) => {
			//console.log('success');
   			window.location.href = '/home';
      	})
      	.catch((error) => {
			window.location.href = '/error';
      	});
  })

    return (
        	<Stack spacing={10} sx={Title}>
				<div>
					Eneana
					<WebhookIcon />
					Pong
				</div>
				  	<LogInButton login={useEffect}/>
        	</Stack>
        );
}
