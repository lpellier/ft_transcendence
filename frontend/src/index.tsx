import React from 'react'
import {render} from 'react-dom'
import All_routes from './routes/routes.tsx';

import './styles.css'

const rootElement = document.getElementById("root");

render(<All_routes />, rootElement);