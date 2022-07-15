const PlayerBarStyle = {	
    textAlign: 'center',
    verticalAlign: 'baseline',
    padding: '1%',
    paddingRight: '3%',
    paddingLeft: '3%',

    color: 'white',
    border: '3px solid black',
    backgroundColor: 'rgb(122, 40, 203)',
}
					
const SkillBarStyle = {
    paddingTop: '1%'
}

const StatTitle = {
    backgroundColor: 'rgb(122, 40, 203)',
	textAlign: 'center',
	border: '3px solid black',
    paddingLeft: '10%',

	paddingBottom: '1%',
	paddingTop: '1%',
	color: 'white',
}

const StatBox = {
    backgroundColor: 'rgb(211, 172, 223)',
	color: 'white',
	border: '3px solid black',
    height: '30vh',
    overflowY: 'scroll',
    overflow: 'auto',
	paddingTop: '4%',
	paddingLeft: '4%',
	paddingRight: '4%',
}

const MatchHistoryBox = {
    backgroundColor: 'rgb(211, 172, 223)',
	color: 'white',
	border: '3px solid black',
    height: '30vh',
    overflowY: 'scroll',
    overflow: 'auto',
	padding: '0%',
	paddingBottom: '4%',
}

const SkillBarContourStyle = {
	backgroundColor: 'rgb(180, 150, 250)',
	borderRadius: '20px',
}

const TitleStyle = {
	textAlign: 'end',
	marginRight: '10px',
}

export {PlayerBarStyle, SkillBarStyle,
        StatTitle, StatBox, MatchHistoryBox, SkillBarContourStyle,
        TitleStyle}