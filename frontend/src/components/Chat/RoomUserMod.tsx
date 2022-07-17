import '../../styles/Chat/Channels.css';
import TextField from '@mui/material/TextField';
import {Button, Tooltip} from '@mui/material';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {useState, useEffect } from 'react'
import {Room, User} from 'interfaces'
import {socket} from 'index'
import { toastIt, toastThatError } from '../../App';
import {ButtonStyle} from './Channels';
import CloseIcon from '@mui/icons-material/Close';

export interface RoomUserDto {
    userId: number;
    roomId: number;
};

function RoomUserMod(props : {currentUser: User, users: User[], room: Room, roomAdmins: User[]}) {

	let [roomUsers, setRoomUsers] = useState<User[]>([]);
	let [addUserClicked, setAddUserClicked] = useState<number>(0);
    let [kickUserClicked, setKickUserClicked] = useState<number>(0);
	let [addAdminClicked, setAddAdminClicked] = useState<number>(0);
	let [kickAdminClicked, setKickAdminClicked] = useState<number>(0);
	let [muteUserClicked, setMuteUserClicked] = useState<number>(0);
	let [passwordClicked, setPasswordClicked] = useState<boolean>(false);

	useEffect (() => {
		const handler = (data: User[]) => { setRoomUsers(data);};
		socket.on('get users', handler);
		return () => {
			socket.off('get users', handler);
		}
	}, [])

	function handleAddUserClick(room: Room) {
		socket.emit('get users', room.id);
		setAddUserClicked(1);
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
	
	function handleMuteUserClick(room: Room) {
		socket.emit('get users', room.id);
		setMuteUserClicked(1);
	}

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

	function handleMuteUserSubmit(e: any) {
		e.preventDefault();
		const username: string= e.target[0].value;
		if (props.users.find(user => user.username === username))
		{
			if (roomUsers.find(user => user.username === username))
			{
				let userId: any = props.users.find(user => user.username === username)?.id;
				const removeUser: RoomUserDto = {userId: userId, roomId: props.room.id};
				// socket.emit('remove user from room', removeUser);
				setKickUserClicked(0);
				toastIt(username + ' removed from ' + props.room.name);
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
					<Button variant="contained" size="small" style={ButtonStyle} onClick={() => props.clickAction(props.room)}>{props.title}</Button>
					{props.clicked ?
						<Stack >
							<Stack direction="row" >
								<form onSubmit={props.handleSubmit}>
									<TextField 
										type="text"
										label="username" 
										variant="standard"
										size="small"
										color="warning"
										style={{width: '80%'}}
									/>
								</form>
								<Button title="cancel" onClick={() => props.setClicked(0)}><CloseIcon/></Button>
							</Stack>
							<UserList users={props.users} condition={props.condition}/>
						</Stack>
					:
					<div/>
					}
				</div>
		);
	}

	function handleNewPasswordSubmit(e: any) {
		e.preventDefault();

		let password:string = e.target[0].value;
		socket.emit('update password', {roomId: props.room.id, password: password})
		setPasswordClicked(false);
	}

	function PasswordMod(props: {setPasswordClicked: React.Dispatch<React.SetStateAction<boolean>>}) {
		return (
			<Button variant="contained" size="small" style={ButtonStyle} onClick={() => props.setPasswordClicked(true)}>Change Password</Button>
		)
	}


	return (
		<Stack spacing={0.6} >
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
				clickAction={handleMuteUserClick} 
				room={props.room} 
				title="mute user" 
				clicked={muteUserClicked} 
				handleSubmit={handleMuteUserSubmit} 
				setClicked={setMuteUserClicked} 
				users={props.roomAdmins} 
				condition={(item:User) => {return(!(roomUsers.find(user => user.id === item.id) && item.id !== props.currentUser.id))}}
			/>
			{props.currentUser.id === props.room.ownerId?
			<UserModButton
				clickAction={handleAddAdminClick} 
				room={props.room} title="add admin" 
				clicked={addAdminClicked} 
				handleSubmit={handleAddAdminSubmit} 
				setClicked={setAddAdminClicked} 
				users={props.users} 
				condition={(item:User) => {return(!(roomUsers.find(user => user.id === item.id) && item.id !== props.currentUser.id && props.roomAdmins.find(admin => admin.id === item.id) === undefined))}}/>
			:
			null}
			{props.currentUser.id === props.room.ownerId?
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
			:null}
			{props.currentUser.id === props.room.ownerId?
				<div>
					<PasswordMod setPasswordClicked={setPasswordClicked}/>
					{passwordClicked?
							<Stack direction="row" >
							<form onSubmit={handleNewPasswordSubmit}>
							<TextField 
									type="text"
									label="new password"
									variant="standard"
									size="small"
									color="warning"
									style={{width: '80%'}}
								/>
							</form>
							<Button title="cancel" onClick={() => setPasswordClicked(false)}><CloseIcon/></Button>
						</Stack>
					:null}
				</div>
				:null}
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
			<Tooltip title="Settings">
				<IconButton onClick={handleClick} color="error">
					<SettingsIcon/>
				</IconButton>
			</Tooltip>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<Box sx={{ border: 1, p: 1, bgcolor: 'rgb(140, 150, 220)' }}>
					<RoomUserMod currentUser={props.user} users={props.users} room={props.room} roomAdmins={props.roomAdmins}/>
				</Box>
			</Popper>
		</div>
	);
}

export default function RoomUserPopper(props : {currentUser: User, users: User[], room: Room, roomAdmins:User[]}) {

	  return (
		
		<Box sx={{display: 'flex', alignItems: 'center'}}>
			{props.roomAdmins.find(user => user.id === props.currentUser?.id)?
				<SimplePopper user={props.currentUser} users={props.users} room={props.room} roomAdmins={props.roomAdmins}/>
			:
				<div/>
			}
		</Box>
		
	  )
}