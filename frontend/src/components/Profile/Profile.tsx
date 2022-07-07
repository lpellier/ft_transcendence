import {useEffect, useState, useRef} from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import {toastThatError} from '../../routes/routes'
import StatsBoards from './StatsBoards'
import Typography from '@mui/material/Typography'
import {User} from 'interfaces'
import {PlayerBarStyle, SkillBarContourStyle, TitleStyle} from "../../styles/tsxStyles/Home";
import './../../styles/Other/SkillBar.css'
import {PlayerAvatar} from	'../Avatars';
import axios from 'axios'

const OverallBoxStyle = {
	paddingTop: '4vh',
	display: 'flex',
	justifyContent: 'center',
}

function SkillBar(props: {progression: number}) {
	const [length, setLength] = useState(0);
	const totwidth = length + "px";
	const SkillBox = useRef();

	useEffect(() => {
		//@ts-ignore: next-line
		setLength((props.progression / 100) * SkillBox.current.offsetWidth);
	}, [props.progression]);

	return (
		<Box ref={SkillBox} sx={SkillBarContourStyle} >
			<div style={{width: totwidth}} className="SkillBar">
					<Typography variant="subtitle2" sx={TitleStyle}>
						{props.progression}%
					</Typography>
			</div>
		</Box>
	);
}

function PlayerInfoBand(props: {level: number, user: User}) {
	const [xp, setXp] = useState<number>(Math.trunc(props.level * 100) % 100) 
	const [level, setLevel] = useState<number>(Math.trunc(props.level)) 

	useEffect(() => {
		setLevel(Math.trunc(props.level))
		setXp(Math.trunc(props.level * 100) % 100)
	}, [props.level])
	
	return (
			<Box sx={PlayerBarStyle}>
				<Stack >
					<Stack direction="row" spacing={35}>
						<PlayerAvatar image={'http://127.0.0.1:3001/avatars/' + props.user.id + '.png'} onClick={ () => {} }/>
						<Stack spacing={1} >
							<Typography variant="h5">
							 	{props.user.username}
							</Typography>
							<Typography variant="h6">
								Level {level}
							</Typography>
						</Stack>
					</Stack>
					<SkillBar progression={xp}/>
				</Stack>
			</Box>
	);
}

export default function Profile(props: {user: User | undefined, users: User[]}) {
	const [user, setUser] = useState<User | undefined>(props.user)
	const [open, setOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	const [username, setUsername] = useState<string>("")

	function handleSubmit(e: any)
	{
		e.preventDefault();
		setUsername(e.target[0].value);
		e.target[0].value = "";
		setIsSubmitted(true)
	}

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {

		axios.get("http://127.0.0.1:3001/users/me",
		{ withCredentials: true })
		.then(res => {
			console.log("Get user in profile success")
			setUser(res.data)})
		.catch(err => {
			console.log("Get user in profile failed : ", err)		
		})
	}, [])

	function ChooseFirstName() {

		function PatchRequest() {

			axios.patch(
				'http://127.0.0.1:3001/users/me',
				{username : username},
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then(async res => {
				console.log("Changing name success : ", username)
				await axios.get( 'http://127.0.0.1:3001/users/me',{ withCredentials: true,})
				.then(res => {
					setUser(res.data)
					console.log("User : ", res.data);
				})
				.catch(err => {
					console.log("Appbar get request failed : ", err)
				})
			})
			.catch(err => {
				toastThatError('invalid username');
			});
		}

		return (
			<Stack direction="row">
			<form id='ChangeNameForm' onSubmit={handleSubmit} style={{width: '100%'}}>
				<TextField
					type="text"
					label="Enter a nickname !" 
					variant="standard"
					style={{width: '50%', justifyContent: 'center'}}
					id='name'
				/>
			{isSubmitted === true?
				PatchRequest()
					:
				<div/>
			}
			</form>
		</Stack>
		)
	}

	// function ChooseFirstAvatar() {

	// }

	// function ChooseFirstTFA() {

	// }

    return (
		<Box sx={OverallBoxStyle}>
			<Modal
			  open={open}
			  onClose={handleClose}
			>
				<Box>
					<Stack spacing={3}>
						<ChooseFirstName />
						{/* <ChooseFirstAvatar />
						<ChooseFirstTFA /> */}
					</Stack>
          		</Box>
        	</Modal>
			{user?
				<Stack spacing={1}>
					<PlayerInfoBand level={user.level} user={user} />
					<StatsBoards user={user} users={props.users} />
				</Stack>
					:
					<div/>
			}
		</Box>
    );
}