import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import QRCode from 'react-qr-code'
import axios from 'axios'
import {token} from 'index'
import {User} from 'interfaces'

function GenerateQRCode(props: {url: string}) {

	return (
		<Box sx={{'& > :not(style)': {m: 1,},}}>
			<Stack spacing={1}>
				< QRCode value={props.url} />
			</Stack>
		</Box>
	)
}

function TFAButton() {
	const [input, showedInput] = useState(false);
	const [url, setUrl] = useState("");
	const [user, setUser] = useState<User>({avatar: "", id: -1, username: "", winHistory: -1, lossHistory: -1, tfa: false});
	const [status, setStatus] = useState(false);

	useEffect(() => {
		axios.get('http://127.0.0.1:3001/users/me',{
		headers: {
			'Authorization': token,
		}
		})
		.then(res => {
			console.log("Get request success")
			const getData = res.data;
			setUser(getData);
		})
		.catch(function (err) {
			console.log("Get request failed : ", err)
		});
	}, [])

	function putTfa() {

		axios.put('http://127.0.0.1:3001/users/me', 
			{
				data: {
					tfa: status,
				},
			},	
			{
				headers: {
					'Authorization': token,
				}
			})
			.catch(function (err) {
				console.log("Setting tfa failed :", err)
			})
	}

	function showFlashcode() {
		//const otpUrl = "otpauth://totp/transcendance?secret=" +  ;
		// const res = axios.get('http://127.0.0.1:3001/auth',{
		// headers: {
			// 'Authorization': token,
		// }
		// })
		// .then(res => {
			// console.log("Get otp secret success")
			// const getData = res.data;
			// console.log("get secret result : ", res.data)
			// setSecret(getData);
		// })
		// .catch(function (err) {
			// console.log("Get secret failed : ", err)
		// });
			showedInput(true)
			setStatus(true)
			putTfa()
			setUrl("http://127.0.0.1:3000/settings")
		}

		function deactivateTfa() {
			setStatus(true)
			putTfa()
		}

	if (user.tfa == false) {
		return (
			<Stack>
    			< Button
					onClick={showFlashcode}
					variant="contained"
					color="secondary">
					Activate Two Factor Authentication
				</Button>
				{input 
					&& < GenerateQRCode url={url} /> 
					}
			</Stack>
    	);}
		return (
			<Stack>
    			< Button
					onClick={deactivateTfa}
					variant="contained"
					color="secondary">
					Deactivate Two Factor Authentication
				</Button>
			</Stack>
		)
  }

export {TFAButton}