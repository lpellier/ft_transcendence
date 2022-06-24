import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import {User} from 'interfaces'
import PinField from '../components/TFAuth/PinField'

const BoxStyle = {
	width: '30vw',
	height: '20vh',
	backgroundColor: 'rgb(130, 150, 240, 0.96)',
	border: '3px solid black',
	
	display: 'flex',
	justifyContent: 'center',
	VerticalAlign: 'center',
	position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const TitleStyle = {
	color: 'rgb(255, 150, 55)',
	textShadow: '1px 1px 2px black',
}

export default function TFAuth(props: {user: User}) {

	return (
		<Box sx={BoxStyle}>
			<Stack>
				<h1 style={TitleStyle} >
					Hey, insert your Pin !
				</h1>
				<PinField user={props.user} />
			</Stack>
		</Box>
	)

}