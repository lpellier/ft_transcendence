import ReactDOM from 'react-dom';
import AllRoutes from './routes/routes';
import './styles/body.css'

const tabletSize = 768;
const phoneSize = 425;

const Root = document.getElementById('root');

ReactDOM.render(
    <AllRoutes />,
    Root
);

export {tabletSize, phoneSize}