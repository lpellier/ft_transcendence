import React, { useEffect } from "react";
import Stack from '@mui/material/Stack';

import "./../styles/Game/canvas.css"
import "./../styles/Game/buttons.css"
import "./../styles/Game/icons.css"
import "./../styles/Game/inputs.css"
import "socket.io-client"
import { User } from "interfaces";

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

function removeScripts() {
	let scripts = document.getElementsByClassName("p5-script");
	for (let i = 0; i < scripts.length; i++) {
		scripts[i].parentNode?.removeChild(scripts[i]);
	}
}

let observer : any = null;
let canvas : any = null;

function GameComponent() {
	useEffect(() => {
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
	}, []);

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
			<div id="button-sound"/>
			<div id="button-map-original"/>
			<div id="button-map-city"/>
			<div id="button-map-casino"/>
			<div id="button-spectate"/>
			<div id="icon-eye"/>
			<div id="background-city"/>
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

export default function Game( props: {user: User | undefined}) {	
	useEffect(() => {
		let user = document.createElement("div");
		const propsUser: any = props.user;
		user.setAttribute("user_name", propsUser.username);
		user.setAttribute("user_id", propsUser.id.toString());
		user.id = "user";
		
		document.head.append(user);

		addScript("https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.0/socket.io.js");
		addScript("/sketch/classes/Buttons.js");
		addScript("/sketch/classes/Vector.js");
		addScript("/sketch/classes/Bumper.js");
		addScript("/sketch/classes/Consts.js");
		addScript("/sketch/classes/Errors.js");
		addScript("/sketch/classes/Keys.js");
		addScript("/sketch/classes/Game.js");
		addScript("/sketch/classes/Inputs.js");
		addScript("/sketch/classes/Player.js");
		addScript("/sketch/classes/GameMap.js");
		addScript("/sketch/classes/Pong.js");
		addScript("/sketch/classes/MovingText.js");
		addScript("/sketch/engine/collisions.js");
		addScript("/sketch/engine/draw.js");
		addScript("/sketch/engine/output.js");
		addScript("/sketch/init/init.js");
		addScript("/sketch/init/setup.js");
		addScript("/sketch/socket/events.js");
		addScript("/sketch/engine/input.js");
		addScript("/sketch/engine/menus.js");
		addScript("/sketch/engine/button_functions.js");
		addScript("https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js");
		}, [props.user?.id])

	return (
		<Stack id="test_parent" spacing={5}>
			<GameComponent />
		</Stack>
	);
}
