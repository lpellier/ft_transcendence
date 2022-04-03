import React from "react";
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider } from '@mui/material/styles';
import WebhookIcon from '@mui/icons-material/Webhook';


import {orangeTheme} from '../../components/Themes'
import "./LogIn.css"

const LinkStyle = 	{ textDecoration: 'none',
					display: 'flex',
					justifyContent: 'center',
					}

function LogInButton() {
	
    function handleClick() {
		
    }
  
      return (
        <ThemeProvider theme={orangeTheme}>
                <Button className='Button'
                    onClick={handleClick}
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
    return (
        	<div className='text'>
        	    <Stack spacing={10}>
					<div>
					Eneana
					<WebhookIcon />
					Pong
					</div>
        	        <nav>
        	          	<Link to="/home" style={LinkStyle}> 
					  		<LogInButton /> 
						</Link>
        	        </nav>
        	    </Stack>
        	</div>
        );
}
