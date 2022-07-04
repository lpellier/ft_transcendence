import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { TextField } from '@mui/material';
import { User } from 'interfaces';
import { socket } from 'index';
import { toastThatError, toastIt } from 'App';
import '../../styles/Chat/Channels.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

interface FriendUserDto {
    userId: number;
    friendId: number;
}

function UserList(props: {currentUser: User, users: User[], friends: User[]}) {
    console.log('users = ', props.users);
    return (
        <List className='user-list'>
        {props.users.map(item => (
            	<div key={item.id}>
            	    {props.friends.find(friend => friend.id === item.id)?
            	<div/>
                	:
            	<div>
            	    {props.currentUser.id !== item.id?
            	        <ListItem>
            	            <ListItemText primary={item.username}/>
            	        </ListItem>
            	    	:
            	    <div/>
            	    }
            	</div>
            }
            </div>
        ))}
        </List>
    )
}

export default function FriendBar(props: {user: User, users: User[]}) {
    
    let [open, setOpen] = useState<boolean>(false);
    let [addFriendClicked, setAddFriendClicked] = useState<boolean>(false);
    let [friends, setFriends] = useState<User[]>([]);
    let [statusMap, setStatusMap] = useState<Map<number, string> >(new Map<number, string>());

    function toggleFriendBar() {
        setOpen(true);
    }

    useEffect(() => {
        socket.on('new connection', (userId: number) => {
            console.log('new connection -> ', userId);
            setStatusMap(statusMap.set(userId, 'online'));
        })
    }, [statusMap]);

    useEffect(() => {
        socket.on('new disconnection', (userId: number) => {
            setStatusMap(statusMap.set(userId, 'offline'));
        })
    }, [statusMap]);

    useEffect(() => {
        socket.emit('get friends', props.user.id);
    }, [props.user.id])

    useEffect(() => {
        const handler = () => {socket.emit('get friends', props.user?.id)
    console.log('add friend received')}
        socket.on('add friend', handler);
        return () => {
            socket.off('add friend', handler);
        }
    }, [props.user.id])

    function closeFriendBar() {
        setOpen(false);
    }

    function addFriendClick() {
        setAddFriendClicked(true);
    }

    useEffect(() => {
        const handler = (data: User[]) => {setFriends(data);};
        socket.on('get friends', handler);
        return () => {
            socket.off('get friends', handler);
        }
    }, [])


    function addFriendSubmit(e: any) {
        e.preventDefault();
        const username: string = e.target[0].value;
        if( props.users.find(user => user.username === username) )
        {
            console.log('user exists')
            if( friends.find(user=> user.username === username))
                toastThatError('this user is already your friend');
            else
            {
                let friendId: any = props.users.find(user => user.username === username)?.id;
                const friendUser: FriendUserDto = {userId: props.user.id, friendId: friendId };
                socket.emit('add friend', friendUser);
                setAddFriendClicked(false);
                toastIt(username + ' added to your friends list');
            }
        }
        else
            toastThatError("username doesn't exist")
    }

    function removeFriend(user: User) {
        socket.emit('remove friend', {userId: props.user.id, friendId: user.id});
    }

    return (
        <div>
            <Button onClick={toggleFriendBar} variant="contained" color="secondary">   
                <PeopleAltIcon/>
            </Button>
                <Drawer
                    anchor='left'
                    open={open}
                    onClose={closeFriendBar}
					PaperProps={{
						sx: { width: "15vw", paddingLeft: '2%', paddingTop:'1.5%', backgroundColor: 'rgb(172, 180, 235)'},
					}}
                >
                <Button 
					onClick={addFriendClick} 
					variant="contained"
					style={{backgroundColor: 'rgb(150, 100, 200)', width: '13vw', border: '2px solid black', borderRadius: '5%'}}
					>
                    Add Friend
                </Button>
                {addFriendClicked?
                    <Stack component="form" onSubmit={addFriendSubmit} spacing={1}>
                        <TextField id="roomName" label="friend name" variant="standard" />
                        <UserList currentUser={props.user} users={props.users} friends={friends}/>
                        	<Button 
								variant="contained" 
								type="submit"
								style={{backgroundColor: 'rgb(70, 195, 150)', width: '13vw', border: '2px solid black', borderRadius: '5%'}}
								>
                        	    Add
                        	</Button>
                        	<Button 
								variant="contained" 
								onClick={() => setAddFriendClicked(false)}
								style={{backgroundColor: 'rgb(195, 60, 40)', width: '13vw', border: '2px solid black', borderRadius: '5%'}}
							>
                        	    Cancel
                        	</Button>
                    </Stack>
                    :
                    <div/>
                }
                <List>
                    {friends.map(item => (
                        <div key={item.id}>
                            <ListItem >
                                <ListItemText primary={item.username} secondary={statusMap.get(item.id)? statusMap.get(item.id) : 'offline'}/>
                                <Button variant="contained" color="error" onClick={() => removeFriend(item)}>remove</Button>
                            </ListItem>
                        </div>
                    ))
                    }
                </List>
            </Drawer>
        </div>
    );
}