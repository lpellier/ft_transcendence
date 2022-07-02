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
import { phoneSize } from 'index';
import {StatTitle, StatBox} from "../../styles/tsxStyles/Home"
import {Stats} from 'interfaces'
import axios from 'axios'

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

	useEffect(() => {
		setTotGame(props.user.victories + props.user.losses)
	}, [props.user])

	return (
		<Stack spacing={1}>
			<BoardComponent
				icon={<TimelineIcon />} 
				title="Stats" />
				<Box sx={StatBox}>
					<Stack direction="row" spacing={2}>
						<Button>Victories</Button>
						<Button>Games lost</Button>
						<Button>Total games</Button>
					</Stack>
					<Stack direction="row" spacing={8}>
						<Button>  {props.user.victories} </Button>
						<Button>  {props.user.losses} </Button>
						<Button>  {totGames} </Button>
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
			<div >
				<Stack direction="row" spacing={3}>
					<Button> Best Player </Button>
					<Button> Wins </Button>
					<Button> Losses </Button>
					<Button> Level </Button>
				</Stack>
				{leaders.map(item => (
					<div key={item.id}>
							<Stack direction="row" spacing={8}>
								<Button> {FindUserName(item.userId)} </Button>
								<Button> {item.victories} </Button>
								<Button> {item.losses} </Button>
								<Button> {item.level} </Button>
							</Stack>
					</div>
				))}
			</div>
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
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		
		const handleResizeWindow = () => setWidth(window.innerWidth);
		 window.addEventListener("resize", handleResizeWindow);
		 return () => {
		   window.removeEventListener("resize", handleResizeWindow);
		 };
	}, [])

	if (width <= phoneSize) {
	  return (
		<Stack spacing={1}>
				<StatsBox user={props.user}/>
				<TrophyBox />
				<LeaderboardBox users={props.users}/>
				<MatchhistoryBox />
		</Stack>
	  );
	}
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
