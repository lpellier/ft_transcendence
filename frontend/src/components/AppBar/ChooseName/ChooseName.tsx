import React, { Component, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CasinoIcon from '@mui/icons-material/Casino';

import { NameButtonStyle } from '../../../styles/tsxStyles/AppBar/Name'

import {token} from 'index';
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

function NameInput(props: {user: User, setUser: React.Dispatch<React.SetStateAction<User>>}) {

	let [new_username, setNewUsername] = useState(props.user.username);

	function handleSubmit(e: any)
	{
		e.preventDefault();
		props.setUser({id: props.user.id, username: e.target[0].value, avatar: props.user.avatar});
		e.target[0].value = "";
	}

	useEffect(() => {

		axios.put('http://127.0.0.1:3001/users/me',
			props.user,
			{
			headers: {
				'Authorization': token,
				'Content-Type': 'application/json'
			}
		})
		.catch(function (err) {
			console.log("Get request failed : ", err)
		});
	}, [props.user])


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

function NameRandom() {
	return (
		<Button
			startIcon={<CasinoIcon />}
			color="secondary"
			>
	  		Create random name
		</Button>
	);
}

export default function ChooseName(props: {user: User, setUser: React.Dispatch<React.SetStateAction<User>>}) {

        return (
				<Stack spacing={2} style={{justifyContent: 'center'}}>
                    <NameButton />
					<NameInput user={props.user} setUser={props.setUser}/>
					<NameRandom />
                </Stack>
        );
}
