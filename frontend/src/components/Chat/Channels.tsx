import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';


import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'
import RoomUserMod from './RoomUserMod'


interface CreateRoomDto {
	name: string;
	userId: number;
}

function Channels(props : {user: User, users: User[], current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {

	let [addRoomClicked, setAddRoomClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([]);

	function handleRoomSubmit(e:any) {
		e.preventDefault();
		const room_name: string = e.target[0].value;
		console.log(e.target.value);
		const createRoomDto: CreateRoomDto = {name: room_name, userId: props.user.id}
		if (room_name)
			socket.emit('create room', createRoomDto);
		e.target[0].value = '';
		setAddRoomClicked(0);
	}

	function handleRoomClick(room: Room) {
		props.setCurrentRoom(room)
	}

	useEffect(() => {
		socket.on('create room', () => {
			socket.emit('get rooms', props.user.id)
		})
	})


	useEffect(() => {
		socket.on('get rooms', (rooms_list: Room[]) => {
			setRooms(rooms_list);
			rooms_list.forEach(room => {
				socket.emit('join room', room.id.toString());
			})
		})
	})

	return ( 
		<Stack className='channels' justifyContent='space-between'>
				<Stack>
					<ul className='channel-list'>
						{rooms.map(item => (
							<div key={item.id}>
								{item.id !== props.current_room.id ?
									<button className='channel-list-content' onClick={() => handleRoomClick(item)}>
										{item.name}
									</button>
									:
									<Stack>
										<button className='current-channel'>{props.current_room.name} </button>
										{props.user.id === item.ownerId ?
											<RoomUserMod currentUser={props.user} users={props.users} room={item}/>
										:
											<div/>
										}
									</Stack>
								}
							</div>
						))}
					</ul>
				</Stack>
			<div>
				<button onClick={() => setAddRoomClicked(1)}>Create Room</button>
				<div>
					{addRoomClicked ?
							<Stack>
								<form onSubmit={handleRoomSubmit}>
									<input type="text" placeholder='Room name' className="form"/>
									<fieldset>
										<legend>Select channel type:</legend>
										<input type="radio" id="private">private</input>
										<input type="radio" id="public">public</input>
									</fieldset>
									<button>create</button>
								</form>
								<button title="cancel" onClick={() => setAddRoomClicked(0)}>cancel</button>
							</Stack>
						:
						<div/>
					}
				</div>
			</div>
		</Stack>
	);
}

export default Channels;