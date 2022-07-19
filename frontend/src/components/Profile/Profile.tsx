import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import StatsBoards from "./StatsBoards";
import Typography from "@mui/material/Typography";
import { User } from "interfaces";
import { PlayerBarStyle } from "../../styles/tsxStyles/Profile";
import "./../../styles/Other/SkillBar.css";
import { PlayerAvatar } from "../Avatars";
import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { client } from "App";

const OverallBoxStyle = {
  paddingTop: "4vh",
  display: "flex",
  justifyContent: "center",
};

function SkillBar(props: { progression: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ height: "20px", borderRadius: "20px" }}
          variant="determinate"
          value={props.progression}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          props.progression
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function PlayerInfoBand(props: { user: User }) {
  return (
    <Box sx={PlayerBarStyle}>
      <Stack>
        <Stack direction="row" spacing={35}>
          <PlayerAvatar
            image={
              process.env.REACT_APP_BACK_URL +
              "/avatars/" +
              props.user.id +
              ".png"
            }
          />
          <Stack spacing={1}>
            <Typography variant="h5">{props.user.username}</Typography>
            <Typography variant="h6">
              Level {Math.trunc(props.user.level)}
            </Typography>
          </Stack>
        </Stack>
        <SkillBar progression={Math.trunc(props.user.level * 100) % 100} />
      </Stack>
    </Box>
  );
}

export default function Profile(props: { self: boolean }) {
  const [profile, setProfile] = useState<User>(null!);
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (props.self === true && !profile) {
      client
        .get("/users/me")
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          navigate("/login");
        });
    } else if (props.self === false && !profile) {
      client
        .get("/users/" + params.id || "")
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          navigate("/login");
        });
    }
  }, []);

  return (
    <Box sx={OverallBoxStyle}>
      {profile ? (
        <Stack spacing={4}>
          <PlayerInfoBand user={profile} />
          <StatsBoards user={profile} />{" "}
        </Stack>
      ) : (
        <div />
      )}
    </Box>
  );
}
