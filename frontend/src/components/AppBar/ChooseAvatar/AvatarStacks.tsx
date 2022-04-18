import Stack from '@mui/material/Stack';

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

export {AvatarStackOne, AvatarStackTwo, AvatarStackThree}