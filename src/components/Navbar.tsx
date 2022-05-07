import { Box } from "@mui/material";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import logo from "src/assets/images/posts_and_todos_logo.png";

const Navbar = () => {
  const history = useHistory();

  const goToHome = useCallback(() => {
    history.push("/");
  }, [history]);

  const renderNavbar = useCallback(
    () => (
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
          style={{ cursor: "pointer", height: "auto" }}
          onClick={() => goToHome()}
        ></img>
      </Box>
    ),
    [goToHome]
  );

  return renderNavbar();
};

export default Navbar;
