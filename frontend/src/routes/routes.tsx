import {
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
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
    let location = useLocation();
    
    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
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
    let [statusMap, setStatusMap] = useState<Map<number, string> >(new Map<number, string>());
    
    useEffect(() => {
		socket.on('exception', (data: any) => {
            toastThatError(data.message);
        });
        socket.on('new user', (usersData: User[]) => {
            console.log("usersData = ",usersData);
			setUsers(usersData);
		});
        return () => {
            socket.off('exception');
            socket.off('new user');
        }
    }, []);

    useEffect(() => {
        socket.on('new connection', (userId: number) => {
            setStatusMap(statusMap.set(userId, 'online'))
        });
        socket.on('new disconnection', (userId: number) => {
            setStatusMap(statusMap.set(userId, 'offline'))
        });
        socket.on('status map', (maps: {online: number[], inGame: number[]}) => {
            console.log('maps', maps);
            maps.online.forEach(userId => {
                setStatusMap(statusMap.set(userId, 'online'));
            })
            maps.inGame.forEach(userId => {
                setStatusMap(statusMap.set(userId, 'in game'));
            })
        });

        return () => {
            socket.off('new connection')
            socket.off('new disconnection');
            socket.off('status map');
        }
    }, [statusMap]);

	return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/tfauth" element={<TFAuth />} />
                    <Route path="/" element={ <RequireAuth><App users={users} statusMap={statusMap} setStatusMap={setStatusMap}/></RequireAuth>}>
                        <Route path="profile" element={ <Profile self={true} />}/>
                        <Route path="users/:id" element={ <Profile self={false} />}/>
                        <Route path="chat" element={<Chat users={users} statusMap={statusMap}/>}/>
                        <Route path="game" element={<Game /> }/>
                        <Route path="settings" element={<Settings />}/>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
		</div>
	)
}
