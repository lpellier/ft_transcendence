import * as React from 'react'
import {useState} from 'react'
import Stack from '@mui/material/Stack'
import SearchAppBar from 'components/AppBar/AppBar'
import {User} from 'interfaces';
import {toast} from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom'


export const ImageIdContext = React.createContext({imageId : 1, setImageId : (n: number) => {}}); 

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

export default function App(props: {user: User | undefined, users: User[]}) {

    const [imageId, setImageId] = useState<number>(1)

    return (
        <ImageIdContext.Provider value={{imageId, setImageId}}>

		<Stack >
            {props.user?
                <div>
                    <SearchAppBar user={props.user} users={props.users} />
                    <Outlet />
                </div>
            		:
                <div/>
            }

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />

		</Stack>
        </ ImageIdContext.Provider>

    );
}