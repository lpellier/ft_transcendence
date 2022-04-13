import Container from '@mui/material/Container'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { ContainerStyle, TitleStyle } from '../../styles/tsxStyles/error' 

function ErrorComponent() {
	return (
		<ImageListItem>
          <img
            src='https://i.kym-cdn.com/entries/icons/facebook/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg'
            alt='ErrorImage'
            loading="lazy"
          />
          <ImageListItemBar
            title='Sorry, You cannot LogIn'
            subtitle='Boop-Bip-Boop'
            position="below"
			sx={TitleStyle}
          />
        </ImageListItem>
	);
}


export default function Error() {

    return (
		<ImageList sx={ContainerStyle}>
			<ErrorComponent />
		</ImageList>
    );
}
