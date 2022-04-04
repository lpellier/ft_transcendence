import Stack from '@mui/material/Stack';

import {CactusAvatar, RobotAvatar, CoffeaAvatar, IceCreamAvatar,
	OwlAvatar, PenguinAvatar,
    PandaAvatar, FoxAvatar, CatAvatar, DogAvatar,
    HambeargurAvatar, RamenAvatar,
    TacosAvatar, PenmericanAvatar} from '../../Avatars'

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
                <CactusAvatar />
              </Stack>
              <Stack direction="row" spacing={1}>
                <CactusAvatar />
                <CactusAvatar />
                <CactusAvatar />
              </Stack>
          </Stack>
    );
  }

export {AvatarStackOne, AvatarStackTwo, AvatarStackThree}