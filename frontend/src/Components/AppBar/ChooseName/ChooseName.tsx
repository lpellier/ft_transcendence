import React, { Component, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CasinoIcon from '@mui/icons-material/Casino';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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

function NameInput() {
	const [name, setName] = useState("");

	return (
		<Stack direction="row">
			<TextField 
				value={name}
				label="Your name" 
				variant="standard"
				style={{width: '50%', justifyContent: 'center'}}
				onChange={(e) => {
					setName(e.target.value);}}
			/>
			<IconButton color="primary" aria-label="upload picture" component="span">
          		<ThumbUpIcon />
        	</IconButton>
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
