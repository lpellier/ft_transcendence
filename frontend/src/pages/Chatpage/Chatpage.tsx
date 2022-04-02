import React, {Component} from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Chat from '../../Components/Chat/Chat'
import SearchAppBar from '../../Components/AppBar/AppBar'

const ChatBoxStyle = {	
    width: '80vw',
    height: '70vh',
	border: '3px solid black',
    backgroundColor: 'rgb(120, 110, 220, 0.95)',
	backgroundImage: 'url("https://cdn.pixabay.com/photo/2019/06/08/14/04/cat-and-butterflies-4260164_960_720.png")',
	backgroundSize: 'contain',
	backgroundRepeat: 'no-repeat',
}

export default class Chatpage extends React.Component {
    render() { 
        return (
            <Stack spacing={10} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <SearchAppBar />
                <Box sx={ChatBoxStyle}>
					<Chat />
				</Box>
            </Stack>
        );
    }
}
