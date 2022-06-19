import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import LogIn from '../pages/LogIn'
import Settingspage from '../pages/Settingspage'
import Homepage from '../pages/Homepage'
import Gamepage from '../pages/Gamepage'
import Chatpage from '../pages/Chatpage'
import Error from '../pages/Error'
import {token} from 'index'

type Props = {children: JSX.Element}

function ProtectedRoute({children} : Props) {
    if (token) {
        return (
			<>{children}</>
		)
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
