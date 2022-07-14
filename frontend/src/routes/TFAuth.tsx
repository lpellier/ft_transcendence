import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toastThatError } from "App";

const BoxStyle = {
  width: "30vw",
  height: "20vh",
  backgroundColor: "rgb(130, 150, 240, 0.96)",
  border: "3px solid black",

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

function PinField(props: {
  value: string;
  setPininput: any;
  setRedirect: any;
}) {
  const [hasSubmitted, setHastSubmitted] = useState<boolean>(false);

  const { setPininput, setRedirect } = props;

  useEffect(() => {
    if (hasSubmitted === true) {
      axios
        .post(
          process.env.REACT_APP_BACK_URL + "/auth/google-authenticator",
          props.value,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("Pin Post request success :");
          setRedirect(res.data);
        })
        .catch(function (err) {
          console.log("Pin Post request failed :", err);
          toastThatError("Ho no! That Pin is not valid! :/");
        });
      setHastSubmitted(false);
    }
  }, [hasSubmitted, setRedirect, props.value]);

  function handleSubmit(e: any) {
    e.preventDefault();
    setPininput({ value: e.target[0].value });
    e.target[0].value = "";
    setHastSubmitted(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField type="text" label={"Here !"} variant="standard" />
      </form>
    </div>
  );
}

export default function TFAuth() {
  const [pinInput, setPininput] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  return (
    <Box sx={BoxStyle}>
      <Stack>
        <h1 style={TitleStyle}>Hey, insert your Pin !</h1>
        <PinField
          value={pinInput}
          setPininput={setPininput}
          setRedirect={setRedirect}
        />
        {redirect === true ? <Navigate to="/game" /> : <div />}
      </Stack>
    </Box>
  );
}
