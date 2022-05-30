import '../../styles/Chat/Channels.css';
import Stack from '@mui/material/Stack';
import {toast} from 'react-toastify';


import {useState, useEffect} from 'react'
import {Room, User} from 'interfaces'
import {socket} from './Chat'

export interface AddUserDto {
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
				const addUser: AddUserDto = {userId: userId, roomId: props.room.id}
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
				const removeUser: AddUserDto = {userId: userId, roomId: props.room.id};
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

	return (
		<div>
			<button className='add-user' onClick={() => handleAddUserClick(props.room)}>add user</button>
			<button className='add-user' onClick={() => handleKickUserClick(props.room)}>kick user</button>
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
		</div>
	)
}