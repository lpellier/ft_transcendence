import * as React from 'react'
import {useState} from 'react'
import Stack from '@mui/material/Stack'
import SearchAppBar from 'components/AppBar/AppBar'
import {User} from 'interfaces';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom'


export const ImageIdContext = React.createContext({imageId : 1, setImageId : (n: number) => {}}); 

export default function App(props: {user: User | undefined, users: User[], setOtherUser: React.Dispatch<React.SetStateAction<User | undefined>>}) {

    const [imageId, setImageId] = useState<number>(1)

    return (
        <ImageIdContext.Provider value={{imageId, setImageId}}>
		<Stack >
            {props.user?
                <div>
                    <SearchAppBar user={props.user} users={props.users} setOtherUser={props.setOtherUser}/>
                    <Outlet />
                </div>
            		:
                <div/>
            }
		</Stack>
        </ ImageIdContext.Provider>

    );
}