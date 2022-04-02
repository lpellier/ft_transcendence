import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Avatar images importation

import Cactus from      "../images/Avatar/Cactus.png"
import Robot from       "../images/Avatar/Robot.png"
import Coffea from      "../images/Avatar/Coffea.png"
import IceCream from    "../images/Avatar/IceCream.png"
import Owl from         "../images/Avatar/Owl.png"
import Penguin from     "../images/Avatar/Penguin.png"

const BigAvatar = {border: 2, width: 150, height: 150}
const SmallAvatar = {border: 2, width: 50, height: 50}

function CreateAvatar(props) {
	return (
        <IconButton>
            <Avatar src={props.img}  sx={props.style}/>
        </IconButton>
    );
}

function PlayerAvatar(props) {
	return(
		<IconButton>
			<Tooltip title="Home" placement="bottom">
				<Avatar src={props.img}  sx={SmallAvatar}/>
			</Tooltip>
		</IconButton>
	);
}

function CactusAvatar() {
    return (
        <CreateAvatar img={Cactus} style={BigAvatar} />
    );
}

function RobotAvatar() {
	return (
        <CreateAvatar img={Robot} style={BigAvatar}/>
    );
}

function CoffeaAvatar() {
    return (
        <CreateAvatar img={Coffea} style={BigAvatar}/>
    );
}

function IceCreamAvatar() {
	return (
        <CreateAvatar img={IceCream} style={BigAvatar}/>
    );
}

function OwlAvatar() {
	return (
        <CreateAvatar img={Owl} style={BigAvatar}/>
    );
}

function PenguinAvatar() {
    return (
        <CreateAvatar img={Penguin} style={BigAvatar}/>
    );
}

export {CreateAvatar, PlayerAvatar, CactusAvatar, RobotAvatar, CoffeaAvatar, IceCreamAvatar,
		OwlAvatar, PenguinAvatar}