import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

import SearchAppBar from 'components/AppBar/AppBar'
import FriendBand from 'components/FriendBand/FriendBand'
import PlayerInfoBand from 'components/PlayerInfoBand/PlayerInfoBand'
import StatsBoards from 'components/StatsBoards/StatsBoards'
import axios from 'axios';

import { phoneSize, token } from 'index'
import {StatsPartStyle, AllHomeStyle} from '../../styles/tsxStyles/Home'

import {User} from 'interfaces'

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
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth);
		 window.addEventListener("resize", handleResizeWindow);
		 return () => {
		   window.removeEventListener("resize", handleResizeWindow);
		 };
	}, [])

	useEffect(() => {
		axios.get('http://127.0.0.1:3001/users/me',
		{headers: {
			'Authorization': token,
		}
	})
		.then(res => {
			console.log("Get request success")
			const test_data = res.data;
			setUser(test_data)
			console.log(user);
		})
		.catch(function (err) {
			console.log("Homepage Get request failed : ", err)
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