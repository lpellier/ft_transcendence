import '../../styles/Chat/Channels.css';
// import io  from "socket.io-client";


import {useState} from 'react'
import {Room} from 'interfaces'
import {socket} from './Chat'

function Channels(props : {current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {

	let [clicked, setClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([{id: props.current_room.id, name: props.current_room.name}]);

	const addRoom = (newRoom: string) => setRooms(state => [...state, {id: state.length, name: newRoom}])

	function handleClick(e: any) {
		e.preventDefault();
		setClicked(1);
	}

	function handleListClick(clicked_room: Room) {
		console.log(clicked_room);

		props.setCurrentRoom(clicked_room);
		socket.emit('join room', clicked_room.id.toString());
	}

	function handleSubmit(e:any) {
		e.preventDefault();
		const room = e.target[0].value;
		// console.log(e);
		// console.log("room = ", room);
		if (room)
			addRoom(room);
		setClicked(0);
	}

	return (
		<div className='channels'>
			{/* <div className='title-channels'>Channels</div> */}
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
			<div className="dropdown">
				<button className="dropbtn">{props.current_room.name}</button>
				<div className="dropdown-content">
					{rooms.map(room => (
						<button key={room.id} onClick={() => handleListClick(room)}>
							{room.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default Channels;