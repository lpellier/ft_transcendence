import ReactDOM from 'react-dom';
import AllRoutes from './routes/routes';
import './styles/body.css';
import io  from "socket.io-client";

const tabletSize = 768;
const phoneSize = 530;

const Root = document.getElementById('root');

const SERVER = "http://127.0.0.1:3001";
export const socket = io(SERVER, {
	withCredentials:true,
});


ReactDOM.render(
    <AllRoutes />,
    Root
);

export {tabletSize, phoneSize}