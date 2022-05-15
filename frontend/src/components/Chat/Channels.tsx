import '../../styles/Chat/Channels.css';
// import io  from "socket.io-client";
import Stack from '@mui/material/Stack'



import {useState} from 'react'
import {Room} from 'interfaces'
import {socket} from './Chat'

function Channels(props : {current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {

	let [clicked, setClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([{id: 0, name: "global chat"}]);

	const addRoom = (newRoom: string) => setRooms(state => [...state, {id: state.length, name: newRoom}])

	function handleClick(e: any) {
		e.preventDefault();
		setClicked(1);
	}

	function handleListClick(clicked_room: Room) {

		props.setCurrentRoom(clicked_room);

		socket.emit('join room', clicked_room.id.toString());
	}

	function handleSubmit(e:any) {
		e.preventDefault();
		const room = e.target[0].value;
		if (room)
			addRoom(room);
		setClicked(0);
	}

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