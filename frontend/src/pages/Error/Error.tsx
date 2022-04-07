import Box from '@mui/material/Box'

import { errorStyle } from '../../styles/tsxStyles/error' 

export default function Error() {

    return (
		<Box sx={{errorStyle}}>
			<img src='url("https://i.kym-cdn.com/entries/icons/facebook/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg")'/>
		</Box>
    );
}
