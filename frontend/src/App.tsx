import Stack from '@mui/material/Stack'
import SearchAppBar from 'components/AppBar/AppBar'

import {useState, useEffect} from 'react'

import {User} from 'interfaces';

import axios from 'axios'
import {toast} from 'react-toastify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom'

import {socket} from 'index';


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


    return (
		<Stack spacing={2}>
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
    );
}