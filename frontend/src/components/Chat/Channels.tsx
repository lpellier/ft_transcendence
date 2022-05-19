import '../../styles/Chat/Channels.css';
// import io  from "socket.io-client";
import Stack from '@mui/material/Stack'



import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'
import {token} from 'index'
import axios from 'axios'

function Channels(props : {user: User, current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {

	let [clicked, setClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([{id: 0, name: "global chat"}]);
	let [roomChange, setRoomChange] = useState<number>(0);
	let [allUsers, setAllUsers] = useState<User[]>();
	// const addRoom = (newRoom: Room) => setRooms(state => [...state, {id: state.length, name: newRoom}])

	function handleClick(e: any) {
		e.preventDefault();
		setClicked(1);
	}

	function handleListClick(clicked_room: Room) {

		props.setCurrentRoom(clicked_room);
	}

	function handleSubmit(e:any) {
		e.preventDefault();
		const room_name: string = e.target[0].value;
		const room: {name: string} = {name: room_name}
		if (room_name)
		{
			socket.emit('create room', room);
			socket.emit('add user to room', props.user.id);
		}
	}


	useEffect(() => {
		socket.on('create room', (room_id: number) => {
			rooms.map(room => (
				socket.emit('join room', room.id)
			))
			setRoomChange(room_id);
		})
	})

	useEffect(() => {
		axios.get('http://127.0.0.1:3001/rooms',{
			headers: {
				'Authorization': token,
			}
			})
			.then(res => {
				console.log("Get request success")
				const test_data = res.data;
				setRooms(test_data);
			})
			.catch(function (err) {
				console.log("Get request failed : ", err)
		});
	}, [roomChange])

	return (
		<Stack className='channels' justifyContent='space-between'>
			<div className="dropdown">
				<button className="dropbtn">{props.current_room.name}</button>
				<div className="dropdown-content">
					{rooms.map(room => (
						<div key={room.id}>
							{room.name !== props.current_room.name ?
								<button className="dropdown-content"  onClick={() => handleListClick(room)}>
									{room.name}
								</button>
								:
								<div/>
							}
						</div>
					))}
				</div>
			</div>
			<div>
				<form onClick={handleClick}>
					<button>Create Room</button>
				</form>
				<div>
					{clicked ?
						<form onSubmit={handleSubmit}>
							<input type="text" placeholder='Room name'/>
						</form>
						:
						<div/>
					}
				</div>
			</div>
		</Stack>
	);
}

export default Channels;