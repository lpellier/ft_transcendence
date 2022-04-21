import React from "react";
import Stack from '@mui/material/Stack';
import SearchAppBar from 'components/AppBar/AppBar'

import "./classes.css"

// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Cactus from	"images/Avatar/Cactus.png"
// import Penguin from	"images/Avatar/Penguin.png"

// const BigAvatar = {border: 4, width: 100, height: 100}

// const GameStyle = { justifyContent: 'center', 
//                     alignItems: 'center'
//                     }

// const GameBoxStyle = {	
// 						width: '70vw',
// 						height: '60vh',
//                         backgroundColor: 'primary.dark',
//                         '&:hover': {
//                             backgroundColor: 'primary.main',
//                             opacity: [0.9, 0.8, 0.7]}
//                     }

// const PlayerBox = {
//                     textAlign: 'center', 
//                     backgroundColor: 'rgb(132,129,203, 0.7)',
//                     border: '0.4rem solid'
//                 }

// function Player(props: {ava: any, name: string}) {
//     return (
//             <Stack spacing={2}>
//                 <Avatar src={props.ava}  sx={BigAvatar}/>
//                 <Box sx={PlayerBox}>
//                     {props.name}
//                 </Box>
//             </Stack>
//     );
// }

function addScript(url : string) : any {
    let scripts = document.getElementsByTagName("script");
	for (let i = scripts.length - 1; i >= 0; i--) {
		if (scripts[i] && scripts[i].getAttribute("src") && scripts[i].getAttribute("src") === url)
			return ;
	}
	const script = document.createElement('script');

	script.src = url;
	script.async = true;
	script.classList.add("p5-script");

	document.body.appendChild(script);
	return script;
}

let observer : any = null;
let canvas : any = null;

class Game extends React.Component {
	componentDidMount() {
		let canvas_parent : any = document.getElementById("canvas-parent");
		if (canvas === null)
			canvas = document.getElementById("defaultCanvas0");
		else if (canvas_parent)
			canvas_parent.appendChild(canvas);

		if (canvas === null) {
			observer = new MutationObserver(() => {
				canvas = document.getElementById("defaultCanvas0");
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
				<div id="wasd-keys">
					<div id="w-key"/>
					<div id="a-key"/>
					<div id="s-key"/>
					<div id="d-key"/>
				</div>
				<div id="arrow-keys">
					<div id="up-key"/>
					<div id="left-key"/>
					<div id="down-key"/>
					<div id="right-key"/>
				</div>
			</div>
		);
	}
}

export default class Gamepage extends React.Component {	
	componentDidMount() {
		addScript("/game/sketch/classes/Buttons.js");
		addScript("/game/sketch/classes/Consts.js");
		addScript("/game/sketch/classes/Errors.js");
		addScript("/game/sketch/classes/Keys.js");
		addScript("/game/sketch/classes/Game.js");
		addScript("/game/sketch/classes/Inputs.js");
		addScript("/game/sketch/classes/Player.js");
		addScript("/game/sketch/classes/Pong.js");
		addScript("/game/sketch/engine/collisions.js");
		addScript("/game/sketch/engine/draw.js");
		addScript("/game/sketch/engine/output.js");
		addScript("/game/sketch/init/init.js");
		addScript("/game/sketch/init/setup.js");
		addScript("/game/sketch/socket/events.js");
		addScript("/p5/p5.js");
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
