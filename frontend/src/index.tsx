import { createRoot } from "react-dom/client";
import "./styles/body.css";
import io from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

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
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

export { tabletSize, phoneSize, achievements };
