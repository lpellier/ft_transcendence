import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Gandalf from "../../images/Trophies/gandalf.png"
import Star from "../../images/Trophies/star.png"
import ThreeStars from "../../images/Trophies/threestars.png"
import TheQuitter from "../../images/Trophies/quitter.png"
import Frankencat from "../../images/Trophies/frankencat.png"


const ImgStyle = {
	width: "4vw",
	height: "4vw",
	border: "2px solid black",

	padding: 3,
	backgroundColor: "rgb(50, 50, 100)"

}

const ATrophyStyle = {
	border: "2px solid black",
	backgroundColor: "rgb(100, 100, 200, 0.2)",
	alignItems: 'center'
}

function ATrophie(props: {image: string, title: string, label: string}) {
  return (
		<Stack direction="row" sx={ATrophyStyle} spacing={2}>
			<img src={props.image} style={ImgStyle} />
			<Stack>
				<Typography variant="subtitle2">
					{props.title}
				</Typography>
				<Typography variant="subtitle1" color="black">
					{props.label}
				</Typography>
			</Stack>
		</Stack>
  );
}

function OneWinTrophy() {
	return (
		<ATrophie image={Star} label="You're the star, man!" title="First win" />
  	);
}

function ThreeWinsTrophy() {
	return (
		<ATrophie image={ThreeStars} label="Like taking candy to a baby!" title="Three wins" />
  	);
}

function QuitTrophy() {
	return (
		<ATrophie image={TheQuitter} label="Baby please don't go" title="Quit the game"/>
  	);
}

function ChangeNameTrophy() {
	return (
		<ATrophie image={Gandalf} label="Many are my names!" title="Changed name"/>
  	);
}

function ChangeAvatarTrophy() {
	return (
		<ATrophie image={Frankencat} label="He has changed, for sure" title="Changed avatar"/>
  	);
}

export {ChangeAvatarTrophy, ChangeNameTrophy, QuitTrophy, OneWinTrophy, ThreeWinsTrophy}