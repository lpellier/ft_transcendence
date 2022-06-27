import {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'
import TFAuth from './TFAuth';
import { ThemeProvider } from '@mui/styles';
import WebhookIcon from '@mui/icons-material/Webhook';
import {User} from 'interfaces';
import {orangeTheme} from 'components/Themes'
import {Title, ButtonStyle, LinkStyle, IconStyle} from "../styles/tsxStyles/LogIn"

const AuthAPI = "http://127.0.0.1:3001/auth"
const TFApath = "http://127.0.0.1:3000/tfauth"

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function LogInButton()
{

	// useEffect (() => {
	// 	console.log("win location: ", window.location.href)
	// 	console.log("condition: ", window.location.href === "http://127.0.0.1:3000/")
	// 	{ window.location.href === "http://127.0.0.1:3000/" ?
	// 		<TFAuth/>
	// 			:
	// 		<div />
	// 	}
	// }, [])

	function handleClick() {

		if (window.location.href === "http://127.0.0.1:3000")
		{ 
			const loginWin = window.open("http://127.0.0.1:3000/tfauth", 
				'_blank', 'width=1200,height=1200,left=200,top=200');
		}

		return (
			<div/>
		)
	}

	return (
		<ThemeProvider theme={orangeTheme}>
        	        <Button
						sx={ButtonStyle}
        	            variant="contained"
        	            startIcon={<LoginIcon />}
        	            size="large"
        	            color="primary"
						onClick={handleClick}
					>
        	          Log in
        	        </Button>
        	</ThemeProvider>
	);
}

export default function LogIn(props: {user: User}) {

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
        	</Stack>
	);
}
