import {
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";
import axios from 'axios'
import LogIn from './LogIn'
import TFAuth from './TFAuth'
import App from '../App'
import Profile from '../components/Profile/Profile'
import {useState, useEffect, } from 'react'
import {User} from 'interfaces';
import {socket} from 'index';
import Chat from "../components/Chat/Chat";
import Settings from "../components/Settings/Settings";
import Game from "./Game";
import { toast,  } from 'react-toastify';
import NotFound from "./NotFound";
import React from "react";

interface AuthContextType {
    user: User;
    // checkStatus: () => void;
    signin: (user: User, callback: VoidFunction) => void;
    update: (user: User) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode}) {
    let [user, setUser] = React.useState<User>(null!);

    // let checkStatus = () => {
    //     axios.get(process.env.REACT_APP_BACK_URL + "/users/me",
    //     {
    //         withCredentials: true
    //     }).then(res => {
    //     setUser(res.data);
    //     console.log("THIS IS A TEST", user)
    //     })
    //     .catch(err => console.log("THIS TOO IS A TEST", err))    }
    
    let signin = (user: User, callback: VoidFunction) => {
        setUser(user);
        callback();
    };

    let update = (user: User) => {
        setUser(user);
    }

    let signout = (callback: VoidFunction) => {
        setUser(null!);
        callback();
    }

    let value = {user, update, signin, signout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return React.useContext(AuthContext);
}

function RequireAuth({ children }: {children: JSX.Element}) {
    let auth = useAuth();
    
    if (!auth.user) {
        return <Navigate replace to="/login" />;
    }
    return children;
}


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

export default function AllRoutes()  {

    let [users, setUsers] = useState<User[]>([]);
	let [otherUser, setOtherUser] = useState<User>();
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
		axios.get(process.env.REACT_APP_BACK_URL + '/users/me',
        {
            withCredentials: true
        })
        .then(res => {
			console.log("Is Authenticated", res.data)
            
			setOtherUser(res.data);
        })
        .catch(function (err) {
			console.log("Authentication has failed : ", err)
        });
	}, [])

    

	return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/tfauth" element={<TFAuth />} />
                    <Route path="/" element={ <RequireAuth><App users={users} setOtherUser={setOtherUser} statusMap={statusMap} setStatusMap={setStatusMap}/></RequireAuth>}>
                        <Route path="profile" element={ <Profile user={undefined} />}/>
                        <Route path="chat" element={<Chat users={users} setOtherUser={setOtherUser} statusMap={statusMap}/>}/>
                        <Route path="game" element={<Game /> }/>
                        <Route path="settings" element={<Settings />}/>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
		</div>
	)
}
