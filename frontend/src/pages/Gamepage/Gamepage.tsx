import React, { createElement } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

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

	document.head.appendChild(script);
	return script;
}

let observer : any = null;
let canvas : any = null;
// let main_menu_buttons : any = null;

class Game extends React.Component {
	componentDidMount() {
		let canvas_parent : any = document.getElementById("canvas-parent");
		if (canvas === null)
			canvas = document.getElementById("defaultCanvas0");
		else if (canvas_parent)
			canvas_parent.appendChild(canvas);

		// if (main_menu_buttons === null)
		// 	main_menu_buttons = document.getElementById("main-menu-button-grid");
		// else if (canvas_parent) {
		// 	canvas_parent.appendChild(main_menu_buttons);
		// }
		
		if (canvas === null) {
			observer = new MutationObserver(() => {
				canvas = document.getElementById("defaultCanvas0");
				// main_menu_buttons = document.getElementById("main-menu-button-grid");
				if (canvas) {
					observer.disconnect();
					observer = null;
				}
			});
			observer.observe(document, {subtree: true, childList: true});
		}
	}
	componentWillUnmount() {
		if (observer) {
			observer.disconnect();
			observer = null;
		}
	}
	render() {
		return (
			<div id="canvas-parent">
				<div id="main-menu-button-grid">
					<div id="button-create"/>
					<div id="main-menu-button-grid2">
						<div id="button-join"/>
						<div id="button-matchmaking"/>
					</div>
					<div id="button-local"/>
				</div>
				<div id="create-menu-button-grid">
					<div id="button-anyone"/>
					<div id="button-friends"/>
					<div id="button-invitation"/>
				</div>
				<div id="button-validate"/>
				<div id="button-return"/>
				<div id="input-join"/>
			</div>
		);
	}
}

export default class Gamepage extends React.Component {	
	componentDidMount() {
		addScript("/p5/p5.js");
		addScript("/Game/sketch/Player.js");
		addScript("/Game/sketch/Pong.js");
		addScript("/Game/sketch/Utils.js");
		addScript("/Game/sketch/collisions.js");
		addScript("/Game/sketch/events.js");
		addScript("/Game/sketch/output.js");
		addScript("/Game/sketch/init.js");
		addScript("/Game/sketch/draw.js");
		addScript("/Game/sketch/setup.js");
	}
	render() {
        return (
			<Stack spacing={5}>
                <SearchAppBar image={''}/>
				<Game/>
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
