import { useState, useEffect } from "react";
import { Stack, Box, Grid, Typography,
			Table, TableBody, TableRow, TableCell, TableHead
} from "@mui/material";
import { User } from "interfaces";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimelineIcon from "@mui/icons-material/Timeline";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import UpdateIcon from "@mui/icons-material/Update";
import {
  StatTitle,
  StatBox,
  MatchHistoryBox
} from "../../styles/tsxStyles/Profile";
import { Stats } from "interfaces";
import {
  ChangeAvatarTrophy,
  QuitTrophy,
  OneWinTrophy,
  ThreeWinsTrophy,
  achievements
} from "./Trophies";
import axios from "axios";

function Typocell(props: {label: string | number, align: "left" | "center" | "right" | "justify" | "inherit" | undefined}) {
	return (
		<TableCell align={props.align}>
			<Typography>
				{props.label}
			</Typography>
		</TableCell>
  );
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
		<Table>
			<TableHead>
				<TableRow>
					<Typocell align="center" label={"victories"}/>
					<Typocell align="center" label={"Games lost"}/>
					<Typocell align="center" label={"total games"}/>
				</TableRow>
			</TableHead>
			<TableBody>
			<TableRow>
				<Typocell align="center" label={props.user.victories}/>
				<Typocell align="center" label={props.user.losses}/>
				<Typocell align="center" label={tot_games}/>
			</TableRow>
			</TableBody>
		</Table>
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
		<Table>
				<TableHead>
					<TableRow>
						<Typocell align="left" label={"Best Player"}/>
						<Typocell align="center" label={"wins"}/>
						<Typocell align="center" label={"losses"}/>
						<Typocell align="center" label={"level"}/>
					</TableRow>
				</TableHead>
				<TableBody>
				{leaders.map((item) => {
					return (
						<TableRow>
							<Typocell align="left" label={item.username}/>
							<Typocell align="center" label={item.victories}/>
							<Typocell align="center" label={item.losses}/>
							<Typocell align="center" label={Math.trunc(item.level)}/>
						</TableRow>)
				})}
		</TableBody>
		</Table>
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
				<Typocell align="left" label={match.players[0].username}/>
				<Typocell align="left" label={match.score[0]}/>
				<Typocell align="right" label={match.score[1]}/>
				<Typocell align="right" label={match.players[1].username}/>
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
