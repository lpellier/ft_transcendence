import { useState, createContext } from "react";
import Stack from "@mui/material/Stack";
import SearchAppBar from "components/AppBar/AppBar";
import { User } from "interfaces";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, Navigate, useOutlet } from "react-router-dom";
import FirstLoginPrompt from "./components/Prompt";

export const ImageIdContext = createContext({
  imageId: 1,
  setImageId: (n: number) => {},
});

export default function App(props: {
  user: User | undefined;
  users: User[];
  setOtherUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  statusMap: Map<number, string>;
  setStatusMap: React.Dispatch<React.SetStateAction<Map<number, string>>>;
}) {
  const [imageId, setImageId] = useState<number>(1);

  const outlet = useOutlet();

  return (
    <ImageIdContext.Provider value={{ imageId, setImageId }}>
      <Stack>
        {props.user && props.user.username === null ? (
          <FirstLoginPrompt user={props.user} />
        ) : (
          <div />
        )}
        {props.user && props.user.username !== null ? (
          <div>
            <SearchAppBar
              user={props.user}
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
