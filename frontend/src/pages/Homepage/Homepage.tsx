import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import axios from 'axios'
import {token} from 'index'

import SearchAppBar from 'components/AppBar/AppBar'
import FriendBand from 'components/FriendBand/FriendBand'
import PlayerInfoBand from 'components/PlayerInfoBand/PlayerInfoBand'
import StatsBoards from 'components/StatsBoards/StatsBoards'

import { phoneSize } from 'index'
import {StatsPartStyle, AllHomeStyle} from '../../styles/tsxStyles/Home'

function StatsPart() {
	return(
		<Stack spacing={1} sx={StatsPartStyle}>
			<PlayerInfoBand level={5}/>
			<StatsBoards />
		</Stack>
	);
}


export default function Homepage() {

	const [width, setWidth] = useState(window.innerWidth);
	
	useEffect(() => {
		axios.put('http://127.0.0.1:3001/users/me',
			{
				'id': 55950,
				'username': 'changeuser234324',
				'avatar': 'https://cdn.intra.42.fr/users/ablanar.jpg'
			},
			{
			headers: {
				'Authorization': token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			console.log("Get request success")
			const test_data = res.data;
			// socket.emit('new user', test_data.username);
			// setUser(test_data);
		})
		.catch(function (err) {
			console.log("Get request failed : ", err)
		});
	}, [])

	if (width <= phoneSize) {
	  return (
	    <Stack spacing={2}>
        	<SearchAppBar image={''}/>
			<Container>
				<Stack direction="row" spacing={1} sx={AllHomeStyle}>
					<StatsPart />
				</Stack>
			</Container>
		</Stack>
	  );
	}
    return (
		<Stack spacing={2}>
        	<SearchAppBar image={''}/>
			<Container>
				<Stack direction="row" spacing={1} sx={AllHomeStyle}>
					<FriendBand />
					<StatsPart />
				</Stack>
			</Container>
		</Stack>
    );
}