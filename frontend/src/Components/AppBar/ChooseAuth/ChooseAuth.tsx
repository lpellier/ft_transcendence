import React from "react";
import Stack from '@mui/material/Stack';

import {TFASwitch} from './AuthSwitch.tsx'
import {GoogleAuth} from './AuthSwitch.tsx'
import SMSInput from './SMSInput.tsx'

const AuthStyle = { textAlign: 'center', font: '1.2em "roboto", sans-serif' }

export default class ChooseAuth extends React.Component {
    render() { 
        return (
                <Stack spacing={2}>
                    <div style={AuthStyle}>
                        Authentication
                    </div>
                    <Stack spacing={1}>
                        <TFASwitch />
                        <GoogleAuth />
                        <SMSInput/>
                    </Stack>
                </Stack>
        );
    }
}
