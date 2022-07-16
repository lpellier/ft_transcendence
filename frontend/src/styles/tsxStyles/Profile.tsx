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

const TitleStyle = {
	textAlign: 'end',
	marginRight: '10px',
}

enum achievements {
	ONESTAR,
	THREESTARS,
	QUIT,
	CHANGEAVATAR,
  }
  
  const TitleBoxStyle = {
	  backgroundColor: "rgb(170, 50, 190)",
	  borderRadius: "4px",
	  border: "1px solid black",
	  padding: "5%",
	  boxShadow: '0px 2px 5px 1px gray',
	  width: '80%',
	  height: '100%',
	  textTransform: 'uppercase',
	  overflow: 'hidden',
	  
	fontSize: '1em',
	  display: 'flex',
	  justifyContent: 'center',
	  textAlign: 'center',
	  verticalAlign: 'middle',
  }
  
  const TextBoxStyle = {
	  color: "rgb(30, 70, 200)",
	  padding: "1%",
	  width: '80%',
	  overflow: 'hidden',
  
	  textAlign: 'center',
  }

export {PlayerBarStyle,
        StatTitle, StatBox, MatchHistoryBox,
        TitleStyle, TitleBoxStyle, TextBoxStyle, achievements};