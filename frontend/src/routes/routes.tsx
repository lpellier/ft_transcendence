import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LogIn from '../pages/LogInpage/LogIn'
import Homepage from '../pages/Homepage/Homepage'
import Gamepage from '../pages/Gamepage/Gamepage'
import Chatpage from '../pages/Chatpage/Chatpage'

export default function AllRoutes() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LogIn />} />
                    <Route path="home" element={<Homepage />} />
                    <Route path="game" element={<Gamepage />} />
                    <Route path="chat" element={<Chatpage />} />
                    <Route path="token"/>
                </Routes>
            </BrowserRouter>
        );
}
