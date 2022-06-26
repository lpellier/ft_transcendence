import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { TextField } from '@mui/material';
import { User } from 'interfaces';
import { socket } from 'index';
import { toastThatError, toastIt } from 'App';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Stack from '@mui/material/Stack';


interface FriendUserDto {
    userId: number;
    friendId: number;
}

function UserList(props: {users: User[], friends: User[]}) {
    return (
        <List>
        {props.users.map(item => {
            <ListItem>
                <ListItemText primary={item.username}/>
            </ListItem>
        })}
        </List>
    )
}

export default function FriendBar(props: {user: User, users: User[]}) {
    
    let [open, setOpen] = useState<boolean>(false);
    let [addFriendClicked, setAddFriendClicked] = useState<boolean>(false);
    let [friends, setFriends] = useState<User[]>([]);

    function toggleFriendBar() {
        setOpen(true);
    }

    useEffect(() => {
        socket.emit('find all friends', props.user.id);
    }, [])

    useEffect(() => {
        const handler = () => {socket.emit('find all friends', props.user?.id)}
        socket.on('add friend', handler);
        return () => {
            socket.off('add friend', handler);
        }
    })

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
    })


    function addFriendSubmit(e: any) {
        e.preventDefault();
        console.log('add friend called');
        const username: string = e.target[0].value;
        console.log('username = ', username);
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
        {
            toastThatError("username doesn't exist")
            console.log("user doesn't exist")
        }
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
                >
                <Button onClick={addFriendClick} variant="contained">
                    Add Friend
                </Button>
                {addFriendClicked?
                    <Stack component="form" onSubmit={addFriendSubmit} spacing={1}>
                        <TextField id="roomName" label="friend name" variant="standard" />
                        <UserList users={props.users} friends={friends}/>
                        <Button variant="contained" color="success" type="submit">
                            Add
                        </Button>
                        <Button variant="contained" color="error" onClick={() => setAddFriendClicked(false)}>
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
                                <ListItemText primary={item.username}/>
                            </ListItem>
                        </div>
                    ))
                    }
                </List>
            </Drawer>
        </div>
    );
}