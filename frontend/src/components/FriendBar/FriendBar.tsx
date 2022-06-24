
import { useDebugValue, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { TextField } from '@mui/material';
import { User } from 'interfaces';
import { socket } from 'index';
import { toastThatError, toastIt } from 'components/Chat/RoomUserMod';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Stack from '@mui/material/Stack';


interface FriendUserDto {
    userId: number;
    friendId: number;
}

export default function FriendBar(props: {user: User}) {
    
    let [open, setOpen] = useState<boolean>(false);
    let [addFriendClicked, setAddFriendClicked] = useState<boolean>(false);
    let [friends, setFriends] = useState<User[]>([]);
    let [users, setUsers] = useState<User[]>([]);

    function toggleFriendBar() {
        setOpen(true);
    }

    useEffect(() => {
        socket.emit('get all users')
        socket.emit('find all friends', props.user?.id);
    }, [])

    useEffect(() => {
        const handler = () => {socket.emit('find all friends', props.user?.id)}
        socket.on('friend added', handler);
        return () => {
            socket.off('friend added', handler);
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
        socket.on('found friends', handler);
        return () => {
            socket.off('found friends', handler);
        }
    })

    useEffect(() => {
        socket.on('got all users', (data) => {
            setUsers(data);
        })
    }, [])

    function addFriendSubmit(e: any) {
        e.preventDefault();
        console.log('add friend called');
        const username: string = e.target[0].value;
        console.log('username = ', username);
        if( users.find(user => user.username === username) )
        {
            console.log('user exists')
            if( friends.find(user=> user.username === username))
                toastThatError('this user is already your friend');
            else
            {
                let friendId: any = users.find(user => user.username === username)?.id;
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
                <Button onClick={addFriendClick}>
                    Add Friend
                </Button>
                {addFriendClicked?
                    <Stack component="form" onSubmit={addFriendSubmit} spacing={1}>
                        <TextField id="roomName" label="friend name" variant="standard" />
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
                            <ListItem button onClick={() => setOpen(false)}>
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