import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { NameButtonStyle } from '../../../styles/tsxStyles/AppBar/Name'

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

function NameInput(props: {user: User}) {
	let [new_username, setNewUsername] = useState(props.user.username);

	function handleSubmit(e: any)
	{
		setNewUsername(e.target[0].value);
		e.target[0].value = "";
	}

	useEffect(() => {
		axios.put('http://127.0.0.1:3001/users/me',
			{
				data: {
					username: new_username,
				}
			},
			{
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.catch(function (err) {
			console.log("Put request failed : ", err)
		});
	}, [new_username])

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

        return (
				<Stack spacing={2} style={{justifyContent: 'center'}}>
                    <NameButton />
					<NameInput user={props.user}/>
                </Stack>
        );
}
