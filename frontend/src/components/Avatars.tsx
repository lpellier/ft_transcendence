import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// Avatar images importation

import Cactus from      "../images/Avatar/Cactus.png"
import Robot from       "../images/Avatar/Robot.png"
import Coffea from      "../images/Avatar/Coffea.png"
import IceCream from    "../images/Avatar/IceCream.png"
import Owl from         "../images/Avatar/Owl.png"
import Penguin from     "../images/Avatar/Penguin.png"

import Panda from            "../images/Avatar/Panda.png"
import Fox from             "../images/Avatar/Fox.png"
import Cat from             "../images/Avatar/Cat.png"
import Dog from             "../images/Avatar/Dog.png"
import Penmerican from       "../images/Avatar/Penmerican.png"
import Hambeargur from       "../images/Avatar/Hambeargur.png"

import Ramen from       "../images/Avatar/Ramen.png"
import Tacos from       "../images/Avatar/Tacos.png"
import Ptero from       "../images/Avatar/Ptero.png"
import EasterEgg from   "../images/Avatar/EasterEgg.png"
import Mouse from       "../images/Avatar/Mouse.png"
import Sloth from       "../images/Avatar/Sloth.png"

// Styles

const BigAvatar = {border: 2, width: 150, height: 150}
const SmallAvatar = {border: 2, width: 50, height: 50}

function PlayerAvatar(props: {image: string} ) {

    return(
        <IconButton >
            <Tooltip title="Profile" placement="bottom">
                <Avatar src={props.image}  sx={SmallAvatar} />
            </Tooltip>
        </IconButton>
    );
}

function CreateAvatar(props: {img: string, style: any}) {

	const handleClick = () => {
		// const formData = new FormData();
		
		// formData.append('avatar', file)

        // axios.put('http://127.0.0.1:3001/users/upload-avatar',
		// formData,
        // {
        //     withCredentials: true,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     }
        // })
		// .then(res => {
		// 	console.log("Put request success : ", res)
		// })
        // .catch(function (err) {
        //     console.log("Put request failed : ", err)
        // });
    }
    
    return (
        <IconButton onClick={handleClick}>
            <Avatar src={props.img}  sx={props.style}/>
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

function PandaAvatar() {
    return (
        <CreateAvatar img={Panda} style={BigAvatar}/>
    );
}

function FoxAvatar() {
    return (
        <CreateAvatar img={Fox} style={BigAvatar}/>
    );
}

function CatAvatar() {
    return (
        <CreateAvatar img={Cat} style={BigAvatar}/>
    );
}

function DogAvatar() {
    return (
        <CreateAvatar img={Dog} style={BigAvatar}/>
    );
}

function HambeargurAvatar() {
    return (
        <CreateAvatar img={Hambeargur} style={BigAvatar}/>
    );
}

function RamenAvatar() {
    return (
        <CreateAvatar img={Ramen} style={BigAvatar}/>
    );
}

function TacosAvatar() {
    return (
        <CreateAvatar img={Tacos} style={BigAvatar}/>
    );
}

function PenmericanAvatar() {
    return (
        <CreateAvatar img={Penmerican} style={BigAvatar}/>
    );
}

function SlothAvatar() {
    return (
        <CreateAvatar img={Sloth} style={BigAvatar}/>
    );
}

function MouseAvatar() {
    return (
        <CreateAvatar img={Mouse} style={BigAvatar}/>
    );
}

function PteroAvatar() {
    return (
        <CreateAvatar img={Ptero} style={BigAvatar}/>
    );
}

function EasterEggAvatar() {
    return (
        <CreateAvatar img={EasterEgg} style={BigAvatar}/>
    );
}

export {CreateAvatar, PlayerAvatar, CactusAvatar, RobotAvatar, CoffeaAvatar, IceCreamAvatar,
		OwlAvatar, PenguinAvatar,
        PandaAvatar, FoxAvatar, CatAvatar, DogAvatar, HambeargurAvatar, 
        RamenAvatar, TacosAvatar, PenmericanAvatar,
        MouseAvatar, PteroAvatar, EasterEggAvatar, SlothAvatar}