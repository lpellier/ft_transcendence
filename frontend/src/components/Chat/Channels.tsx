import '../../styles/Chat/Channels.css';
// import io  from "socket.io-client";
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';



import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'

interface AddUserDto {
    userId: number;
    roomId: number;
};

interface CreateRoomDto {
	name: string;
	userId: number;
}

function Channels(props : {user: User, users: User[], current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {

	let [clicked, setClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([]);
	let [addUserClicked, setAddUserClicked] = useState<number>(0);

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
		const createRoomDto: CreateRoomDto = {name: room_name, userId: props.user.id}
		if (room_name)
			socket.emit('create room', createRoomDto);
		e.target[0].value = '';
		setClicked(0);
	}

	function handleAddUserClick(e: any) {
		e.preventDefault();
		setAddUserClicked(1);
	}

	function handleUserSubmit(e: any) {
		e.preventDefault();
		const username: string= e.target[0].value;

		if (props.users.find(user => user.username === username))
		{
			let userId: any = props.users.find(user => user.username === username)?.id;
			const addUser: AddUserDto = {userId: userId, roomId: props.current_room.id}
			socket.emit('add user to room', addUser);
		}
		setAddUserClicked(0);
	}

	useEffect(() => {
		socket.on('create room', (room_id: number) => {
			const addUser: AddUserDto = {userId: props.user.id, roomId: room_id}
			socket.emit('get rooms', props.user?.id)
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
				<Stack>
					<ul className='channel-list'>
						{rooms.map(item => (
							<div key={item.id}>
								{item.name !== props.current_room.name ?
									<button className='channel-list-content' onClick={() => handleListClick(item)}>
										{item.name}
									</button>
									:
									<Stack>
										<button className='current-channel'>{props.current_room.name} </button>
										<button className='add-user' onClick={handleAddUserClick}>add user</button>
										<div>
											{addUserClicked ? 
												<form onSubmit={handleUserSubmit}>
													<input type="text" placeholder="username"/>
												</form>
											:
												<div/>
											}
										</div>
									</Stack>
								}
							</div>
						))}
					</ul>
				</Stack>
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