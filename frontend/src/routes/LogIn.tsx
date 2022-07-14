import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoginIcon from "@mui/icons-material/Login";
import WebhookIcon from "@mui/icons-material/Webhook";
import {
  Title,
  ButtonStyle,
  LinkStyle,
  IconStyle,
} from "../styles/tsxStyles/LogIn";

const AuthAPI = process.env.REACT_APP_BACK_URL + "/auth";
const MockAuthAPI = process.env.REACT_APP_BACK_URL + "/auth/mock";

function LogInButton() {
  return (
    <Button
      sx={ButtonStyle}
      variant="contained"
      startIcon={<LoginIcon />}
      size="large"
      color="primary"
    >
      Log in
    </Button>
  );
}

function MockLogInButton() {
  return (
    <Button
      sx={ButtonStyle}
      variant="contained"
      startIcon={<LoginIcon />}
      size="large"
      color="primary"
    >
      Mock Login
    </Button>
  );
}

export default function LogIn() {
  return (
    <Stack spacing={10} sx={Title}>
      <div>
        GnaGna
        <WebhookIcon sx={IconStyle} />
        Pong
      </div>
      <nav>
        <a href={AuthAPI} style={LinkStyle}>
          <LogInButton />
        </a>
      </nav>
      <nav>
        <a href={MockAuthAPI + "/1"} style={LinkStyle}>
          <MockLogInButton />
        </a>
        <a href={MockAuthAPI + "/2"} style={LinkStyle}>
          <MockLogInButton />
        </a>
      </nav>
    </Stack>
  );
}
