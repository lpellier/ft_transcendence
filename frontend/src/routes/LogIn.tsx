import {useEffect} from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import WebhookIcon from '@mui/icons-material/Webhook';
import {Title, ButtonStyle, LinkStyle, IconStyle} from "../styles/tsxStyles/LogIn"
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "components/AuthProvider";

const AuthAPI = process.env.REACT_APP_BACK_URL + "/auth"
const MockAuthAPI = process.env.REACT_APP_BACK_URL + "/auth/mock"

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
	// type LocationProps = {
	// 	state: {
	// 	  from: Location;
	// 	};
	//   };

	// let auth = useAuth();
	// let navigate = useNavigate();
	// let location = useLocation() as unknown as LocationProps;
	// let from = location.state?.from?.pathname || "/";

	// useEffect(()=>{
	// 	axios.get(process.env.REACT_APP_BACK_URL + "/users/me",
    //     {
    //         withCredentials: true
    //     }).then(res => {
    //     auth.signin(res.data, () => {
	// 		console.log("about to login", from)
	// 		navigate(from, {replace: true});
	// 	});
	// 	        })
    //     .catch(err => console.log("THIS TOO IS A TEST", err))
	// 	;}, [auth, from, navigate]);

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
				<a href={MockAuthAPI + "/1"} style={LinkStyle}>
					<MockLogInButton />
				</a>
				<a href={MockAuthAPI + "/2"} style={LinkStyle}>
					<MockLogInButton />
				</a>
			</nav>
        </Stack>
	);
}
