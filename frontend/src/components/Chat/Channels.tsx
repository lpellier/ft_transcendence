import '../../styles/Chat/Channels.css';
// import io  from "socket.io-client";
import Stack from '@mui/material/Stack'



import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'
import {token} from 'index'
import axios from 'axios'

interface AddUserDto {
    userId: number;
    roomId: number;
};

function Channels(props : {user: User, current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {

	let [clicked, setClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([]);

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
			socket.emit('create room', room);
		e.target[0].value = '';
	}

	useEffect(() => {
		socket.on('create room', (room_id: number) => {
			const addUser: AddUserDto = {userId: props.user.id, roomId: room_id}
			socket.emit('add user to room', addUser);
			socket.emit('get rooms', props.user.id)
		})
	}, [props.user.id])


	useEffect(() => {
		socket.on('get rooms', (rooms_list: Room[]) => {
			console.log("getting rooms, rooms = ", rooms_list);
			setRooms(rooms_list);
			rooms_list.forEach(room => {
				socket.emit('join room', room.id.toString());
			})
		})
	}, [])

	return ( 
		<Stack className='channels' justifyContent='space-between'>
			<div className="dropdown">
				<button className="dropbtn">{props.current_room.name}</button>
				<ul >
					{rooms.map(item => (
						<div key={item.id}>
							{item.name !== props.current_room.name ?
								<button className="dropdown-content"  onClick={() => handleListClick(item)}>
									{item.name}
								</button>
								:
								<div/>
							}
						</div>
					))}
				</ul>
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