import '../../styles/Chat/Channels.css';

import {useState} from 'react'

function Channels() {
	interface Room {
		id: number;
		name: string;
	}

	let [clicked, setClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([]);

	const addRoom = (newRoom: string) => setRooms(state => [...state, {id: state.length, name: newRoom}])

	function handleClick(e: any) {
		e.preventDefault();
		setClicked(1);
	}

	function handleSubmit(e:any) {
		e.preventDefault();
		const room = e.target[0].value;
		console.log(e);
		console.log("room = ",room);
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
				<button className="dropbtn">Current Room</button>
				<div className="dropdown-content">
					{rooms.map(room => (
						<a key={room.id}>
							{room.name}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}

export default Channels;