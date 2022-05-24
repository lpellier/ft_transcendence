import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Chat from 'components/Chat/Chat'
import SearchAppBar from 'components/AppBar/AppBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatBoxStyle = {	
    width: '80vw',
    minWidth: '320px',
    height: '70vh',

	border: '3px solid black',
    backgroundColor: 'rgb(120, 110, 220, 0.95)',
	backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/09/13/22/18/stretching-2747269_960_720.png")',
	backgroundSize: '20%',
    backgroundPosition: 'bottom left',
	backgroundRepeat: 'no-repeat',
    filter: 'drop-shadow(20px 20px 1px black)',
}

const ChatPageStyle = {
    alignItems: 'center',
}

export default function Chatpage() {
    return(
        <div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Stack spacing={6} style={ChatPageStyle}>
                <SearchAppBar image={''}/>
                <Box sx={ChatBoxStyle}>
					<Chat />
				</Box>
            </Stack>
        </div>
        );
}
