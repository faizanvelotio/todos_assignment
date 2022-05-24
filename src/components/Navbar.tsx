import { Box } from "@mui/material";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import logo from "src/assets/images/posts_and_todos_logo.png";

const Navbar = () => {
  const history = useHistory();

  const goToHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Box
      sx={{
        width: 1,
        height: "10vh",
        display: "flex",
        justifyContent: "center",
        borderBottom: 1,
        borderColor: "lightBorderLine",
      }}
    >
      <img
        src={logo}
        alt="Posts and Todos Logo"
        style={{ cursor: "pointer", height: "auto" }}
        onClick={goToHome}
      ></img>
    </Box>
  );
};

export default Navbar;
