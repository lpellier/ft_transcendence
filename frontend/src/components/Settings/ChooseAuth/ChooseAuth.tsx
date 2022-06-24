import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import { TFAButton } from './AuthButton'
import { ButtonStackStyle, Title } from '../../../styles/tsxStyles/Settings/Auth'

export default function ChooseAuth() {
        return (
                <Stack spacing={5}>
                    <Typography sx={Title}>
                        Change Authentication
                    </Typography>
                    <Stack spacing={4} sx={ButtonStackStyle}>
                        <TFAButton />
                    </Stack>
                </Stack>
        );
}
