import { createRoot } from "react-dom/client";
import AllRoutes from "./routes/routes";
import "./styles/body.css";
import io from "socket.io-client";
import { BrowserRouter } from "react-router-dom";

const tabletSize = 768;
const phoneSize = 530;

const root = createRoot(document.getElementById("root")!);

const SERVER = "http://127.0.0.1:3001";
export const socket = io(SERVER, {
  withCredentials: true,
});

root.render(
  <BrowserRouter>
    <AllRoutes />
  </BrowserRouter>
);

export { tabletSize, phoneSize };