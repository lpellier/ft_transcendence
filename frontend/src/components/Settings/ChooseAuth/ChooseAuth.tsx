import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import { TFAButton } from './AuthButton'
import { ButtonStackStyle, Title } from '../../../styles/tsxStyles/Settings/Auth'
import { User } from 'interfaces'

export default function ChooseAuth(props: {user: User}) {
        return (
                <Stack spacing={5}>
                    <Typography sx={Title}>
                        Change Authentication
                    </Typography>
                    <Stack spacing={4} sx={ButtonStackStyle}>
                        <TFAButton user = {props.user}/>
                    </Stack>
                </Stack>
        );
}
