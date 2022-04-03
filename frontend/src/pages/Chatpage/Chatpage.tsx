import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Chat from '../../components/Chat/Chat'
import SearchAppBar from '../../components/AppBar/AppBar'

const ChatBoxStyle = {	
    width: '80vw',
    height: '70vh',
	border: '3px solid black',
    backgroundColor: 'rgb(120, 110, 220, 0.95)',
	backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/09/13/22/18/stretching-2747269_960_720.png")',
	backgroundSize: '20%',
    backgroundPosition: 'bottom left',
	backgroundRepeat: 'no-repeat',
}

export default function Chatpage() {

    return(
            <Stack spacing={10} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <SearchAppBar />
                <Box sx={ChatBoxStyle}>
					<Chat />
				</Box>
            </Stack>
        );
    }
