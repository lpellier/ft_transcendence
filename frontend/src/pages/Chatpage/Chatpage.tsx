import React, {Component} from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SearchAppBar from '../../Components/AppBar/AppBar.tsx'

const ChatBoxStyle = {	
    width: '70vw',
    height: '70vh',
    backgroundColor: 'primary.dark',
    '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7]}
}

export default class Chatpage extends React.Component {
    render() { 
        return (
            <Stack spacing={10} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <SearchAppBar />
                <Box sx={ChatBoxStyle}/>
            </Stack>
        );
    }
}
