import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
// import Item from '@mui/material/Item';
import { useEffect } from 'react';
import ReactDOM from "react-dom";
import "./classes.css"

import SearchAppBar from 'components/AppBar/AppBar'
import Cactus from	"images/Avatar/Cactus.png"
import Penguin from	"images/Avatar/Penguin.png"

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

const wm = new WeakMap();

function addScript(url : string) : any {
    let scripts = document.getElementsByTagName("script");
	for (let i = scripts.length - 1; i >= 0; i--) {
		if (scripts[i] && scripts[i].getAttribute("src") && scripts[i].getAttribute("src") == url)
			return ;
	}
	const script = document.createElement('script');
	  
	script.src = url;
	script.async = true;
	script.classList.add("p5-script");

	document.body.appendChild(script);
	return script;
}

const removeScript = (scriptToremove : string) => {
    let scripts = document.getElementsByClassName("p5-script");
    for (let i=scripts.length - 1; i>=0; i--){
		if (scripts[i] && scripts[i].getAttribute("src") === null)
			continue;
		// @ts-ignore:next-line
		if (scripts[i] && scripts[i].getAttribute("src") !== null && scripts[i].getAttribute("src").indexOf(`${scriptToremove}`) !== -1 ) {
			ReactDOM.unmountComponentAtNode(scripts[i]);
			document.body.removeChild(scripts[i])
		}    
	}
}


function removeScripts() {
	removeScript("./p5/p5.js")
	removeScript("./Game/sketch/Player.js")
	removeScript("./Game/sketch/Pong.js")
	removeScript("./Game/sketch/Utils.js")
	removeScript("./Game/sketch/collisions.js")
	removeScript("./Game/sketch/events.js")
	removeScript("./Game/sketch/output.js")
	removeScript("./Game/sketch/init.js")
	removeScript("./Game/sketch/draw.js")
	removeScript("./Game/sketch/setup.js")
}

export default class Gamepage extends React.Component {	
	componentDidMount() {
		addScript("./p5/p5.js")
		addScript("./Game/sketch/Player.js")
		addScript("./Game/sketch/Pong.js")
		addScript("./Game/sketch/Utils.js")
		addScript("./Game/sketch/collisions.js")
		addScript("./Game/sketch/events.js")
		addScript("./Game/sketch/output.js")
		addScript("./Game/sketch/init.js")
		addScript("./Game/sketch/draw.js")
		addScript("./Game/sketch/setup.js")

		let main = document.body.getElementsByTagName("main");
		let buttons = document.body.getElementsByClassName('p5-button');
		
		console.log(buttons);
		for (let i = main.length - 1; i>=0; i--) {
			main[i].style["display"] = "block"; 
		}
		for (let i = buttons.length - 1; i>=0; i--) {
			if (wm.get(buttons[i]) == true){
				// @ts-ignore:next-line
				buttons[i].style["display"] = "block";
			}
		}
	}
	componentWillUnmount() {
		let main = document.body.getElementsByTagName("main");
		let buttons = document.body.getElementsByClassName('p5-button');
		
		for (let i = main.length - 1; i >= 0; i--) {
			main[i].style["display"] = "none"; 
		}
		for (let i = buttons.length - 1; i >= 0; i--) {
			// @ts-ignore:next-line
			if (buttons[i].style["display"] == "block")
				wm.set(buttons[i], true);
			else
				wm.set(buttons[i], false);
			// @ts-ignore:next-line
			buttons[i].style["display"] = "none";
		}
	}
	render() {
        return (
			<Stack spacing={5}>
                <SearchAppBar image={''}/>
				<Container id="canvas-parent">
					<div id="main-menu-button-grid">
						<div id="button-create"></div>
						<div id="main-menu-button-grid2">
							<div id="button-join"></div>
							<div id="button-matchmaking"></div>
						</div>
						<div id="button-local"></div>
					</div>
				</Container>
				
                {/* <Stack direction="row" spacing={4} style={GameStyle}> */}
                    {/* <Player name={"Play one"} ava={Cactus}/> */}
                    {/* <Box sx={GameBoxStyle}>
					</Box> */}
                    {/* <Player name={"Play two"} ava={Penguin}/> */}
                {/* </Stack> */}
            </Stack>
        );
	}
}
