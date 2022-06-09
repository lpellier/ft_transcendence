import {useState} from 'react'
import Button from '@mui/material/Button'
import PinInput from './pinInput'
import Stack from '@mui/material/Stack'

function TFAButton() {
	
	const [input, showedInput] = useState(false);
	
	function pinChoice() {
		showedInput(true)
	}

	return (
		<Stack>
    		< Button
				onClick={pinChoice}
				variant="contained"
				color="secondary">
				Activate Two Factor Authentication
			</Button>
			{input && <PinInput />}
		</Stack>
    );
  }

export {TFAButton}