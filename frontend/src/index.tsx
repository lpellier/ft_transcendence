import { createRoot } from "react-dom/client";
import AllRoutes from "./routes/routes";
import "./styles/body.css";
import io from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const tabletSize = 768;
const phoneSize = 530;

const root = createRoot(document.getElementById("root")!);

enum achievements {
  ONESTAR,
  THREESTARS,
  QUIT,
  CHANGEAVATAR,
}

const SERVER = process.env.REACT_APP_BACK_URL || "";
export const socket = io(SERVER, {
  withCredentials: true,
});

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  // </React.StrictMode>
);

export { tabletSize, phoneSize, achievements };
