import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ChooseAvatarButton from './ChooseAvatarButton.tsx'

// Avatar importation
import {CactusAvatar, RobotAvatar, CoffeaAvatar, IceCreamAvatar,
	OwlAvatar, PenguinAvatar} from '../../Avatars.tsx'

function AvatarStack() {
  return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1} style={{justifyContent: 'center'}}>
              <CactusAvatar />
              <CoffeaAvatar />
              <IceCreamAvatar />
            </Stack>
            <Stack direction="row" spacing={1} style={{justifyContent: 'center'}}>
              <PenguinAvatar />
              <OwlAvatar />
              <RobotAvatar />
            </Stack>
        </Stack>
  );
}

export default class AvatarList extends React.Component {
    render() { 
        return (
                <Box>
                    <AvatarStack />
                	<ChooseAvatarButton />
                </Box>
        );
    }
}
