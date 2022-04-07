import React, {Component} from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LogIn from '../pages/LogInpage/LogIn'
import Homepage from '../pages/Homepage/Homepage'
import Gamepage from '../pages/Gamepage/Gamepage'
import Chatpage from '../pages/Chatpage/Chatpage'

// const removeScript = (scriptToremove : any) => {
//     let allsuspects = document.getElementsByTagName("script");
//     for (let i=allsuspects.length; i>=0; i--){
// 		if (allsuspects[i] && allsuspects[i].getAttribute("src") !== null 
// 		&& allsuspects[i].getAttribute("src").indexOf(`${scriptToremove}`) !== -1 ) {
// 			allsuspects[i].parentNode.removeChild(allsuspects[i])
// 		}    
// 	}
// }

// function removeScripts() {
// 	removeScript("./p5/p5.js")
// 	removeScript("./Game/sketch/Player.js")
// 	removeScript("./Game/sketch/Pong.js")
// 	removeScript("./Game/sketch/Utils.js")
// 	removeScript("./Game/sketch/collisions.js")
// 	removeScript("./Game/sketch/events.js")
// 	removeScript("./Game/sketch/output.js")
// 	removeScript("./Game/sketch/init.js")
// 	removeScript("./Game/sketch/draw.js")
// 	removeScript("./Game/sketch/setup.js")
// }

export default class All_routes extends Component {
	render() {
        return (
            <BrowserRouter>
                <Routes>
					<Route path="/" element={<LogIn />} />
					<Route path="home" element={<Homepage />} />
					<Route path="game" element={<Gamepage />} />
					<Route path="chat" element={<Chatpage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
