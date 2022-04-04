import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Stack from '@mui/material/Stack';

import {AvatarStackOne, AvatarStackTwo, AvatarStackThree} from './AvatarStacks'


const steps = [
    {
        content: <AvatarStackOne/>
    },
    {
        content: <AvatarStackTwo/>
    },
    {
        content: <AvatarStackThree/>
    },
];


export default function DotsMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack>
    < MobileStepper
      variant="dots"
      steps={3}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
          Next
          {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
          ) : (
              <KeyboardArrowRight />
              )}
        </Button>
      }
      backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
            ) : (
                <KeyboardArrowLeft />
                )}
          Back
        </Button>
      }
      />
      {steps[activeStep].content}
    </Stack>
  );
}
