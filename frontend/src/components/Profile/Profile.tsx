import {useEffect, useState, useRef} from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
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

    return (
		<Box sx={OverallBoxStyle}>
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