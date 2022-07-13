import {useEffect} from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import WebhookIcon from '@mui/icons-material/Webhook';
import {User} from 'interfaces';
import {Title, ButtonStyle, LinkStyle, IconStyle} from "../styles/tsxStyles/LogIn"
import { useAuth } from './routes';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthAPI = process.env.REACT_APP_BACK_URL + "/auth"
const MockAuthAPI = process.env.REACT_APP_BACK_URL + "/auth/mock"
const MockAuthAPI2 = process.env.REACT_APP_BACK_URL + "/auth/mock2"

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

export default function LogIn() {
	
	let auth = useAuth();
	let navigate = useNavigate();

	useEffect(()=>{
		axios.get(process.env.REACT_APP_BACK_URL + "/users/me",
        {
            withCredentials: true
        }).then(res => {
        auth.signin(res.data, () => {
			console.log("about to login", auth.user)
			navigate("/game")});
		        })
        .catch(err => console.log("THIS TOO IS A TEST", err))
		;}, []);

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
				<a href={MockAuthAPI2} style={LinkStyle}>
					<MockLogInButton />
				</a>
			</nav>
        </Stack>
	);
}
