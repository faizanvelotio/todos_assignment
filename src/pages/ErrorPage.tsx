import React, { useCallback } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography, Button } from "@mui/material";

interface ErrorProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorProps> = ({ message = "Error" }) => {
  const reload = useCallback(() => window.location.reload(), []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <ErrorIcon sx={{ fontSize: 100, color: "error.light" }} />
      </Box>
      <Box
        my={2}
        sx={{
          fontFamily: "Open Sans",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {message}
      </Box>
      <Button
        variant="contained"
        sx={{
          color: "background.paper",
          fontWeight: "bold",
          width: "fit-content",
          letterSpacing: "0.1rem",
          p: 2,
          mt: 4,
        }}
        onClick={reload}
      >
        <Typography variant="buttonText">Try again</Typography>
      </Button>
    </Box>
  );
};

export default ErrorPage;
