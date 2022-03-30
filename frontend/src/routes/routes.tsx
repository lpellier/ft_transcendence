import React, {Component} from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LogIn from '../pages/LogInpage/LogIn.tsx'
import Homepage from '../pages/Homepage/Homepage.tsx'
import Gamepage from '../pages/Gamepage/Gamepage.tsx'
import Chatpage from '../pages/Chatpage/Chatpage.tsx'

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
