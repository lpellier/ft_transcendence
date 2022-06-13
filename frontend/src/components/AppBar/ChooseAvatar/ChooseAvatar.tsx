import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ChooseAvatarButton from './ChooseAvatarButton'
import DotsMobileStepper from './Stepper'

import {User} from 'interfaces'

export default function AvatarList(props: {user: User}){
        return (
                <Container>
                  <Stack spacing={2} style={{justifyContent: 'center'}}>
                        <DotsMobileStepper />
                        <ChooseAvatarButton user={props.user}/>
                  </Stack>
                </Container>
        );
}
