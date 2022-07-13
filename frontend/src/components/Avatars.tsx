import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import {ImageIdContext} from "App"

// Styles

const BigAvatar = {border: 2, width: 150, height: 150}
const SmallAvatar = {border: 2, width: 50, height: 50}

export function PlayerAvatar(props: {image: string } ) {

    return(
        <ImageIdContext.Consumer>
         {({imageId}) => 
		 <div >
            <IconButton >
                <Tooltip title="Profile" placement="bottom">
                    <Avatar src={props.image + "?" + imageId}  sx={SmallAvatar} />
                </Tooltip>
            </IconButton>
		 </div>
        }
        </ ImageIdContext.Consumer>
    );
}
