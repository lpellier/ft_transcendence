import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from 'axios'

import LogIn from '../pages/LogIn'
import Settingspage from '../pages/Settingspage'
import Homepage from '../pages/Homepage'
import Gamepage from '../pages/Gamepage'
import Chatpage from '../pages/Chatpage'
import Error from '../pages/Error'


function ProtectedRoute(props: {children: JSX.Element, auth: any}) {
	console.log("auth", props.auth)

	if (props.auth === true) {
		return (
			<>{props.children}</> 
		)}
    else {
        return (
        	console.log("Cannot login"),
        	<Navigate replace to="/" />
		)}
}

export default function AllRoutes()  {
	const [isAuth, setAuth] = useState(true);

	useEffect (() => {
		axios.get('http://127.0.0.1:3001/users/me', {
			withCredentials: true,
		})
		.then(res => {
			setAuth(true);
			console.log("Authentication get request success")
		})
		.catch(function (err) {
			setAuth(false);
			console.log("Authentication get request failed : ", err)
		})
		console.log("Auth is : ", isAuth)
	}, [])

	return (
		<BrowserRouter>
	        <Routes>
	            <Route path="/" element={<LogIn />} />
	            <Route path="home" element={ <ProtectedRoute auth={isAuth} ><Homepage /></ProtectedRoute>} />
	            <Route path="game" element={ <ProtectedRoute auth={isAuth} ><Gamepage /></ProtectedRoute>} />
	            <Route path="chat" element={ <ProtectedRoute auth={isAuth} ><Chatpage /></ProtectedRoute>} />
	            <Route path="error" element={ <ProtectedRoute auth={isAuth} ><Error /></ProtectedRoute>} />
	            <Route path="settings" element={ <ProtectedRoute auth={isAuth} ><Settingspage /></ProtectedRoute>} />
	        </Routes>
	    </BrowserRouter>
	)
}
