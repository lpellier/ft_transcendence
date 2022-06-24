import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from 'axios'
import LogIn from './LogIn'
import Settingspage from './Settingspage'
import Profile from './Profile'
import Gamepage from './Gamepage'
import Chatpage from './Chatpage'
import TFAuth from './TFAuth'
import { User, init_user } from "interfaces";


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
	const [user, setUser] = useState<User>(init_user);

	useEffect (() => {
		axios.get('http://127.0.0.1:3001/users/me', {
			withCredentials: true,
		})
		.then(res => {
			setAuth(true);
			setUser(res.data);
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
	            {/* {user.tfa === true && <Route path="/auth" element={<TFAuth />} />} */}
	            <Route path="/auth" element={<TFAuth user={user} />} />
	            <Route path="profile" element={ <ProtectedRoute auth={isAuth} ><Profile /></ProtectedRoute>} />
	            <Route path="game" element={ <ProtectedRoute auth={isAuth} ><Gamepage /></ProtectedRoute>} />
	            <Route path="chat" element={ <ProtectedRoute auth={isAuth} ><Chatpage /></ProtectedRoute>} />
	            <Route path="settings" element={ <ProtectedRoute auth={isAuth} ><Settingspage /></ProtectedRoute>} />
	        </Routes>
	    </BrowserRouter>
	)
}
