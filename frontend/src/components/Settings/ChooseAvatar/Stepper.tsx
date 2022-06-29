import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react'
import { orangeTheme } from '../../Themes';
import {CactusAvatar, RobotAvatar, CoffeaAvatar, IceCreamAvatar,
	OwlAvatar, PenguinAvatar,
    PandaAvatar, FoxAvatar, CatAvatar, DogAvatar,
    HambeargurAvatar, RamenAvatar, TacosAvatar, PenmericanAvatar,
    MouseAvatar, PteroAvatar, EasterEggAvatar, SlothAvatar
} from '../../Avatars'

function AvatarStackOne() {
  return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <CactusAvatar />
              <CoffeaAvatar />
              <IceCreamAvatar />
            </Stack>
            <Stack direction="row" spacing={1}>
              <PenguinAvatar />
              <OwlAvatar />
              <RobotAvatar />
            </Stack>
        </Stack>
  );
}

function AvatarStackTwo() {
    return (
          <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <PandaAvatar />
                <FoxAvatar />
                <CatAvatar />
              </Stack>
              <Stack direction="row" spacing={1}>
                <DogAvatar />
                <HambeargurAvatar />
                <PenmericanAvatar />
              </Stack>
          </Stack>
    );
  }

  function AvatarStackThree() {
    return (
          <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <TacosAvatar />
                <RamenAvatar />
                <PteroAvatar />
              </Stack>
              <Stack direction="row" spacing={1}>
                <SlothAvatar />
                <MouseAvatar />
                <EasterEggAvatar />
              </Stack>
          </Stack>
    );
  }

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
    <Stack spacing={2}>
    <ThemeProvider theme={orangeTheme}>
    < MobileStepper
      variant="dots"
      steps={3}
      position="static"
      activeStep={activeStep}
      style={{ backgroundColor: "transparent" }}
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
      </ThemeProvider>
      {steps[activeStep].content}
    </Stack>
  );
}
