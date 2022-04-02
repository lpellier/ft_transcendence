import React from 'react';
import '../../styles/Banner.css'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

function Banner() {
    return (
        < Stack direction="row" className='banner' spacing={1}>
            <img className="logo" src="https://cdn.pixabay.com/photo/2016/03/31/19/23/cat-1294968_960_720.png" alt='logo'/>
            <Typography variant="h4" className='title'>
				Cat Chat
			</Typography>
        </Stack>
    )
}

export default Banner