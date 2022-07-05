import {useState, useEffect, useRef} from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {init_user, User} from 'interfaces';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';
import {StatTitle, StatBox} from "../../styles/tsxStyles/Home"
import {Stats} from 'interfaces'
import axios from 'axios'

const ButtonLeadStyle = {
	backgroundColor: "rgb(170, 50, 190)",
	width: '20%',
}

const ButtonStatStyle = {
	backgroundColor: "rgb(170, 50, 190)",
	width: '29%',
}

function BoardComponent(props: {icon: any, title: string}) {
	return(
		<Stack direction="row" sx={StatTitle} spacing={2}>
				{props.icon}
				<Typography>
					{props.title}
				</Typography>
		</Stack>
	);
}

function StatsBox(props: {user: User}){
	const [user, setUser] = useState<User>(props.user)
	const [tot_games, setTotgame] = useState<number>(props.user.victories + props.user.losses)

	useEffect(() => {

		axios.get("http://127.0.0.1:3001/users/me",
		{ withCredentials: true })
		.then(res => {
			console.log("Get user in stat success")
			setUser(res.data)
			setTotgame(res.data.victories + res.data.losses)})
		.catch(err => {
			console.log("Get user in stat failed : ", err)		
		})
		
	}, [])

	return (
		<Stack spacing={1}>
			<BoardComponent
				icon={<TimelineIcon />} 
				title="Stats" />
				<Box sx={StatBox}>
					<Stack>
						<Stack direction="row" spacing={2}>
							<Button variant="contained" style={ButtonStatStyle}>Victories</Button>
							<Button variant="contained" style={ButtonStatStyle}>Games lost</Button>
							<Button variant="contained" style={ButtonStatStyle}>Total games</Button>
						</Stack>
						<Stack direction="row" spacing={2}>
							<Button style={{width: '29%'}}> {user.victories} </Button>
							<Button style={{width: '29%'}}> {user.losses} </Button>
							<Button style={{width: '29%'}}> {tot_games} </Button>
						</Stack>
					</Stack>
				</Box>
		</Stack>
	);
}
	
function TrophyBox(){

		return(
			<Stack spacing={1}>
				<BoardComponent 
					icon={<EmojiEventsIcon />}
					title="Trophy" />
				<Box sx={StatBox}>
				</Box>
			</Stack>
		);
}

function LeaderboardBox(props: {users: User[]}){
	const [leaders, setLeaders] = useState<Stats[]>([])
	
	useEffect(() => {
		
		axios.get(
			"http://127.0.0.1:3001/stats/lead",
			{
				withCredentials: true
			}
		)
		.then(res => {
			console.log("Get leader success")
			setLeaders(res.data)
		})
		.catch(err => {
			console.log("Get leader failed : ", err)
		})
	}, [])


	function FindUserName(userId: number) {
		let username;
		
		for (let i in props.users)
		{
			if (props.users[Number(i)].id === userId){
				username = props.users[Number(i)].username;
			}
		}

		return (
			<div> {username} </div>
		)
	}
	
	function LeaderList(props: {users: User[]}) {

		return (
			<Box sx={{ flexGrow: 1 }} >
				<Stack direction="row" spacing={2}>
						<Button variant="contained" style={ButtonLeadStyle}> Best Player </Button>
						<Button variant="contained" style={ButtonLeadStyle}> Wins </Button>
						<Button variant="contained" style={ButtonLeadStyle}> Losses </Button>
						<Button variant="contained" style={ButtonLeadStyle}> Level </Button>
				</Stack>
					{leaders.map(item => (
						<div  key={item.id}>
							<Stack direction="row" spacing={2}>
									<Button style={{width: '20%'}}> {FindUserName(item.userId)} </Button>
									<Button style={{width: '20%'}}> {item.victories} </Button>
									<Button style={{width: '20%'}}> {item.losses} </Button>
									<Button style={{width: '20%'}}> {Math.trunc(item.level)} </Button>
							</Stack>
					</div>
					))}
			</Box>
		)
	}

	return(
		<div>
			{leaders?
				<Stack spacing={1}>
					<BoardComponent 
						icon={<MilitaryTechIcon />}
						title="Leaderboard" />
						<Box sx={StatBox}>
							<LeaderList users={props.users}/>
						</Box>
				</Stack>
					:
				<div/>
			}
		</div>
	);
}

function MatchhistoryBox(){

	return(
		<Stack spacing={1}>
			<BoardComponent 
				icon={<UpdateIcon />}
				title="Match history" />
				<Box sx={StatBox}>
				</Box>
		</Stack>
	);
}

export default function StatsBoards(props: {user: User, users: User[]}) {

	return (
		<Stack direction="row" spacing={1}>
				<Stack spacing={1}>
					<StatsBox user={props.user}/>
					<TrophyBox />
				</Stack>
				<Stack spacing={1}>
					<LeaderboardBox users={props.users}/>
					<MatchhistoryBox />
				</Stack>
			</Stack>
	);
}
