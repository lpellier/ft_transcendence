import { Stack } from '@mui/material';
import { StackStyle, TitleStyle, ImageStyle } from '../styles/tsxStyles/error' 

function ErrorComponent() {
	return (
		<Stack sx={StackStyle} spacing={10}>
      <img
        src='https://i.kym-cdn.com/entries/icons/facebook/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg'
        alt='ErrorImage'
        style={ImageStyle}
      />
        <h1 style={TitleStyle}>
			    Hey! You can't login!
        </h1>
      </Stack>
	);
}


export default function Error() {
    return (
			<ErrorComponent />
    );
}
