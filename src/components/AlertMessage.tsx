import { Snackbar, Alert } from "@mui/material";
import React, { useCallback } from "react";

interface AlertProps {
  status: "success" | "error";
  message: string;
  handleClose: () => void;
}

const AlertMessage: React.FC<AlertProps> = ({
  message,
  handleClose,
  status,
}) => {
  const renderAlertMessage = useCallback(
    () => (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={status}>{message}</Alert>
      </Snackbar>
    ),
    [message, handleClose, status]
  );

  return renderAlertMessage();
};

export default AlertMessage;
