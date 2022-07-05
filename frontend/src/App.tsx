import {useState, createContext} from 'react'
import Stack from '@mui/material/Stack'
import SearchAppBar from 'components/AppBar/AppBar'
import {User} from 'interfaces';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, Navigate, useOutlet } from 'react-router-dom'


export const ImageIdContext = createContext({imageId : 1, setImageId : (n: number) => {}}); 
export const UserUpdateContext = createContext({changeUser : 1, setChangeUser : (n: number) => {}}); 

export default function App(props: {user: User | undefined, users: User[], setOtherUser: React.Dispatch<React.SetStateAction<User | undefined>>}) {

    const [imageId, setImageId] = useState<number>(1)
    const [changeUser, setChangeUser] = useState<number>(1)

    const outlet = useOutlet();        

    return (
        <ImageIdContext.Provider value={{imageId, setImageId}}>
        <UserUpdateContext.Provider value={{changeUser, setChangeUser}}>
		<Stack >
            {props.user?
                <div>
                    <SearchAppBar user={props.user} users={props.users} setOtherUser={props.setOtherUser}/>
                    {outlet?
                        <Outlet />
                        :
                        <Navigate replace to="/profile"/> 
                    }
                </div>
            		:
                <div/>
            }
		</Stack>
        </ UserUpdateContext.Provider>
        </ ImageIdContext.Provider>
    );
}