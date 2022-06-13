import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'
import RoomUserPopper from './RoomUserMod'



interface CreateRoomDto {
	name: string;
	userId: number;
	visibility: string;
}

function Channels(props : {user: User, users: User[], currentRoom: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, setCanWrite: React.Dispatch<React.SetStateAction<boolean>>}) {

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
		// socket.emit('get users', room.id);
		socket.emit('get admins', room.id);
		if (rooms.find(item => item.id === room.id))
			props.setCanWrite(true);
		else
			props.setCanWrite(false);
	}

	useEffect(() => {
		const handler = () => {
			socket.emit('get rooms', props.user.id)
			socket.emit('get public rooms');
		};
		socket.on('create room', handler);
		return ( () => {
			socket.off('create room', handler);
		})
	})

	useEffect(() => {
		const handler = (rooms_list: Room[]) => {
			setRooms(rooms_list);
			rooms_list.forEach(room => {
				socket.emit('join room', room.id.toString());
			});
		};
		socket.on('get rooms', handler);
		return (() => {socket.off('get rooms', handler);})
	}, [])

	useEffect(() => {
		const handler = (rooms_list: Room[]) => {
			setPublicRooms(rooms_list);
			rooms_list.forEach(room => {
				socket.emit('join room', room.id.toString());
			});
		};
		socket.on('get public rooms', handler);
		return(() => {socket.off('get public rooms', handler)})
	}, [])


	function RoomList(props: {rooms: Room[], currentRoom: Room, users: User[], user: User, visibility: string}) {
		return (
			<List>
					{props.rooms.map(item => (
						<div key={item.id}>
							{item.visibility === props.visibility ?
								<div>
									{ item.id !== props.currentRoom.id ?
									<ListItem button onClick={() => handleRoomClick(item)}>
										<ListItemText primary={item.name}/>
									</ListItem>
									:
									<Stack direction="row">
										<ListItem button >
											<ListItemText primary={item.name}  />
										</ListItem>
										<RoomUserPopper currentUser={props.user} users={props.users} room={props.currentRoom}/>
									</Stack>
									}
									<Divider/>
								</div>
								:
								<div/>
							}
						</div>
					))}
			</List>
		)
	}




	return ( 
		<Stack className='channels' justifyContent='space-between'>
				<div>
					<RoomList rooms = {publicRooms} currentRoom = {props.currentRoom} users = {props.users} user = {props.user} visibility = "public"/>
					<RoomList rooms = {rooms} currentRoom = {props.currentRoom} users = {props.users} user = {props.user} visibility="private"/>
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