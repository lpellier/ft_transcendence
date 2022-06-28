import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from 'axios'
import LogIn from './LogIn'
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
	}, [isAuth])

	return (
		<BrowserRouter>
	        <Routes>
	            <Route path="/" element={<LogIn />} />
	            <Route path="profile" element={ <ProtectedRoute auth={isAuth} ><App /></ProtectedRoute>} />
	        </Routes>
	    </BrowserRouter>
	)
}
