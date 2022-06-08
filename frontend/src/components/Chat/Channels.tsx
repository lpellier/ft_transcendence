import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';


import {useState, useEffect, useRef} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'
import RoomUserMod from './RoomUserMod'
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';



interface CreateRoomDto {
	name: string;
	userId: number;
	visibility: string;
}

function Channels(props : {user: User, users: User[], current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>, setCanWrite: React.Dispatch<React.SetStateAction<boolean>>}) {

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
		if (rooms.find(item => item.id === room.id))
			props.setCanWrite(true);
		else
			props.setCanWrite(false);
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

	function SimplePopper(props : {user: User, users: User[], room: Room}) {
		const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	  
		const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		  setAnchorEl(anchorEl ? null : event.currentTarget);
		};
	  
		const open = Boolean(anchorEl);
		const id = open ? 'simple-popper' : undefined;
	  
		return (
		  <div>
			<button aria-describedby={id} type="button" onClick={handleClick}>
			  <SettingsIcon/>
			</button>
			<Popper id={id} open={open} anchorEl={anchorEl}>
			  <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
				<RoomUserMod currentUser={props.user} users={props.users} room={props.room}/>
			  </Box>
			</Popper>
		  </div>
		);
	  }

	function RoomList(props: {rooms: Room[], current_room: Room, users: User[], user: User, visibility: string}) {
		return (
			<List>
					{props.rooms.map(item => (
						<div key={item.id}>
							{item.visibility === props.visibility ?
								<div>
									{ item.id !== props.current_room.id ?
									<ListItem button onClick={() => handleRoomClick(item)}>
										<ListItemText primary={item.name}/>
									</ListItem>
									:
									<Stack direction="row">
										<ListItem button>
											<ListItemText primary={item.name}/>
										</ListItem>
										<div>
											{(props.user.id === item.ownerId) ?
												<SimplePopper user={props.user} users={props.users} room={item}/>
											:
												<div/>
											}
										</div>
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
					<RoomList rooms = {publicRooms} current_room = {props.current_room} users = {props.users} user = {props.user} visibility = "public"/>
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