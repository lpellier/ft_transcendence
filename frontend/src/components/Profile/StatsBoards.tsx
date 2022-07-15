import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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

const ButtonLeadStyle = {
  backgroundColor: "rgb(170, 50, 190)",
  width: "20%",
};

const ButtonStatStyle = {
  backgroundColor: "rgb(170, 50, 190)",
  width: "29%",
};

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
        <Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" style={ButtonStatStyle}>
              Victories
            </Button>
            <Button variant="contained" style={ButtonStatStyle}>
              Games lost
            </Button>
            <Button variant="contained" style={ButtonStatStyle}>
              Total games
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button style={{ width: "29%" }}> {props.user.victories} </Button>
            <Button style={{ width: "29%" }}> {props.user.losses} </Button>
            <Button style={{ width: "29%" }}> {tot_games} </Button>
          </Stack>
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
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" style={ButtonLeadStyle}>
            {" "}
            Best Player{" "}
          </Button>
          <Button variant="contained" style={ButtonLeadStyle}>
            {" "}
            Wins{" "}
          </Button>
          <Button variant="contained" style={ButtonLeadStyle}>
            {" "}
            Losses{" "}
          </Button>
          <Button variant="contained" style={ButtonLeadStyle}>
            {" "}
            Level{" "}
          </Button>
        </Stack>
        {leaders.map((item) => (
          <div key={item.id}>
            <Stack direction="row" spacing={2}>
              <Button style={{ width: "20%" }}> {item.username} </Button>
              <Button style={{ width: "20%" }}> {item.victories} </Button>
              <Button style={{ width: "20%" }}> {item.losses} </Button>
              <Button style={{ width: "20%" }}>
                {" "}
                {Math.trunc(item.level)}{" "}
              </Button>
            </Stack>
          </div>
        ))}
      </Box>
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
		<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
