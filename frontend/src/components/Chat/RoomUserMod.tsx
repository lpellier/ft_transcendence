import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

import {toast} from 'react-toastify';

import {useState, useEffect, useRef} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'


export interface RoomUserDto {
    userId: number;
    roomId: number;
};

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

	function UserList(props : {users: User[], room: Room, roomUsers: User[]}) {
	
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

    function KickUserList(props : {currentUser: User, users: User[], room: Room, roomUsers: User[]}) {
	
		return (
			<Stack className="add-user-list">
				{props.users.map(item => (
					<div key={item.id}>
						{(props.roomUsers.find(user => user.id === item.id) && item.id !== props.currentUser.id)?
							<button className="add-user-list-content" key={item.id}>
								{item.username}		
							</button>
                            :
                            <div/>
						}
						<div/>
					</div>
				))}
			</Stack>
		);
	}

	function AddAdminList(props : {currentUser: User, users: User[], room: Room, roomUsers: User[], roomAdmins: User[]}) {
	
		return (
			<Stack className="add-user-list">
				{props.users.map(item => (
					<div key={item.id}>
						{(props.roomUsers.find(user => user.id === item.id) && item.id !== props.currentUser.id && props.roomAdmins.find(admin => admin.id === item.id) === undefined)?
							<button className="add-user-list-content" key={item.id}>
								{item.username}		
							</button>
                            :
                            <div/>
						}
						<div/>
					</div>
				))}
			</Stack>
		);
	}

	function KickAdminList(props : {currentUser: User, room: Room, roomAdmins: User[]}) {
		return (
			<Stack className="add-user-list">
				{props.roomAdmins.map(item => (
					<div key={item.id}>
						{(item.id !== props.currentUser.id)?
							<button className="add-user-list-content" key={item.id}>
								{item.username}		
							</button>
                            :
                            <div/>
						}
						<div/>
					</div>
				))}
			</Stack>
		);
	}

	return (
		<Stack>
			<button className='add-user' onClick={() => handleAddUserClick(props.room)}>add user</button>
			{addUserClicked ?
				<Stack >
					<Stack direction="row" >
						<form onSubmit={handleUserSubmit}>
							<input type="text" placeholder="username" className="form"/>
						</form>
						<button title="cancel" onClick={() => setAddUserClicked(0)}>❌</button>
					</Stack>
					<UserList users={props.users} room={props.room} roomUsers={roomUsers}/>
				</Stack>
			:
			<div/>
			}
			<button className='add-user' onClick={() => handleKickUserClick(props.room)}>kick user</button>
            {kickUserClicked ?
                <Stack >
                    <Stack direction="row" >
                        <form onSubmit={handleKickUserSubmit}>
                            <input type="text" placeholder="username" className="form"/>
                        </form>
                        <button title="cancel" onClick={() => setKickUserClicked(0)}>❌</button>
                    </Stack>
                    <KickUserList currentUser={props.currentUser} users={props.users} room={props.room} roomUsers={roomUsers}/>
                </Stack>
            :
                <div/>
            }
			<button className='add-user' onClick={() => handleAddAdminClick(props.room)}>add admin</button>
			{addAdminClicked ?
                <Stack >
                    <Stack direction="row" >
                        <form onSubmit={handleAddAdminSubmit}>
                            <input type="text" placeholder="username" className="form"/>
                        </form>
                        <button title="cancel" onClick={() => setAddAdminClicked(0)}>❌</button>
                    </Stack>
                    <AddAdminList currentUser={props.currentUser} users={props.users} room={props.room} roomUsers={roomUsers} roomAdmins={props.roomAdmins}/>
                </Stack>
            :
                <div/>
            }
			<button className='add-user' onClick={ () => handleKickAdminClick(props.room)}>kick admin</button>
			{kickAdminClicked ?
                <Stack >
                    <Stack direction="row" >
                        <form onSubmit={handleKickAdminSubmit}>
                            <input type="text" placeholder="username" className="form"/>
                        </form>
                        <button title="cancel" onClick={() => setKickAdminClicked(0)}>❌</button>
                    </Stack>
                    <KickAdminList currentUser={props.currentUser} room={props.room} roomAdmins={props.roomAdmins}/>
                </Stack>
            :
                <div/>
            }
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