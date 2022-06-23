import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import ToggleButton from '@mui/material/ToggleButton';
import Dialog from '@mui/material/Dialog';
import bcrypt from 'bcryptjs';

import { toastThatError } from './RoomUserMod';

import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from 'index'
import RoomUserPopper from './RoomUserMod'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'



interface CreateRoomDto {
	name: string;
	userId: number;
	visibility: string;
	password: string;
}

export interface UserRoomDto {
    userId: number;
    roomId: number;
};


function PasswordInput(props: {openPassword: boolean, setOpenPassword: React.Dispatch<React.SetStateAction<boolean>>, room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {
	
	const handleClose = () => {
		props.setOpenPassword(false);
	};

	function handlePasswordSubmit(e:any) {
		const submittedPassword = e.target[0].value;
		e.preventDefault();
		bcrypt.compare(submittedPassword, props.room.password, function(err, result) {
			if (result)
			{
				props.setCurrentRoom(props.room);
				socket.emit('get admins', props.room.id);
				handleClose()
			}
			else
				toastThatError("wrong password");
		})
	}


	return(
		<Dialog open={props.openPassword}  onClose={handleClose}>
			<Box component="form" onSubmit={handlePasswordSubmit}>
			<TextField
				autoFocus
				margin="dense"
				id="password"
				label="password"
				type="password"
				fullWidth
				variant="standard"
				/>
			</Box>
		</Dialog>
	)
}

function RoomList(props: {rooms: Room[], currentRoom: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, users: User[], user: User, visibility: string, roomAdmins:User[]}) {
	let [openPassword, setOpenPassword] = useState<boolean>(false);

	function handleRoomClick(room: Room) {
		if (room.password === "")
		{
			props.setCurrentRoom(room)
			socket.emit('get admins', room.id);
		}
		else
			setOpenPassword(true);
	}

	return (
		<List>
				{props.rooms.map(item => (
					<div key={item.id}>
						{item.visibility === props.visibility ?
							<div>
								{ item.id !== props.currentRoom.id ?
								<ListItem className="MenuItem" button onClick={() => handleRoomClick(item)}>
									<ListItemText primary={item.name}/>
									<PasswordInput openPassword={openPassword} setOpenPassword={setOpenPassword} room={item} setCurrentRoom={props.setCurrentRoom}/>
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

function Channels(props : {user: User, users: User[], currentRoom: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, setCanWrite: React.Dispatch<React.SetStateAction<boolean>>, roomAdmins:User[]}) {

	let [addRoomClicked, setAddRoomClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([]);
	let [publicRooms, setPublicRooms] = useState<Room[]>([]);
	let [showPassword, setShowPassword] = useState<number>(0);
	
	async function handleRoomSubmit(e:any) {
		function addtoDb(password:string, room_name:string, visibility:string) {
			const createRoomDto: CreateRoomDto = {name: room_name, userId: props.user.id, visibility: visibility, password: password}
			if (room_name && visibility)
				socket.emit('create room', createRoomDto);
		}

		e.preventDefault();
		const room_name: string = e.target[0].value;
		const visibility: string = e.target[1].value;
		const password: string = e.target[3].value;
		if (password !== "")
		{
			bcrypt.hash(password, 10, function(err, hash) {
				addtoDb(hash, room_name, visibility);
			});
		}
		else
			addtoDb(password, room_name, visibility);

		e.target[0].value = '';
		setAddRoomClicked(0);
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

	function handlePasswordSelect() {
		if (showPassword)
			setShowPassword(0);
		else
			setShowPassword(1);
	}

	return ( 
		<Stack className='channels' justifyContent='space-between'>
				<div>
					<RoomList rooms = {publicRooms} currentRoom = {props.currentRoom} setCurrentRoom = {props.setCurrentRoom} users = {props.users} user = {props.user} visibility = "public" roomAdmins={props.roomAdmins} />
					<RoomList rooms = {rooms} currentRoom = {props.currentRoom} setCurrentRoom = {props.setCurrentRoom} users = {props.users} user = {props.user} visibility="private" roomAdmins={props.roomAdmins} />
				</div>
			<div>
				<Box>
					{addRoomClicked ?
							<Stack>
								<Stack component="form" onSubmit={handleRoomSubmit} spacing={1}>
									<TextField id="roomName" label="Room name" variant="standard" />
									<FormControl fullWidth>
										<InputLabel id="visibility-label">visibility</InputLabel>
										<NativeSelect
											defaultValue="private"
											inputProps={{
												name: 'visibility',
												id: 'uncontrolled-native',
											}}
											>
											<option value="private">private</option>
											<option value="public">public</option>
										</NativeSelect>
									</FormControl>
									<ToggleButton value={showPassword} onChange={handlePasswordSelect}>
										{showPassword?
											<KeyOffIcon/>
											:
											<KeyIcon/>
										}
									</ToggleButton>
									{showPassword?
										<TextField id="password" label="password" type="text" />
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