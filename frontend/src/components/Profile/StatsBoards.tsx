import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
} from "@mui/material";
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
  achievements,
} from "./Trophies";
import axios from "axios";

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
      <TableContainer sx={StatBox}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Wins</TableCell>
              <TableCell align="center">Losses</TableCell>
              <TableCell align="center">Total games</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{props.user.victories}</TableCell>
              <TableCell align="center">{props.user.losses}</TableCell>
              <TableCell align="center">{tot_games}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
      <TableContainer sx={StatBox}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Best Player</TableCell>
              <TableCell align="center">Wins</TableCell>
              <TableCell align="center">Losses</TableCell>
              <TableCell align="center">Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaders.map((item) => {
              return (
                <TableRow>
                  <TableCell align="left">{item.username}</TableCell>
                  <TableCell align="center">{item.victories}</TableCell>
                  <TableCell align="center">{item.losses}</TableCell>
                  <TableCell align="center">{Math.trunc(item.level)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <div>
      {leaders ? (
        <Stack spacing={1}>
          <BoardComponent icon={<MilitaryTechIcon />} title="Leaderboard" />
          <LeaderList />
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
                <TableCell align="left">{match.players[0].username}</TableCell>
                <TableCell align="left">{match.score[0]}</TableCell>
                <TableCell align="right">{match.score[1]}</TableCell>
                <TableCell align="right">{match.players[1].username}</TableCell>
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
      <Grid container rowSpacing={3} columnSpacing={{ md: 3 }}>
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

