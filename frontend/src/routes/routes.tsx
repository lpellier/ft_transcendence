import {
    Routes,
    Route,
    Navigate,
    Link,
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
import { toast, ToastContainer } from 'react-toastify';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import NotFound from "./NotFound";


export function toastThatError(message: string) {
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
}

export function toastIt(message: string) {
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
}

function ProtectedRoute(props: {children: JSX.Element, auth: any}) {

	if (props.auth === false) {
        return <Navigate replace to="/login" />;
    }
    return props.children
}

export default function AllRoutes()  {

    interface inviteDto {
        userId: number,
        inviterId: number,
        inviteeId: number,
    }

    
    const [isAuth, setAuth] = useState(true);
	const [user, setUser] = useState<User>();
    let [users, setUsers] = useState<User[]>([]);
	let [otherUser, setOtherUser] = useState<User>();
    const [open, setOpen] = useState(false);
    const [invite, setInvite] = useState<inviteDto>();
    const [navigate, setNavigate] = useState(false);
    let [statusMap, setStatusMap] = useState<Map<number, string> >(new Map<number, string>());

    useEffect(() => {
        const handler = (data: any) => {
            toastThatError(data.message);
        }
		socket.on('exception', handler);
        return () => {
            socket.off('exception', handler);
        }
    }, []);

    useEffect(() => {
        const handler = (userId: number) => {
            setStatusMap(statusMap.set(userId, 'online'));
        }
        socket.on('new connection', handler)
        return () => {
            socket.off('new connection', handler)
        }
    }, [statusMap]);

    useEffect(() => {
        const handler = (userId: number) => {
            setStatusMap(statusMap.set(userId, 'offline'));
        }
        socket.on('new disconnection', handler);
        return () => {
            socket.off('new disconnection', handler);
        }
    }, [statusMap]);

    useEffect(() => {
		const handler = (usersData: User[]) => {
            console.log("usersData = ",usersData);
			setUsers(usersData);
		}
		socket.on('new user', handler);
		return (() => {
			socket.off('new user', handler);
		})
	}, [])

    useEffect(() => {
        const handler = (maps: {online: number[], inGame: number[]}) => {
            console.log('maps', maps);
            maps.online.forEach(userId => {
                setStatusMap(statusMap.set(userId, 'online'));
            })
            maps.inGame.forEach(userId => {
                setStatusMap(statusMap.set(userId, 'in game'));
            })
        }
        socket.on('status map', handler);
        return () => {
            socket.off('status map', handler);
        }
    }, [statusMap]);

    useEffect(() => {
        const init = () => {
            if (user)
            {
                socket.emit('new user', {userId: user.id, roomId: 1});
            }
        }
            if (socket.connected)
                init();
            else
                socket.on('connect', init)
    }, [user])

    useEffect(() => {
		axios.get(process.env.REACT_APP_BACK_URL + '/users/me',
        {
            withCredentials: true
        })
        .then(res => {
			console.log("Is Authenticated", res.data)
			setAuth(true);
            
            setUser(res.data);

			setOtherUser(res.data);
        })
        .catch(function (err) {
			console.log("Authentication has failed : ", err)
			setAuth(false);
        });
	}, [isAuth])
	

    useEffect(() => {
        const handler = (data: any) => { 
            setOpen(true)  
            setInvite(data)
        }
        socket.on('invite for game', handler);
        return () => {
            socket.off('invite for game');
        }
    }, [])

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };    


    function acceptGame() {
        socket.emit('accepted game', invite, user?.id)
        setOpen(false);
    }

    useEffect(() => {
        const handler = () => { 
            setNavigate(true) 
        }
        socket.on('accepted game', handler);
        return () => {
            socket.off('accepted game');
        }
    }, [])
    
    const action = (
        <div>
            <Button color="secondary" size="small" onClick={acceptGame} >
                <Link to='/game' style={{ textDecoration: 'none' }}>
                    Accept
                </Link>
            </Button>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </div>
    );

	return (
        <div>
            <ToastContainer />
            <Snackbar
                open={open}
                onClose={handleClose}
                message={`You have been invited to play a game with ${users.find(user => user?.id === invite?.userId)?.username}`}
                action={action}
            />
            { navigate? <Navigate replace to="/game" /> : <div/> }
            <Routes>
                <Route path="/login" element={<LogIn user={user} auth={isAuth}/>} />
                <Route path="/tfauth" element={<TFAuth setAuth={setAuth}/>} />
                <Route path="/" element={ <ProtectedRoute auth={isAuth}><App user={user} users={users} setOtherUser={setOtherUser} statusMap={statusMap} setStatusMap={setStatusMap}/></ProtectedRoute>}>
                    <Route path="profile" element={ <Profile user={otherUser} users={users}/>}/>
                    <Route path="chat" element={<Chat user={user} users={users} setOtherUser={setOtherUser} statusMap={statusMap}/>}/>
                    <Route path="game" element={<Game user={user} navigate={navigate} setNavigate={setNavigate}/> }/>
                    <Route path="settings" element={<Settings user={user} setUser={setUser}/>}/>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>

		</div>
	)
}
