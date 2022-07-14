import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AvatarList from "./ChooseAvatar/ChooseAvatar";
import ChooseName from "./ChooseName/ChooseName";
import ChooseAuth from "./ChooseAuth/ChooseAuth";

const SettingStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Settings() {
  return (
    <Box sx={SettingStyle}>
      <Stack spacing={5}>
        <AvatarList />
        <ChooseName />
        <ChooseAuth />
      </Stack>
    </Box>
  );
}
