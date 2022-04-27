import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Cookies from "universal-cookie";

import LogIn from '../pages/LogInpage/LogIn'
import Homepage from '../pages/Homepage/Homepage'
import Gamepage from '../pages/Gamepage/Gamepage'
import Chatpage from '../pages/Chatpage/Chatpage'
import Error from '../pages/Error/Error'
import { jsx } from "@emotion/react";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

type Props = {children: JSX.Element}

function ProtectedRoute({children} : Props) {
    if (token) {
        return (<>{children}</>)
    }
    else {
        return (<Navigate replace to="/" />)
    }
}

export default function AllRoutes() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LogIn />} />
                    <Route path="home" element={ <ProtectedRoute><Homepage /></ProtectedRoute>} />
                    <Route path="game" element={ <ProtectedRoute><Gamepage /></ProtectedRoute>} />
                    <Route path="chat" element={ <ProtectedRoute><Chatpage /></ProtectedRoute>} />
                    <Route path="error" element={ <ProtectedRoute><Error /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        );
}
