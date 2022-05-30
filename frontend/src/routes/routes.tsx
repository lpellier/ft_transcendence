import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {token} from 'index';

import LogIn from '../pages/LogInpage/LogIn'
import Settingspage from '../pages/Settingspage/Settingspage'
import Homepage from '../pages/Homepage/Homepage'
import Gamepage from '../pages/Gamepage/Gamepage'
import Chatpage from '../pages/Chatpage/Chatpage'
import Error from '../pages/Error/Error'


type Props = {children: JSX.Element}

function ProtectedRoute({children} : Props) {
    if (token) {
        // console.log("Token value : ", {token}); // ? je me suis permis de commenter
        return (
        <>{children}</>)
    }
    else {
        return (
        console.log("No token found : Access denied"),
        <Navigate replace to="/" />)
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
                    <Route path="settings" element={ <ProtectedRoute><Settingspage /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        );
}
