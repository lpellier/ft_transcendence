import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {User} from 'interfaces';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UpdateIcon from '@mui/icons-material/Update';
import {StatTitle, StatBox, MatchHistoryBox} from "../../styles/tsxStyles/Home"
import {Stats} from 'interfaces'
import axios from 'axios'
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import {ChangeAvatarTrophy, ChangeNameTrophy, QuitTrophy, OneWinTrophy, ThreeWinsTrophy} from "./Trophies"

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
	const [tot_games, setTotgame] = useState<number>(props.user.victories + props.user.losses)

	useEffect(() => {
		setTotgame(props.user.victories + props.user.losses)
	}, [props.user])

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
							<Button style={{width: '29%'}}> {props.user.victories} </Button>
							<Button style={{width: '29%'}}> {props.user.losses} </Button>
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
					<Stack spacing={2}>
						<ChangeAvatarTrophy /> 
						<ChangeNameTrophy /> 
						<QuitTrophy /> 
						<OneWinTrophy /> 
						<ThreeWinsTrophy />
					</Stack>
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

function MatchhistoryBox(props: {user: User}){
	
	const successColor: string = 'rgb(70, 195, 150)';
	const failColor: string = 'rgb(195, 60, 40)';

	return(
		<Stack spacing={1}>
			<BoardComponent 
				icon={<UpdateIcon />}
				title="Match history" />
				<Box sx={MatchHistoryBox}>
					<Table>
						<TableBody>
							{props.user.matchHistory.map(match => (
								<TableRow key={match.id} style={{backgroundColor: match.winnerId == props.user.id? successColor: failColor}}>
									<TableCell>
										<Typography>{match.players[0].username}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{match.score[0]}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{match.score[1]}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{match.players[1].username}</Typography>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
		</Stack>
	);
}

export default function StatsBoards(props: {user: User, users: User[]}) {

	console.log("StatsBoards props : ", props.user);
	return (
		<Stack direction="row" spacing={1}>
				<Stack spacing={1}>
					<StatsBox user={props.user}/>
					<TrophyBox />
				</Stack>
				<Stack spacing={1}>
					<LeaderboardBox users={props.users}/>
					<MatchhistoryBox user={props.user}/>
				</Stack>
			</Stack>
	);
}
