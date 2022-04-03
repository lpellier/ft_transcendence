import { createTheme } from '@mui/material/styles';
import { orange, red, green } from 'material-ui-colors'

const orangeTheme = createTheme({ palette: { primary: orange } })

const redTheme = createTheme({ palette: { primary: red } })

const greenTheme = createTheme({ palette: { primary: green } })

export {orangeTheme, redTheme, greenTheme}
