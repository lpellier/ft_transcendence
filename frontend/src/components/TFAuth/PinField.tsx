import {useState, useEffect} from 'react'
import {User} from 'interfaces'
import TextField from '@mui/material/TextField'
import axios from 'axios'

export default function PinField(props: {user: User}) {
	const [pinInput, setPininput] = useState<string>("");
	
	function handleSubmit(e: any)
	{
		setPininput(e.target[0].value);
		e.target[0].value = "";

		console.log("pin value : ", pinInput)
	}

	useEffect(() => {
		axios.post('http://127.0.0.1:3001/auth/google-authenticator',
		{
			data: {
				otp: pinInput,
			}
		},
		{
			withCredentials: true,
		})
		.catch(function (err) {
			console.log("Patch request failed : ", err)
			console.log("pin value : ", pinInput)
		});
	}, [pinInput])

	return (
		<form id='' onSubmit={handleSubmit}>
			<TextField
				type="text"
				label={"Here !"}
				variant="standard"
			/>
		</form>
	);
}