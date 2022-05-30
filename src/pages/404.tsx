import { Box, Button, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

const NotFound: React.FC = () => {
  const history = useHistory();
  const backToHome = useCallback(() => history.push("/"), [history]);

  return (
    <Box
      sx={{
        px: "2.5%",
        pt: 8,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="pageHeading">404 - Page Not Found</Typography>
      <Button
        variant="contained"
        sx={{
          p: 2,
          mt: 6,
          letterSpacing: "0.1rem",
          color: "background.paper",
          fontWeight: "bold",
          width: "fit-content",
        }}
        onClick={backToHome}
      >
        <Typography variant="buttonText">Back to home</Typography>
      </Button>
    </Box>
  );
};

export default NotFound;
