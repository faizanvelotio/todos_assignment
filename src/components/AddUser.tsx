import { IconButton, Paper, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const AddUser: React.FC = () => {
  const history = useHistory();
  const addUser = useCallback(() => history.push("/createuser"), [history]);

  return (
    <Paper
      elevation={4}
      sx={{
        padding: "1rem 2.5%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <IconButton onClick={addUser}>
        <AddIcon sx={{ fontSize: 60, color: "primary.main" }} />
      </IconButton>
      <Typography>Add New User</Typography>
    </Paper>
  );
};

export default AddUser;
