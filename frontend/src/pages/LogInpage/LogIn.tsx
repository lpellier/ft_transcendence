import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider } from '@mui/styles';
import WebhookIcon from '@mui/icons-material/Webhook';
import NewWindow from 'react-new-window'

import {Navigate} from 'react-router-dom'
import {token} from 'index'
import {orangeTheme} from 'components/Themes'
import {Title, ButtonStyle, LinkStyle, IconStyle} from "../../styles/tsxStyles/LogIn"
import '../../styles/Other/LoginWindow.css'

import axios from "axios";

const AuthAPI = "http://127.0.0.1:3001/auth"

function LogInButton(props: {login: any}) {

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
	)
}

function LoginWindow() {
	
	function getRequest() {

		axios.get('http://127.0.0.1:3001',
		{'headers': {
			// 'Origin':'http://127.0.0.1:3000',
			'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
		}
		})
		.then(res => {
			console.log("Get request success")
			const test_data = res.data;
			console.log({test_data});
		})
		.catch(function (err) {
			console.log("Get request failed")
		});
	}

	if (!{token})
	{
		return (
			<NewWindow
				title="Login page" >
				<nav>
					<a href={AuthAPI} style={LinkStyle}>
					  	<LogInButton login={getRequest}/>
					</a>
				</nav>
			</NewWindow>
		);
	}
	return (
		<Navigate to={"/home"} />
	)
}

function LogInWindowButton()
 {
	const [isOpen, setOpen] = useState(false);

	const openWindow = () => {
		setOpen(!isOpen);
	};

	return (
		<ThemeProvider theme={orangeTheme}>
                <Button 
					onClick={openWindow}
					sx={ButtonStyle}
                    variant="contained"
                    startIcon={<LoginIcon />}
                    size="large"
                    color="primary"
					>
                  Log in
                </Button>
				{isOpen && <LoginWindow />}
        </ThemeProvider>
      );
}

export default function LogIn() {

    return (
        	<Stack spacing={10} sx={Title}>
				<div>
					Eneana
					<WebhookIcon sx={IconStyle}/>
					Pong
				</div>
				<LogInWindowButton />
        	</Stack>
        );
}
