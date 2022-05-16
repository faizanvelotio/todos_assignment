import React, { useCallback } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography, Button } from "@mui/material";

interface ErrorProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorProps> = ({ message = "Error" }) => {
  const reload = useCallback(() => window.location.reload(), []);

  const renderDisplayError = useCallback(
    () => (
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
          sx={{
            fontFamily: "Open Sans",
            fontSize: "2rem",
            margin: "1rem 0",
            fontWeight: "bold",
          }}
        >
          {message}
        </Box>
        <Button
          variant="contained"
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            width: "fit-content",
            letterSpacing: "0.1rem",
            padding: "1rem",
            marginTop: "2rem",
          }}
          onClick={reload}
        >
          <Typography variant="buttonText">Try again</Typography>
        </Button>
      </Box>
    ),
    [reload, message]
  );

  return renderDisplayError();
};

export default ErrorPage;