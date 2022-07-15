import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{paddingTop:"20vh"}}>
      <Typography variant="h2" color="white" textAlign={"center"}>404</Typography>
      <Typography variant="body1" color="white" textAlign={"center"}>Page not found</Typography>
    </Box>
  );
}
