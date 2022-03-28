import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider } from '@mui/material/styles';
import WebhookIcon from '@mui/icons-material/Webhook';


import {orangeTheme} from '../../Components/Themes.tsx'
import "./LogIn.css"

const LinkStyle = 	{ textDecoration: 'none',
					display: 'flex',
					justifyContent: 'center',
					}

class LogInButton extends Component {
    constructor() {
        super();

          this.state = {
          clicked: false
        };
   
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
    }
  
    render() {
      return (
        <ThemeProvider theme={orangeTheme}>
                <Button className='Button'
                    onClick={this.handleClick}
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
  }

  
  export default class LogIn extends React.Component {
  render() { 
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
}
