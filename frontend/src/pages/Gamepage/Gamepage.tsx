import React from "react";
import Stack from '@mui/material/Stack';
import SearchAppBar from 'components/AppBar/AppBar'

import "./../../styles/Game/canvas.css"
import "./../../styles/Game/buttons.css"
import "./../../styles/Game/icons.css"
import "./../../styles/Game/inputs.css"

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

	document.head.appendChild(script);
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
					canvas_parent.appendChild(canvas);
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
					<div id="button-join"/>
					<div id="button-matchmaking"/>
				</div>
				<div id="create-menu-button-grid">
					<div id="button-anyone"/>
					<div id="button-invitation"/>
					<div id="button-local"/>
				</div>
				<div id="button-ai"/>
				<div id="button-validate"/>
				<div id="button-return"/>
				<div id="icon-return"/>
				<div id="icon-player_one"/>
				<div id="icon-player_two"/>
				<div id="buttons-plus-minus">	
					<div id="button-plus"/>
					<div id="button-minus"/>
				</div>
				<div id="input-join"/>
				<div id="input-score_limit"/>
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
				<div id="button-opp-left-ok"/>
			</div>
		);
	}
}

export default class Gamepage extends React.Component {	
	componentDidMount() {
		addScript("https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.0/socket.io.js");
		addScript("/game/sketch/classes/Buttons.js");
		addScript("/game/sketch/classes/Consts.js");
		addScript("/game/sketch/classes/Errors.js");
		addScript("/game/sketch/classes/Keys.js");
		addScript("/game/sketch/classes/Game.js");
		addScript("/game/sketch/classes/Inputs.js");
		addScript("/game/sketch/classes/Player.js");
		addScript("/game/sketch/classes/GameMap.js");
		addScript("/game/sketch/classes/Pong.js");
		addScript("/game/sketch/engine/collisions.js");
		addScript("/game/sketch/engine/draw.js");
		addScript("/game/sketch/engine/output.js");
		addScript("/game/sketch/init/init.js");
		addScript("/game/sketch/init/setup.js");
		addScript("/game/sketch/socket/events.js");
		addScript("/game/sketch/engine/input.js");
		addScript("/game/sketch/engine/menus.js");
		addScript("/game/sketch/engine/button_functions.js");
		addScript("/p5/p5.js");
	}

	render() {
        return (
			<Stack id="test_parent" spacing={5}>
                <SearchAppBar />
				<Game/>
            </Stack>
        );
	}
}
