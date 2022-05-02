import { Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 100,
        backgroundColor: "primary.main",
      }}
    >
      <Typography>Post and Todos App</Typography>
    </Box>
  );
};

export default Navbar;
