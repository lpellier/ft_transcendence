import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider } from '@mui/styles';
import WebhookIcon from '@mui/icons-material/Webhook';

import {orangeTheme} from 'components/Themes'
import {Title, ButtonStyle, LinkStyle} from "../../styles/tsxStyles/LogIn"

import React, { useEffect, useState,  } from "react";
import axios from "axios";

const AuthAPI = "http://127.0.0.1:3001/auth"

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
      	});
  })

    return (
        	<Stack spacing={10} sx={Title}>
				<div>
					Eneana
					<WebhookIcon />
					Pong
				</div>
				<nav>
					<a href={AuthAPI} style={LinkStyle}>
					  	<LogInButton login={useEffect}/>
					</a>
				</nav>
        	</Stack>
        );
}
