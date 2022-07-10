import { useEffect } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FirstLoginPrompt from '../components/Prompt'

import "./../styles/Game/canvas.css"
import "./../styles/Game/buttons.css"
import "./../styles/Game/icons.css"
import "./../styles/Game/inputs.css"
import "socket.io-client"
import { User } from "interfaces";
import { Sketch } from "../components/Game/game"
import p5 from "p5";

let observer : any = null;
let canvas : any = null;

function GameComponent() {
	useEffect(() => {
		const p = new p5(Sketch);
		let canvas_parent : any = document.getElementById("canvas-parent");
		if (canvas === null){
			canvas = document.getElementById("defaultCanvas0");
		}
		else if (canvas_parent) {
			canvas_parent.appendChild(canvas);
		}
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

export default function Game( props: {user: User | undefined, navigate: boolean, setNavigate: React.Dispatch<React.SetStateAction<boolean>> }) {	
	useEffect(() => {
		let user = document.createElement("div");
		const propsUser: any = props.user;
		user.setAttribute("user_name", propsUser.username);
		user.setAttribute("user_id", propsUser.id.toString());
		user.id = "user";
		document.head.append(user);
		}, [props.user?.id, props.user])

		useEffect(() => {
			props.setNavigate(false);
		}, [props.setNavigate])

		useEffect(() => {
			if (props.navigate) {
				props.setNavigate(false);
			}
		}, [props.navigate, props.setNavigate])

	return (
		<Stack id="test_parent" spacing={1}>
			{props.user && props.user.username === null ? 
				<FirstLoginPrompt user={props.user}/>
				:
				<div />
			}
			<Box sx={{paddingTop: '2%', }} >
				<GameComponent />
			</Box>
		</Stack>
	);
}
