
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { TextField } from '@mui/material';
import { User } from 'interfaces';
import { socket } from 'index';

export default function FriendBar(props: {user: User}) {
    
    let [open, setOpen] = useState<boolean>(false);
    let [addFriendClicked, setAddFriendClicked] = useState<boolean>(false);
    let [friends, setFriends] = useState<number[]>([]);

    function toggleFriendBar() {
        setOpen(true);
    }

    function closeFriendBar() {
        setOpen(false);
    }

    function addFriendClick() {
        setAddFriendClicked(true);
        socket.emit('find all friends', props.user.id);
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
                    <TextField/>
                    :
                    <div/>
                }
            </Drawer>
        </div>
    );
}