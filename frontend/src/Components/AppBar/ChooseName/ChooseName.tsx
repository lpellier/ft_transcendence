import React, { Component, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CasinoIcon from '@mui/icons-material/Casino';

function NameButton() {
	return (
	<Button disabled 
	style={{backgroundColor: "purple", color: "white"}}
	variant="contained"
	color="secondary">
  Choose New name :
</Button>
	);
}

function NameInput(props) {
	const [name, setName] = useState("");

	function handleSubmit( e: any){	
		e.preventDefault();
		props.setName(e.target[0].value);
	}

	return (
		<Stack direction="row">
		<form id='ChangeNameForm' onSubmit={handleSubmit} style={{width: '100%'}}>
			<TextField 
				type="text"
				label="Your name" 
				variant="standard"
				style={{width: '50%', justifyContent: 'center'}}
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

export default class ChooseName extends React.Component {
    render() { 
        return (
				<Stack spacing={2} style={{justifyContent: 'center'}}>
                    <NameButton />
					<NameInput />
					<NameRandom />
                </Stack>
        );
    }
}
