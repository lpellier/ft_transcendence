import React from 'react';
import ReactDOM from 'react-dom';
import All_routes from './routes/routes.tsx';
import './styles/body.css'

const Root = document.getElementById('root');

ReactDOM.render(
    <All_routes />, 
    Root
);
