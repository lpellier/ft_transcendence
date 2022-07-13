import { useState, createContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import SearchAppBar from "components/AppBar/AppBar";
import { User } from "interfaces";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, Navigate, useOutlet, Link } from "react-router-dom";
import FirstLoginPrompt from "./components/Prompt";
import { useAuth } from "routes/routes";
import { socket } from "index";
import { ToastContainer } from "react-toastify";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const ImageIdContext = createContext({
  imageId: 1,
  setImageId: (n: number) => {},
});

export default function App(props: {
  users: User[];
  setOtherUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  statusMap: Map<number, string>;
  setStatusMap: React.Dispatch<React.SetStateAction<Map<number, string>>>;
}) {
  const [imageId, setImageId] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [invite, setInvite] = useState<inviteDto>();

  interface inviteDto {
    userId: number,
    inviterId: number,
    inviteeId: number,
}

  let auth = useAuth();
  
  const outlet = useOutlet();

  useEffect(() => {
    const handler = (data: any) => { 
        setOpen(true)  
        setInvite(data)
    }
    socket.on('invite for game', handler);
    return () => {
        socket.off('invite for game', handler);
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
    <ImageIdContext.Provider value={{ imageId, setImageId }}>
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
              setOtherUser={props.setOtherUser}
              statusMap={props.statusMap}
              setStatusMap={props.setStatusMap}
            />
            {outlet ? <Outlet /> : <Navigate replace to="/game" />}
          </div>
        ) : (
          <div />
        )}
      </Stack>
    </ImageIdContext.Provider>
  );
}
