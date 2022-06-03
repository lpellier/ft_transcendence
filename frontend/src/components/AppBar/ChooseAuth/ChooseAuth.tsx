import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'

import {TFASwitch} from './AuthSwitch'
import {GoogleAuth} from './AuthSwitch'
import SMSInput from './SMSInput'

import { ButtonStackStyle, Title } from '../../../styles/tsxStyles/AppBar/AuthStyle'

export default function ChooseAuth() {
        return (
                <Stack spacing={5}>
                    <Typography sx={Title}>
                        Change Authentication
                    </Typography>
                    <Stack spacing={4} sx={ButtonStackStyle}>
                        <TFASwitch />
                        <GoogleAuth />
                        <SMSInput/>
                    </Stack>
                </Stack>
        );
}
