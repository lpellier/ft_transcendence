import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import {toast} from 'react-toastify';


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

function toastThatError(message: string) {
	toast.error(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
}

function toastIt(message: string) {
	toast.success(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
}

function AddUser(props : {users: User[], room: Room, setAddUserClicked: React.Dispatch<React.SetStateAction<number>>}) {

	let [roomUsers, setRoomUsers] = useState<User[]>([]);


	function handleUserSubmit(e: any) {
		e.preventDefault();
		const username: string= e.target[0].value;
		if (props.users.find(user => user.username === username))
		{
			if (roomUsers.find(user => user.username === username))
				toastThatError('user already in room');
			else
			{
				let userId: any = props.users.find(user => user.username === username)?.id;
				const addUser: AddUserDto = {userId: userId, roomId: props.room.id}
				socket.emit('add user to room', addUser);
				props.setAddUserClicked(0);
				toastIt(username + ' added to ' + props.room.name);
			}
		}
		else
			toastThatError('username not found')
	}

	function UserList(props : {users: User[], room: Room, roomUsers: User[], setRoomUsers: React.Dispatch<React.SetStateAction<User[]>>}) {
		useEffect (() => {
			socket.on('get users', (data: User[]) => {
				setRoomUsers(data);
			})
		}, [])
	
		return (
			<Stack className="add-user-list">
				{props.users.map(item => (
					<div key={item.id}>
						{roomUsers.find(user => user.username === item.username)?
							<div/>
							:
							<button className="add-user-list-content" key={item.id}>
								{item.username}		
							</button>
						}
					</div>
				))}
			</Stack>
		);
	}


	return (
		<Stack >
			<Stack direction="row" >
				<form onSubmit={handleUserSubmit}>
					<input type="text" placeholder="username" className="form"/>
				</form>
				<button title="cancel" onClick={() => props.setAddUserClicked(0)}>❌</button>
			</Stack>
			<UserList users={props.users} room={props.room} roomUsers={roomUsers} setRoomUsers={setRoomUsers}/>
		</Stack>
	)
}

function Channels(props : {user: User, users: User[], current_room: Room, setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>}) {

	let [addRoomClicked, setAddRoomClicked] = useState<number>(0);
	let [rooms, setRooms] = useState<Room[]>([]);
	let [addUserClicked, setAddUserClicked] = useState<number>(0);

	function handleRoomSubmit(e:any) {
		e.preventDefault();
		const room_name: string = e.target[0].value;
		const createRoomDto: CreateRoomDto = {name: room_name, userId: props.user.id}
		if (room_name)
			socket.emit('create room', createRoomDto);
		e.target[0].value = '';
		setAddRoomClicked(0);
	}

	function handleRoomClick(room: Room) {
		setAddUserClicked(0);
		props.setCurrentRoom(room)
	}

	function handleAddUserClick(room: Room) {
		socket.emit('get users', room.id);
		setAddUserClicked(1);
	}

	useEffect(() => {
		socket.on('create room', (room_id: number) => {
			const addUser: AddUserDto = {userId: props.user.id, roomId: room_id}
			socket.emit('get rooms', props.user.id)
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
									<button className='channel-list-content' onClick={() => handleRoomClick(item)}>
										{item.name}
									</button>
									:
									<Stack>
										<button className='current-channel'>{props.current_room.name} </button>
										<button className='add-user' onClick={() => handleAddUserClick(item)}>add user</button>
										<div>
											{addUserClicked ?
												<AddUser users={props.users} room={item} setAddUserClicked={setAddUserClicked}/>
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
				<button onClick={() => setAddRoomClicked(1)}>Create Room</button>
				<div>
					{addRoomClicked ?
							<Stack direction="row">
								<form onSubmit={handleRoomSubmit}>
									<input type="text" placeholder='Room name' className="form"/>
								</form>
								<button title="cancel" onClick={() => setAddRoomClicked(0)}>❌</button>
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