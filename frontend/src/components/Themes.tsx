import { createTheme } from '@mui/material/styles';
import { orange, red, green } from 'material-ui-colors'

const orangeTheme = createTheme(
{ palette: { 
		primary: {
			main: orange[800],
		},
		secondary: {
			main: orange[500],
		},
	},
})

const redTheme = createTheme(
{ palette: { 
		primary: {
			main: red[800],
		},
		secondary: {
			main: red[500],
		},
	},
})

const greenTheme = createTheme(
{ palette: { 
		primary: {
			main: red[800],
		},
		secondary: {
			main: red[500],
		},
	},
})

export {orangeTheme, redTheme, greenTheme}
