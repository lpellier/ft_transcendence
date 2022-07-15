import {useEffect, useState, useRef} from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import StatsBoards from './StatsBoards'
import Typography from '@mui/material/Typography'
import {User} from 'interfaces'
import {PlayerBarStyle, SkillBarContourStyle, TitleStyle} from "../../styles/tsxStyles/Home";
import './../../styles/Other/SkillBar.css'
import {PlayerAvatar} from	'../Avatars';
import { useAuth } from "components/AuthProvider";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { LinearProgress } from '@mui/material'

const OverallBoxStyle = {
	paddingTop: '4vh',
	display: 'flex',
	justifyContent: 'center',
}

function SkillBar(props: {progression: number}) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
			  <LinearProgress sx={{ height: "20px", borderRadius: "20px"}} variant="determinate" value={props.progression} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
			  <Typography variant="body2" color="text.secondary">{`${Math.round(
				props.progression,
			  )}%`}</Typography>
			</Box>
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
						<PlayerAvatar image={process.env.REACT_APP_BACK_URL + '/avatars/' + props.user.id + '.png'} />
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

export default function Profile(props: {self: boolean}) {
	const [profile, setProfile] = useState<User>(null!)
	let auth = useAuth();
	let params = useParams()

	if (props.self === true && !profile) {
		console.log(auth.user)
		setProfile(auth.user);
	}

	useEffect( () => {
		if (props.self === false && !profile) {
			axios.get(process.env.REACT_APP_BACK_URL + "/users/" + params.id || "",
			{withCredentials: true}).then(res => {
			setProfile(res.data);
			})
		}
	}, []);


    return (
		<Box sx={OverallBoxStyle}>
			<Stack spacing={1}>
			{profile? <div>
				<PlayerInfoBand level={profile.level} user={profile} />
				<StatsBoards user={profile}/> </div> : <div />
			}
			</Stack>
		</Box>
    );
}