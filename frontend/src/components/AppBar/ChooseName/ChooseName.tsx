import React, { Component, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CasinoIcon from '@mui/icons-material/Casino';

import { NameButtonStyle } from '../../../styles/tsxStyles/AppBar/Name' 

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

function NameInput() {

	return (
		<Stack direction="row">
		{/* <form id='ChangeNameForm' onSubmit={handleSubmit} style={{width: '100%'}}> */}
			<TextField 
				type="text"
				label="Your name" 
				variant="standard"
				style={{width: '50%', justifyContent: 'center'}}
			/>
		{/* </form> */}
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

export default function ChooseName() {
        return (
				<Stack spacing={2} style={{justifyContent: 'center'}}>
                    <NameButton />
					<NameInput />
					<NameRandom />
                </Stack>
        );
}
