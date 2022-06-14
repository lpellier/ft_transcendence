import ReactDOM from 'react-dom';
import AllRoutes from './routes/routes';
import Cookies from "universal-cookie";
import './styles/body.css';


const cookies = new Cookies();
const token = "Bearer " + cookies.get("jwt");

const tabletSize = 768;
const phoneSize = 530;

const Root = document.getElementById('root');

ReactDOM.render(
    <AllRoutes />,
    Root
);

export {tabletSize, phoneSize, token}