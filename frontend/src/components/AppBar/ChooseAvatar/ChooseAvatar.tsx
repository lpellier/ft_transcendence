import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ChooseAvatarButton from './ChooseAvatarButton'
import DotsMobileStepper from './Stepper'

export default function AvatarList(){
        return (
                <Container>
                  <Stack spacing={2} style={{justifyContent: 'center'}}>
                    <DotsMobileStepper />
                	  <ChooseAvatarButton />
                  </Stack>
                </Container>
        );
}
