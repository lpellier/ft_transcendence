import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';


import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'
import RoomUserMod from './RoomUserMod'


interface CreateRoomDto {
	name: string;
	userId: number;
	visibility: string;
}

function Channels(props : {user: User, users: User[], current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {

	let [addRoomClicked, setAddRoomClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([]);
	let [publicRooms, setPublicRooms] = useState<Room[]>([]);


	function handleRoomSubmit(e:any) {
		e.preventDefault();

		const room_name: string = e.target[0].value;
		const visibility: string = e.target[1].value;


		const createRoomDto: CreateRoomDto = {name: room_name, userId: props.user.id, visibility: visibility}
		if (room_name && visibility)
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
			socket.emit('get public rooms');
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
	useEffect(() => {
		socket.on('get public rooms', (rooms_list: Room[]) => {
			setPublicRooms(rooms_list);
			rooms_list.forEach(room => {
				socket.emit('join room', room.id.toString());
			})
		})
	})



	function RoomList(props: {rooms: Room[], current_room: Room, users: User[], user: User, visibility: string}) {
		return (
			<Stack>
				<ul className='channel-list'>
					{props.rooms.map(item => (
						<div key={item.id}>
							{item.visibility === props.visibility ?
								<div>
								{ item.id !== props.current_room.id ?
									<button className='channel-list-content' onClick={() => handleRoomClick(item)}>
										{item.name}
									</button>
									
									:
									<Stack>
										<button className='current-channel'>{props.current_room.name} </button>
										{(props.user.id === item.ownerId) ? 
											<RoomUserMod currentUser={props.user} users={props.users} room={item}/>
										:
											<div/>
										}
									</Stack>
								}
								</div>
								:
								<div/>
							}
						</div>
					))}
				</ul>
			</Stack>
		)
	}




	return ( 
		<Stack className='channels' justifyContent='space-between'>
				<div>
					Public rooms
					<RoomList rooms = {publicRooms} current_room = {props.current_room} users = {props.users} user = {props.user} visibility = "public"/>
					Private rooms
					<RoomList rooms = {rooms} current_room = {props.current_room} users = {props.users} user = {props.user} visibility="private"/>
				</div>
			<div>
				<div>
					{addRoomClicked ?
							<Stack>
								<form onSubmit={handleRoomSubmit} className="add-channel-form">
										<input
											name="roomName"
											type="text" 
											placeholder='Room name'
											className="form"/>
											<select>
												<option value="private">private</option>
												<option value="public">public</option>
											</select>
									<input type="submit" value="create"/>
								</form>
								<button title="cancel" onClick={() => setAddRoomClicked(0)}>cancel</button>
							</Stack>
						:
						<button onClick={() => setAddRoomClicked(1)}>Create Room</button>
					}
				</div>
			</div>
		</Stack>
	);
}

export default Channels;