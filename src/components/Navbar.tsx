import { Box } from "@mui/material";
import logo from "src/static/images/posts_and_todos_logo.png";

const Navbar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "10vh",
        display: "flex",
        justifyContent: "center",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <img
        src={logo}
        alt="Posts and Todos Logo"
        style={{ cursor: "pointer" }}
      ></img>
    </Box>
  );
};

export default Navbar;
