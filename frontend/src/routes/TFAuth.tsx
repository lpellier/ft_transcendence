import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toastThatError } from "App";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const BoxStyle = {
  backgroundColor: "rgb(130, 150, 240, 0.96)",
  border: "3px solid black",
  padding: "50px",

  display: "flex",
  justifyContent: "center",
  VerticalAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const TitleStyle = {
  color: "rgb(255, 150, 55)",
  textShadow: "1px 1px 2px black",
};

export default function TFAuth() {
  const [pinInput, setPininput] = useState<string>("");
  let navigate = useNavigate();

  function handleSubmit() {
    axios
      .post(
        process.env.REACT_APP_BACK_URL + "/auth/google-authenticator",
        {
          value: pinInput,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Pin Post request success :");
        if (res.data === true) {
          navigate("/game");
        } else {
          toastThatError("Ho no! That Pin is not valid! :/");
        }
      })
      .catch(function (err) {
        console.log("Pin Post request failed :", err);
        toastThatError("Ho no! That Pin is not valid! :/");
      });
  }

  return (
    <Box sx={BoxStyle}>
      <Stack spacing={2}>
        <Typography variant="h4" style={TitleStyle}>
          Hey, insert your Pin!
        </Typography>
        <TextField
          onInput={(e: any) => setPininput(e.target.value)}
          inputProps={{ maxLength: 6 }}
          type="text"
          variant="outlined"
        />
        <Button
          disabled={/^[\d]{6}$/.test(pinInput) === false}
          variant="contained"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}
