import { createRoot } from "react-dom/client";
import io from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = createRoot(document.getElementById("root")!);

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
