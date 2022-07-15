import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { User } from "interfaces";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimelineIcon from "@mui/icons-material/Timeline";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import UpdateIcon from "@mui/icons-material/Update";
import {
  StatTitle,
  StatBox,
  MatchHistoryBox,
} from "../../styles/tsxStyles/Profile";
import { Stats } from "interfaces";
import {
  ChangeAvatarTrophy,
  QuitTrophy,
  OneWinTrophy,
  ThreeWinsTrophy,
} from "./Trophies";
import axios from "axios";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";

enum achievements {
  ONESTAR,
  THREESTARS,
  QUIT,
  CHANGEAVATAR,
}

const ButtonStatStyle = {
  backgroundColor: "rgb(170, 50, 190)",
  width: "29%",
};

const TitleBoxStyle = {
	backgroundColor: "rgb(170, 50, 190)",
	borderRadius: "4px",
	border: "1px solid black",
	padding: "5%",
	boxShadow: '0px 2px 5px 1px gray',
	width: '80%',
	height: '100%',
	textTransform: 'uppercase',
	overflow: 'hidden',
	
	display: 'flex',
	justifyContent: 'center',
	textAlign: 'center',
	verticalAlign: 'middle',
}

const TextBoxStyle = {
	color: "rgb(30, 70, 200)",
	padding: "1%",
	width: '80%',
	overflow: 'hidden',

	textAlign: 'center',
}

function SpecialGridings(props: {sx: any, xs: number, label: string | number}) {
	return (
		<Grid item xs={props.xs}>
			<Box sx={props.sx}> {props.label} </Box>
		</Grid>
	);
}

function BoardComponent(props: { icon: any; title: string }) {
  return (
    <Stack direction="row" sx={StatTitle} spacing={2}>
      {props.icon}
      <Typography>{props.title}</Typography>
    </Stack>
  );
}

function StatsBox(props: { user: User }) {
  const [tot_games, setTotgame] = useState<number>(
    props.user.victories + props.user.losses
  );

  useEffect(() => {
    setTotgame(props.user.victories + props.user.losses);
  }, [props.user]);

  return (
    <Stack spacing={1}>
      <BoardComponent icon={<TimelineIcon />} title="Stats" />
      <Box sx={StatBox}>
		<Stack spacing={1}>
	  		<Grid container rowSpacing={2}>
				<SpecialGridings sx={TitleBoxStyle} xs={4} label={"victories"}/>
				<SpecialGridings sx={TitleBoxStyle} xs={4} label={"Games lost"}/>
				<SpecialGridings sx={TitleBoxStyle} xs={4} label={"total games"}/>
			</Grid>
	  		<Grid container rowSpacing={2}>
				<SpecialGridings sx={TextBoxStyle} xs={4} label={props.user.victories}/>
				<SpecialGridings sx={TextBoxStyle} xs={4} label={props.user.losses}/>
				<SpecialGridings sx={TextBoxStyle} xs={4} label={tot_games}/>
        	</Grid>
			</Stack>
      </Box>
    </Stack>
  );
}

function TrophyBox(props: { user: User }) {
  return (
    <Stack spacing={1}>
      <BoardComponent icon={<EmojiEventsIcon />} title="Trophy" />
      <Box sx={StatBox}>
        <Stack spacing={1}>
          {props.user.achievements.find(
            (val) => val === achievements.ONESTAR
          ) !== undefined ? (
            <OneWinTrophy />
          ) : (
            <div />
          )}
          {props.user.achievements.find(
            (val) => val === achievements.THREESTARS
          ) !== undefined ? (
            <ThreeWinsTrophy />
          ) : (
            <div />
          )}
          {props.user.achievements.find((val) => val === achievements.QUIT) !==
          undefined ? (
            <QuitTrophy />
          ) : (
            <div />
          )}
          {props.user.achievements.find(
            (val) => val === achievements.CHANGEAVATAR
          ) !== undefined ? (
            <ChangeAvatarTrophy />
          ) : (
            <div />
          )}
        </Stack>
      </Box>
    </Stack>
  );
}

function LeaderboardBox() {
  const [leaders, setLeaders] = useState<Stats[]>([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACK_URL + "/stats/lead", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Get leader success");
        setLeaders(res.data);
      })
      .catch((err) => {
        console.log("Get leader failed : ", err);
      });
  }, []);

  function LeaderList() {
    return (
		<Stack spacing={2}>
			<Grid container rowSpacing={3}>
				<SpecialGridings sx={TitleBoxStyle} xs={3} label={"Best Player"}/>
				<SpecialGridings sx={TitleBoxStyle} xs={3} label={"wins"}/>
				<SpecialGridings sx={TitleBoxStyle} xs={3} label={"losses"}/>
				<SpecialGridings sx={TitleBoxStyle} xs={3} label={"level"}/>
			</Grid>
        {leaders.map((item) => (
			<div key={item.id}>
				<Grid container rowSpacing={3}>
					<SpecialGridings sx={TextBoxStyle} xs={3} label={item.username}/>
					<SpecialGridings sx={TextBoxStyle} xs={3} label={item.victories}/>
					<SpecialGridings sx={TextBoxStyle} xs={3} label={item.losses}/>
					<SpecialGridings sx={TextBoxStyle} xs={3} label={Math.trunc(item.level)}/>
				</Grid>
			</div>
    	))}
		</Stack>
    );
  }

  return (
    <div>
      {leaders ? (
        <Stack spacing={1}>
          <BoardComponent icon={<MilitaryTechIcon />} title="Leaderboard" />
          <Box sx={StatBox}>
            <LeaderList />
          </Box>
        </Stack>
      ) : (
        <div />
      )}
    </div>
  );
}

function MatchhistoryBox(props: { user: User }) {
  const successColor: string = "rgb(70, 195, 150)";
  const failColor: string = "rgb(195, 60, 40)";

  return (
    <Stack spacing={1}>
      <BoardComponent icon={<UpdateIcon />} title="Match history" />
      <Box sx={MatchHistoryBox}>
        <Table>
          <TableBody>
            {props.user.matchHistory.map((match) => (
              <TableRow
                key={match.id}
                style={{
                  backgroundColor:
                    match.winnerId === props.user.id ? successColor : failColor,
                }}
              >
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

export default function StatsBoards(props: { user: User }) {
  console.log("Rendered statsboards", props.user);
  return (
	<Box>
		<Grid container rowSpacing={3} columnSpacing={{md: 3}}>
			<Grid item xs={6}>
        		<StatsBox user={props.user} />
			</Grid>
			<Grid item xs={6}>
        		<TrophyBox user={props.user} />
			</Grid>
			<Grid item xs={6}>
        		<LeaderboardBox />
			</Grid>
			<Grid item xs={6}>
        		<MatchhistoryBox user={props.user} />
			</Grid>
		</Grid>
	</Box>
  );
}
