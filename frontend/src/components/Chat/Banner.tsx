import '../../styles/Chat/Banner.css'
import Stack from '@mui/material/Stack'

function Banner() {
    return (
        < Stack direction="row" className='banner' spacing={1}>
            <img className="logo" src="https://cdn.pixabay.com/photo/2018/03/18/18/55/cat-3237903_960_720.png" alt='logo'/>
            <div className='title'>
				Cat Chat
			</div>
        </Stack>
    )
}

export default Banner