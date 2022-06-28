import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {useState, useEffect} from 'react'
import {User, init_user} from 'interfaces'
import axios from 'axios'
import LogIn from './LogIn'
import TFAuth from './TFAuth'
import App from '../App'


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

	console.log("user is : ", user)

	useEffect (() => {
		axios.get('http://127.0.0.1:3001/users/me', {
			withCredentials: true,
		})
		.then(res => {
			setAuth(true);
			setUser(res.data)
			console.log("Authentication get request success")
		})
		.catch(function (err) {
			setAuth(false);
			console.log("Authentication get request failed : ", err)
		})
		console.log("Auth is : ", isAuth)
	}, [isAuth])

	return (
		<BrowserRouter>
	    	<Routes>
	    	    <Route path="/" element={<LogIn user={user} auth={isAuth} />} />
	    	    <Route path="/tfauth" element={<TFAuth setAuth={setAuth}/>} />
	    	    <Route path="profile" element={ <ProtectedRoute auth={isAuth} ><App /></ProtectedRoute>} />
	    	</Routes>
	    </BrowserRouter>
	)
}
