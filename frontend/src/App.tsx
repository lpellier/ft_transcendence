import Stack from '@mui/material/Stack'
import SearchAppBar from 'components/AppBar/AppBar'
import Profile from 'components/Profile/Profile'
import Chat from 'components/Chat/Chat'
import Game from './routes/Game'
import Settings from 'components/Settings/Settings'

import {useState, useEffect} from 'react'

import {User} from 'interfaces';

import axios from 'axios'

import {socket} from 'index';



export default function App() {

    const [component, setComponent] = useState<string>('Profile');
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
            console.log("Get user request success")
            const resUser = res.data;
            setUser(resUser);
        })
        .catch(function (err) {
            console.log("Get user request failed : ", err)
        });
	}, [])

    return (
		<Stack spacing={2}>
            {user?
                <div>
                    <SearchAppBar user={user} component={component} setComponent={setComponent}/>
                    {component === "Profile"?
                        <Profile user={user}/>
                    :
                        <div>
                            {component === "Game"?
                                <Game/>
                            :
                                <div>
                                    {component === "Chat"?
                                        <Chat user={user} users={users}/>
                                    :
                                        <div>
                                            {component === "Settings"?
                                                <Settings user = {user}/>
                                            :
                                                <div/>
                                            }
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    } 
                </div>
            :
                <div/>
            }
		</Stack>
    );
}