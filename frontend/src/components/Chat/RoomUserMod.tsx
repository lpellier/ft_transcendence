import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

import {toast} from 'react-toastify';

import {useState, useEffect } from 'react'
import {Room, User} from 'interfaces'
import {socket} from 'index'
// import {socket} from './Chat'



export interface RoomUserDto {
    userId: number;
    roomId: number;
};

export function toastThatError(message: string) {
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

export function toastIt(message: string) {
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

function RoomUserMod(props : {currentUser: User, users: User[], room: Room, roomAdmins: User[]}) {

	let [roomUsers, setRoomUsers] = useState<User[]>([]);
	let [addUserClicked, setAddUserClicked] = useState<number>(0);
    let [kickUserClicked, setKickUserClicked] = useState<number>(0);
	let [addAdminClicked, setAddAdminClicked] = useState<number>(0);
	let [kickAdminClicked, setKickAdminClicked] = useState<number>(0);


	function handleAddUserClick(room: Room) {
		socket.emit('get users', room.id);
		setAddUserClicked(1);
	}

    useEffect (() => {
		const handler = (data: User[]) => { setRoomUsers(data);};
		socket.on('get users', handler);
		return () => {
			socket.off('get users', handler);
		}
    }, [])


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
				const addUser: RoomUserDto = {userId: userId, roomId: props.room.id}
				socket.emit('add user to room', addUser);
				setAddUserClicked(0);
				toastIt(username + ' added to ' + props.room.name);
			}
		}
		else
			toastThatError('username not found')
	}

    function handleKickUserSubmit(e: any) {
		e.preventDefault();
		const username: string= e.target[0].value;
		if (props.users.find(user => user.username === username))
		{
			if (roomUsers.find(user => user.username === username))
			{
				let userId: any = props.users.find(user => user.username === username)?.id;
				const removeUser: RoomUserDto = {userId: userId, roomId: props.room.id};
				socket.emit('remove user from room', removeUser);
				setKickUserClicked(0);
				toastIt(username + ' removed from ' + props.room.name);
			}
			else
				toastThatError('user not in room');
		}
		else
			toastThatError('username not found')
	}

    function handleKickUserClick(room: Room) {
        socket.emit('get users', room.id);
		setKickUserClicked(1);
    }


	function handleAddAdminClick(room: Room) {
		socket.emit('get users', room.id);
		setAddAdminClicked(1);
	}

	function handleKickAdminClick(room: Room) {
		socket.emit('get users', room.id);
		setKickAdminClicked(1);
	}

	function handleAddAdminSubmit(e: any) {
		e.preventDefault();
		const username: string= e.target[0].value;
		if (props.users.find(user => user.username === username))
		{
			if (roomUsers.find(user => user.username === username))
			{
				if (props.roomAdmins.find(admin => admin.username === username))
					toastThatError('user already has admin privileges');
				else
				{
					let userId: any = props.users.find(user => user.username === username)?.id;
					const removeUser: RoomUserDto = {userId: userId, roomId: props.room.id};
					socket.emit('add admin to room', removeUser);
					setAddAdminClicked(0);
					toastIt(username + ' given admin privileges ' + props.room.name);
				}
			}
			else
				toastThatError('user not in room');
		}
		else
			toastThatError('username not found')
	}

	function handleKickAdminSubmit(e: any) {
		e.preventDefault();
		const username: string= e.target[0].value;
		if (props.users.find(user => user.username === username))
		{
			if (roomUsers.find(user => user.username === username))
			{
				if (props.roomAdmins.find(admin => admin.username === username))
				{
					let userId: any = props.users.find(user => user.username === username)?.id;
					const removeAdmin: RoomUserDto = {userId: userId, roomId: props.room.id};
					socket.emit('remove admin from room', removeAdmin);
					setKickAdminClicked(0);
					toastIt(username + ' removed from administrators in ' + props.room.name);
				}
				else
					toastThatError('user is not an administrator')
			}
			else
				toastThatError('user not in room');
		}
		else
			toastThatError('username not found')
	}

	function UserList(props:{users: User[], condition: Function}) {
		return (
			<Stack className="add-user-list">
				{props.users.map(item => (
					<div key={item.id}>
						{props.condition(item)?
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

	function	UserModButton(props: {clickAction: Function, room:Room, title:string, clicked: number, handleSubmit: React.FormEventHandler<HTMLFormElement>, setClicked:Function, users: User[], condition: Function}) {
		return (
				<div>
					<button className='add-user' onClick={() => props.clickAction(props.room)}>{props.title}</button>
					{props.clicked ?
						<Stack >
							<Stack direction="row" >
								<form onSubmit={props.handleSubmit}>
									<input type="text" placeholder="username" className="form"/>
								</form>
								<button title="cancel" onClick={() => props.setClicked(0)}>❌</button>
							</Stack>
							<UserList users={props.users} condition={props.condition}/>
						</Stack>
					:
					<div/>
					}
				</div>
		);
	}


	return (
		<Stack>
			<UserModButton 
				clickAction={handleAddUserClick} 
				room={props.room} title="add user"
				clicked={addUserClicked} 
				handleSubmit={handleUserSubmit} 
				setClicked={setAddUserClicked} 
				users={props.users} 
				condition={(item:User) => {return(roomUsers.find(user => user.username === item.username))}}
			/>
			<UserModButton 
				clickAction={handleKickUserClick} 
				room={props.room} 
				title="kick user" 
				clicked={kickUserClicked} 
				handleSubmit={handleKickUserSubmit} 
				setClicked={setKickUserClicked} 
				users={props.users} 
				condition={(item:User) => {return(!(roomUsers.find(user => user.id === item.id) && item.id !== props.currentUser.id))}}
			/>
			<UserModButton
				clickAction={handleAddAdminClick} 
				room={props.room} title="add admin" 
				clicked={addAdminClicked} 
				handleSubmit={handleAddAdminSubmit} 
				setClicked={setAddAdminClicked} 
				users={props.users} 
				condition={(item:User) => {return(!(roomUsers.find(user => user.id === item.id) && item.id !== props.currentUser.id && props.roomAdmins.find(admin => admin.id === item.id) === undefined))}}/>
			<UserModButton 
				clickAction={handleKickAdminClick} 
				room={props.room} 
				title="kick admin" 
				clicked={kickAdminClicked} 
				handleSubmit={handleKickAdminSubmit} 
				setClicked={setKickAdminClicked} 
				users={props.roomAdmins} 
				condition={(item:User) => {return(item.id === props.currentUser.id)}}
			/>
		</Stack>
	)
}

function SimplePopper(props : {user: User, users: User[], room: Room, roomAdmins: User[]}) {
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
				<RoomUserMod currentUser={props.user} users={props.users} room={props.room} roomAdmins={props.roomAdmins}/>
			</Box>
		</Popper>
		</div>
	);
}

export default function RoomUserPopper(props : {currentUser: User, users: User[], room: Room, roomAdmins:User[]}) {


	  return (
		<div>
			{props.roomAdmins.find(user => user.id === props.currentUser?.id)?
				<SimplePopper user={props.currentUser} users={props.users} room={props.room} roomAdmins={props.roomAdmins}/>
			:
				<div/>
			}
		</div>
	  )
}