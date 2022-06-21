
import react, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function FriendBar() {
    
    let [open, setOpen] = useState<boolean>(false);

    function toggleFriendBar() {
        setOpen(true);
    }

    function closeFriendBar() {
        setOpen(false);
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
                hello
            </Drawer>
        </div>
    );
}