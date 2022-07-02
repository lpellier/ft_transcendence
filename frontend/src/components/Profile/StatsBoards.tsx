import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {User} from 'interfaces';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';
import {StatTitle, StatBox} from "../../styles/tsxStyles/Home"
import {Stats} from 'interfaces'
import axios from 'axios'


const ButtonStatStyle = {
	backgroundColor: "rgb(170, 50, 190)",
	width: '20%',
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
	const [totGames, setTotGame] = useState<number>(props.user.victories + props.user.losses)
	const [wins, setWins] = useState<number>(props.user.victories)
	const [losses, setLosses] = useState<number>(props.user.losses)

	useEffect(() => {
		setWins(props.user.victories)
		setLosses(props.user.losses)
		setTotGame(wins + losses)
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
							<Button style={{width: '20%'}}> {wins} </Button>
							<Button style={{width: '20%'}}> {losses} </Button>
							<Button style={{width: '20%'}}> {totGames} </Button>
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
			console.log("Get leader success: ", res.data)
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
						<Button variant="contained" style={ButtonStatStyle}> Best Player </Button>
						<Button variant="contained" style={ButtonStatStyle}> Wins </Button>
						<Button variant="contained" style={ButtonStatStyle}> Losses </Button>
						<Button variant="contained" style={ButtonStatStyle}> Level </Button>
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
