import { createTheme } from '@mui/material/styles';
import { orange, red, green, purple } from 'material-ui-colors'

const orangeTheme = createTheme(
	{ palette: { 
		primary: {
			main: orange[500],
		},
		secondary: {
			main: red[500],
		},
	},
	})

const redTheme = createTheme({ palette: { primary: red } })

const greenTheme = createTheme({ palette: { primary: green } })

export {orangeTheme, redTheme, greenTheme}
