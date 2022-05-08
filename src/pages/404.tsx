import { Box, Button, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

const NotFound: React.FC = () => {
  const history = useHistory();
  const backToHome = useCallback(() => history.push("/"), [history]);

  return (
    <Box
      sx={{
        padding: "4rem 2.5% 1rem 2.5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="pageHeading">404 - Page Not Found</Typography>
      <Button
        variant="contained"
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
          width: "fit-content",
          letterSpacing: "0.1rem",
          padding: "1rem",
          marginTop: "3rem",
        }}
        onClick={backToHome}
      >
        <Typography>Back to home</Typography>
      </Button>
    </Box>
  );
};

export default NotFound;
