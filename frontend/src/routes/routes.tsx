import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import axios from 'axios'
import LogIn from './LogIn'
import TFAuth from './TFAuth'
import App from '../App'
import Profile from '../components/Profile/Profile'
import {useState, useEffect} from 'react'
import {User} from 'interfaces';
import {socket} from 'index';
import Chat from "../components/Chat/Chat";
import Settings from "../components/Settings/Settings";
import Game from "./Game";


function ProtectedRoute(props: {children: JSX.Element, auth: any}) {

	if (props.auth === true) {
		return (
			<>{props.children}</> 
		)}
    else {
        return (
        	console.log("Cannot login"),
        	<Navigate replace to="/login" />
		)}
}

export default function AllRoutes()  {
	const [isAuth, setAuth] = useState(true);
	const [user, setUser] = useState<User>();
    let [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
		const handler = (usersData: User[]) => {
			setUsers(usersData);
		}
		socket.on('new user', handler);
		return (() => {
			socket.off('new user', handler);
		})
	}, [])

    useEffect(() => {
        const init = () => {
            if (user)
                socket.emit('new user', {userId: user.id, roomId: 1});
        }
            if (socket.connected)
                init();
            else
                socket.on('connect', init)
    }, [user])

    useEffect(() => {
		axios.get('http://127.0.0.1:3001/users/me',{
            withCredentials: true
        })
        .then(res => {
			console.log("Is Authenticated")
			setAuth(true);
            setUser(res.data);

        })
        .catch(function (err) {
			console.log("Authentication has failed : ", err)
			setAuth(false);
        });
	}, [isAuth])
	
	return (
		<BrowserRouter>
	        <Routes>
	            <Route path="/login" element={<LogIn user={user} auth={isAuth}/>} />
				<Route path="tfauth" element={<TFAuth setAuth={setAuth}/>} />
	            <Route path="/" element={ <ProtectedRoute auth={isAuth}><App user={user} users={users}/></ProtectedRoute>}>
					<Route path="profile" element={ < Profile user={user}/>}/>
					<Route path="chat" element={<Chat user={user} users={users}/>}/>
					<Route path="game" element={<Game user={user}/>}/>
					<Route path="settings" element={<Settings user={user}/>}/>
				</Route>
			</Routes>

	    </BrowserRouter>
	)
}
