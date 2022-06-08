import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import {toast} from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';


import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'
import { Experimental_CssVarsProvider, requirePropFactory } from '@mui/material';

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

export default function RoomUserMod(props : {currentUser: User, users: User[], room: Room}) {

	let [roomUsers, setRoomUsers] = useState<User[]>([]);
	let [addUserClicked, setAddUserClicked] = useState<number>(0);
    let [kickUserClicked, setKickUserClicked] = useState<number>(0);
	let [roomAdmins, setRoomAdmins] = useState<User[]>([]);
	let [addAdminClicked, setAddAdminClicked] = useState<boolean>(false);

	function handleAddUserClick(room: Room) {
		socket.emit('get users', room.id);
		setAddUserClicked(1);
	}

    useEffect (() => {
        socket.on('get users', (data: User[]) => {
            setRoomUsers(data);
        })
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
		setAddUserClicked(0);
        socket.emit('get users', room.id);
		setKickUserClicked(1);
    }

	function handleAddAdminClick(room: Room) {
		setAddAdminClicked(true);
		socket.emit('get admins', room.id);
		socket.emit('get users', room.id);
	}

    useEffect (() => {
        socket.on('get admins', (data: User[]) => {
            setRoomAdmins(data);
        })
    }, [])

	function handleAddAdminSubmit(e: any) {
		e.preventDefault();
		const username: string= e.target[0].value;
		if (props.users.find(user => user.username === username))
		{
			if (roomUsers.find(user => user.username === username))
			{
				if (roomAdmins.find(admin => admin.username === username))
					toastThatError('user already has admin privileges');
				else
				{
					let userId: any = props.users.find(user => user.username === username)?.id;
					const removeUser: RoomUserDto = {userId: userId, roomId: props.room.id};
					socket.emit('add admin to room', removeUser);
					setAddAdminClicked(false);
					toastIt(username + ' given admin privileges ' + props.room.name);
				}
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
						{(props.roomUsers.find(user => user.username === item.username) && item.id !== props.currentUser.id)?
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
						{(props.roomUsers.find(user => user.username === item.username) && item.id !== props.currentUser.id && !props.roomAdmins.find(user => user.username === item.username))?
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
                        <button title="cancel" onClick={() => setAddAdminClicked(false)}>❌</button>
                    </Stack>
                    <AddAdminList currentUser={props.currentUser} users={props.users} room={props.room} roomUsers={roomUsers} roomAdmins={roomAdmins}/>
                </Stack>
            :
                <div/>
            }
		</Stack>
	)
}