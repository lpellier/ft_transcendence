import { useState, createContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import SearchAppBar from "components/AppBar/AppBar";
import { User } from "interfaces";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, Navigate, useOutlet, Link, useNavigate } from "react-router-dom";
import { socket } from "index";
import { ToastContainer } from "react-toastify";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "components/AuthProvider";
import FirstLoginPrompt from "./Prompt";

export default function Layout(props: {
  users: User[];
  statusMap: Map<number, string>;
  setStatusMap: React.Dispatch<React.SetStateAction<Map<number, string>>>;
}) {
  const [open, setOpen] = useState(false);
  const [invite, setInvite] = useState<inviteDto>();

  interface inviteDto {
    userId: number,
    inviterId: number,
    inviteeId: number,
}

  let auth = useAuth();
  let navigate = useNavigate();
  const outlet = useOutlet();

  useEffect(() => {
    socket.on('accepted game', () => navigate("/game"));
    socket.on('invite for game', (data: any) => { 
      setOpen(true)  
      setInvite(data)})
    return () => {
        socket.off('accepted game');
        socket.off('invite for game');
    }
  }, [])
  
  useEffect(() => {
    const init = () => {
        if (auth.user) {
            socket.emit('new user', auth.user.id);
        }
    }
    if (socket.connected)
        init();
    else
        socket.on('connect', init)
}, [auth.user])

const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};    

function acceptGame() {
  socket.emit('accepted game', invite, auth.user?.id)
  setOpen(false);
}

const action = (
  <div>
      <Button color="secondary" size="small" onClick={acceptGame} >
          <Link to='/game' style={{ textDecoration: 'none' }}>
              Accept
          </Link>
      </Button>
      <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
      >
          <CloseIcon fontSize="small" />
      </IconButton>
  </div>
);

  return (
    <div>
      <ToastContainer />
      <Snackbar
          open={open}
          onClose={handleClose}
          message={`You have been invited to play a game with ${props.users.find(user=> user?.id === invite?.userId)?.username}`}
          action={action}
      />

      <Stack>
        {auth.user.username === null ? (
          <FirstLoginPrompt user={auth.user} />
        ) : (
          <div />
        )}
        {auth.user.username !== null ? (
          <div>
            <SearchAppBar
              user={auth.user}
              users={props.users}
              statusMap={props.statusMap}
              setStatusMap={props.setStatusMap}
            />
            {outlet ? <Outlet /> : <Navigate replace to="/game" />}
          </div>
        ) : (
          <div />
        )}
      </Stack>
    </div>
  );
}
