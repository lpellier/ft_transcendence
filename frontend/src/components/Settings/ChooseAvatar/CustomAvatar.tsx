import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import { redTheme, greenTheme } from '../../Themes'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useState} from 'react'
import axios from 'axios'

const Input = styled('input')({
	display: 'none',
  });

function CustomButton(props: {content:string, theme: any, onClick: any}) {
	return(
		<ThemeProvider theme={props.theme}>
			<Button variant="contained" color="primary" onClick={props.onClick}>
	 	 		{props.content}
      		</Button>
		</ThemeProvider>
	);
}

function NoButton(props: {onClick: any}) {
	return (
		<CustomButton theme={redTheme} content={"Change my mind !"} onClick={props.onClick}/>
		);
}
	
function YesButton(props: {onClick: any}) {
	return (
		<CustomButton theme={greenTheme} content={"Let's go !"} onClick={props.onClick}/>
	);
}

function UploadButton(props: {setOpen: any}) {
	const [selectedFile, setSelectedFile] = useState<any>();
	const [isSelected, setisSelected] = useState(false);

	const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
		setisSelected(true);
	};

	function handleSubmit() {
		const formData = new FormData();
		formData.append('avatar', selectedFile)

		console.log("axios put data : ", formData, "type is : ", typeof(formData))

		axios.put("http://127.0.0.1:3001/users/upload-avatar",
		formData,
		{
			withCredentials: true,
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})
		.then(res => {
			console.log("Put avatar request success")
			props.setOpen(false)
		})
		.catch(err => {
			console.log("Put avatar request failed : ", err)
		})
	};

	function closeModal() {
		props.setOpen(false)
	}
	
	return (
		<div>
			<label htmlFor="icon-button-file">
				<Input type="file" id="icon-button-file" name="file" onChange={changeHandler} />
				<IconButton color="primary" aria-label="upload picture" component="span">
					<PhotoCamera />
  				</IconButton>
			</label>
			{isSelected ? 
			<div>
				<p>Filename: {selectedFile.name}</p>
				<p>Filetype: {selectedFile.type}</p>
				<p>Size in bytes: {selectedFile.size}</p>
			</div>
				:
				<p>No file selected yet</p>
			}
			<Stack direction="row" spacing={3}>
				<YesButton onClick={handleSubmit}/>
				<NoButton onClick={closeModal}/>
			</Stack>
		</div>
	  );
}
		
export default function CustomAvatar(props: {setOpen: any}) {
  return (
    <Stack spacing={2} style={{marginTop: '5%'}}>
    	<Stack direction="row" spacing={2} style={{marginTop: '5%'}}>
   			<Button
    	    	variant="contained"
    	    	color="secondary"
				>
    			Choose file :
    		</Button>
    		<UploadButton setOpen={props.setOpen}/>
		</Stack>
    </Stack>
  );
}
