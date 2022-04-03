import React from "react";
import Stack from '@mui/material/Stack';

import {TFASwitch} from './AuthSwitch'
import {GoogleAuth} from './AuthSwitch'
import SMSInput from './SMSInput'

const AuthStyle = { textAlign: 'center', font: '1.2em "roboto", sans-serif' }

export default class ChooseAuth extends React.Component {
    render() { 
        return (
                <Stack spacing={2}>
                    {/* <div style={AuthStyle}> */}
                    <div>
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
