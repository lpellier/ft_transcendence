import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import KeyIcon from '@mui/icons-material/Key';
import ToggleButton from '@mui/material/ToggleButton';

import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'
import RoomUserPopper from './RoomUserMod'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'



interface CreateRoomDto {
	name: string;
	userId: number;
	visibility: string;
}

export interface UserRoomDto {
    userId: number;
    roomId: number;
};


function Channels(props : {user: User, users: User[], currentRoom: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, setCanWrite: React.Dispatch<React.SetStateAction<boolean>>, roomAdmins:User[]}) {

	let [addRoomClicked, setAddRoomClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([]);
	let [publicRooms, setPublicRooms] = useState<Room[]>([]);
	let [showPassword, setShowPassword] = useState<number>(0);


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
		socket.emit('get admins', room.id);
	}
	useEffect(() => {
		if (rooms.find(item => item.id === props.currentRoom.id))
			props.setCanWrite(true);
		else
			props.setCanWrite(false);
	}, [props, rooms])

	useEffect(() => {
		const handler = () => {
				socket.emit('get rooms', props.user.id);
				socket.emit('get public rooms');
		};
		socket.on('add user to room', handler);
		return (() => {
			socket.off('add user to room', handler);
		})
	})

	useEffect(() => {
		const handler = (removeUserDto: UserRoomDto) => {
			if(removeUserDto.userId === props.user.id)
			{
				socket.emit('leave room', removeUserDto.roomId);
				socket.emit('get rooms', props.user.id)
				socket.emit('get public rooms');
			};
		};
		socket.on('remove user from room', handler);
		return (() => {
			socket.off('remove user from room', handler);
		})
	})

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


	function RoomList(props: {rooms: Room[], currentRoom: Room, users: User[], user: User, visibility: string, roomAdmins:User[]}) {
		return (
			<List>
					{props.rooms.map(item => (
						<div key={item.id}>
							{item.visibility === props.visibility ?
								<div>
									{ item.id !== props.currentRoom.id ?
									<ListItem className="MenuItem" button onClick={() => handleRoomClick(item)}>
										<ListItemText primary={item.name}/>
									</ListItem>
									:
									<Stack direction="row">
										<ListItem button selected className="MenuItem">
											<ListItemText primary={item.name}  />
										</ListItem>
										<RoomUserPopper currentUser={props.user} users={props.users} room={props.currentRoom} roomAdmins={props.roomAdmins}/>
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

	function handlePasswordSelect() {
		if (showPassword)
			setShowPassword(0);
		else
			setShowPassword(1);
	}

	return ( 
		<Stack className='channels' justifyContent='space-between'>
				<div>
					<RoomList rooms = {publicRooms} currentRoom = {props.currentRoom} users = {props.users} user = {props.user} visibility = "public" roomAdmins={props.roomAdmins}/>
					<RoomList rooms = {rooms} currentRoom = {props.currentRoom} users = {props.users} user = {props.user} visibility="private" roomAdmins={props.roomAdmins}/>
				</div>
			<div>
				<Box>
					{addRoomClicked ?
							<Stack>
								<Stack component="form" onSubmit={handleRoomSubmit} spacing={1}>
									<TextField id="roomName" label="Room name" variant="standard" />
									<FormControl fullWidth>
										<InputLabel id="visibility-label">visibility</InputLabel>
										<Select
										labelId="visibility-label"
										id="visibility"
										label="visibility"
										>
											<MenuItem value="public">public</MenuItem>
											<MenuItem value="private">private</MenuItem>
										</Select>
									</FormControl>
									<ToggleButton value={showPassword} onChange={handlePasswordSelect}>
										<KeyIcon/>
									</ToggleButton>
									{showPassword?
										<TextField id="password" label="password" type="password" />
										:
										<div/>
									}

								<Button variant="contained" color="success" type="submit">
									Create
								</Button>
								</Stack>
								<Button variant="contained" color="error" onClick={() => setAddRoomClicked(0)}>
									Cancel
								</Button>
							</Stack>
						:
						<button onClick={() => setAddRoomClicked(1)}>Create Room</button>
					}
				</Box>
			</div>
		</Stack>
	);
}

export default Channels;