import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Gandalf from "../../images/Trophies/gandalf.png"
import Star from "../../images/Trophies/star.png"
import ThreeStars from "../../images/Trophies/threestars.png"
import TheQuitter from "../../images/Trophies/quitter.png"
import Frankencat from "../../images/Trophies/frankencat.png"


const ImgStyle = {
	width: "4vw",
	height: "4vh",
	border: "2px solid black",

	padding: 3,
	backgroundColor: "rgb(50, 50, 100)"

}

const ATrophyStyle = {
	border: "2px solid black",
	width: "30vw",
	backgroundColor: "rgb(100, 100, 200)"
}

function ATrophie(props: {image: string, label: string}) {
  return (
		<Stack direction="row" sx={ATrophyStyle} spacing={2}>
			<img src={props.image} style={ImgStyle} />
			<Typography variant="h6" color="black">
				{props.label}
			</Typography>
		</Stack>
  );
}

function OneWinTrophy() {
	return (
		<ATrophie image={Star} label="You're the star, man!" />
  	);
}

function ThreeWinsTrophy() {
	return (
		<ATrophie image={ThreeStars} label="Pong be like taking candy to a baby!" />
  	);
}

function QuitTrophy() {
	return (
		<ATrophie image={TheQuitter} label="Baby please don't go" />
  	);
}

function ChangeNameTrophy() {
	return (
		<ATrophie image={Gandalf} label="Many are my names!" />
  	);
}

function ChangeAvatarTrophy() {
	return (
		<ATrophie image={Frankencat} label="I'll have a piece of this, and a piece of that..." />
  	);
}

export {ChangeAvatarTrophy, ChangeNameTrophy, QuitTrophy, OneWinTrophy, ThreeWinsTrophy}