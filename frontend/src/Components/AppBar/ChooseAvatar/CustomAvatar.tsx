import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import { redTheme, greenTheme } from '../../Themes'
import UploadButton from './UploadButton'

function CustomButton(props: {content:string, theme: any}) {
	return(
		<ThemeProvider theme={props.theme}>
			<Button variant="contained" color="primary">
	 	 		{props.content}
      		</Button>
		</ThemeProvider>
	);
}

function NoButton() {
	return (
		<CustomButton theme={redTheme} content={"NO !"}/>
	);
}

function YesButton() {
	return (
		<CustomButton theme={greenTheme} content={"Yes !"}/>
	);
}

export default function CustomAvatar() {
  return (
    <Stack spacing={2} style={{marginTop: '5%'}}>
    <Stack direction="row" spacing={2} style={{marginTop: '5%'}}>
      <Button
          variant="contained"
          color="secondary">
        	Choose file :
      </Button>
      <UploadButton />
		</Stack>
    <Stack direction="row" spacing={2} style={{marginTop: '5%'}}>
		<NoButton />
		<YesButton />
    </Stack>
    </Stack>
  );
}
