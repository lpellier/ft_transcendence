import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider } from '@mui/styles';
import WebhookIcon from '@mui/icons-material/Webhook';

import {orangeTheme} from 'components/Themes'
import {Title, ButtonStyle, LinkStyle, IconStyle} from "../styles/tsxStyles/LogIn"

const AuthAPI = "http://127.0.0.1:3001/auth"

function LogInButton()
 {
	return (
		<ThemeProvider theme={orangeTheme}>
                <Button 
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
