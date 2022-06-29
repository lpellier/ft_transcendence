import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { NameButtonStyle } from '../../../styles/tsxStyles/Settings/Name'

import axios from 'axios';

import {User} from 'interfaces'

function NameButton() {
	return (
		<Button disabled 
			sx={NameButtonStyle}
			variant="contained"
			color="secondary">
			Choose New name :
		</Button>
	);
}

function NameInput(props: {username: string, setter: any}) {

	function handleSubmit(e: any)
	{
		e.preventDefault();
		props.setter(e.target[0].value);
		e.target[0].value = "";
	}

	useEffect(() => {
		console.log("sending : ", props.username, " as ", typeof(props.username))

		axios.patch(
			'http://127.0.0.1:3001/users/me',
			{username : props.username},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		.then(res => {
			console.log("Changing name success : ", props.username)
		})
		.catch(err => {
			console.log("Put request failed : ", err)
		});
	}, [props.username])

	return (
		<Stack direction="row">
		<form id='ChangeNameForm' onSubmit={handleSubmit} style={{width: '100%'}}>
			<TextField
				type="text"
				label="Your name" 
				variant="standard"
				style={{width: '50%', justifyContent: 'center'}}
				id='name'
			/>
		</form>
		</Stack>
	);
}

export default function ChooseName(props: {user: User}) {
    const [new_username, setNewUsername] = useState(props.user.username);

	return (
			<Stack spacing={2} style={{justifyContent: 'center'}}>
                <NameButton />
				<NameInput username={new_username} setter={setNewUsername}/>
            </Stack>
    );
}
