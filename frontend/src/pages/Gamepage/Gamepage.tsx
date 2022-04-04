import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import SearchAppBar from '../../components/AppBar/AppBar'
import Cactus from			"../../images/Avatar/Cactus.png"
import Penguin from			"../../images/Avatar/Penguin.png"

const BigAvatar = {border: 4, width: 100, height: 100}

const GameStyle = { justifyContent: 'center', 
                    alignItems: 'center'
                    }

const GameBoxStyle = {	
						width: '70vw',
						height: '60vh',
                        backgroundColor: 'primary.dark',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7]}
                    }

const PlayerBox = {
                    textAlign: 'center', 
                    backgroundColor: 'rgb(132,129,203, 0.7)',
                    border: '0.4rem solid'
                }

function Player(props: {ava: any, name: string}) {
    return (
            <Stack spacing={2}>
                <Avatar src={props.ava}  sx={BigAvatar}/>
                <Box sx={PlayerBox}>
                    {props.name}
                </Box>
            </Stack>
    );
}


export default function Gamepage() {
        return (
            <Stack spacing={15}>
                <SearchAppBar image={''}/>
                <Stack direction="row" spacing={4} style={GameStyle}>
                    <Player name={"Play one"} ava={Cactus}/>
                    <Box sx={GameBoxStyle}/>
                    <Player name={"Play two"} ava={Penguin}/>
                </Stack>
            </Stack>
        );
}
