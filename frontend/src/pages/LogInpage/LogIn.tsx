import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider } from '@mui/styles';
import WebhookIcon from '@mui/icons-material/Webhook';

import {orangeTheme} from 'components/Themes'
import {Title, ButtonStyle, LinkStyle, IconStyle} from "../../styles/tsxStyles/LogIn"

//import React, { useEffect } from "react";
//import axios from "axios";

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

	 function getRequest() {
	// 	axios{
	// 		{
	// 			method: 'get',
	// 			url: '/',

	// 		}
	// 		.then((result: any) => {
	// 			console.log('success');
	// 			window.location.href = '/home';
	// 		})
	// 		.catch((error: any) => {
	// 		});
	// 	}
	 }

    return (
        	<Stack spacing={10} sx={Title}>
				<div>
					Eneana
					<WebhookIcon sx={IconStyle}/>
					Pong
				</div>
				<nav>
					<a href={AuthAPI} style={LinkStyle}>
					  	<LogInButton login={getRequest}/>
					</a>
				</nav>
        	</Stack>
        );
}
