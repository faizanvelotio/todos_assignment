import React, { useState, useCallback, useContext } from "react";
import { Box, Checkbox, Paper, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { toggleCompleted } from "src/api/Todos";
import { UserContentContext } from "src/context/UserContentContext";
import { ActionType } from "src/types/ActionTypes";

interface TodoProps {
  idx: number;
  todo: Todos;
}

const Todo: React.FC<TodoProps> = ({ todo, idx }) => {
  const { dispatch } = useContext(UserContentContext);
  const [checked, setChecked] = useState<boolean>(todo.completed);
  const handleChange = useCallback(async () => {
    try {
      setChecked(!todo.completed);
      const response: AxiosResponse<Todos> = await toggleCompleted(
        todo.id,
        !todo.completed
      );
      if (response.statusText === "OK") {
        dispatch({
          type: ActionType.TOGGLE_TODO,
          payload: { idx: idx, completed: !todo.completed },
        });
      }
    } catch (e) {
      setChecked(todo.completed);
    }
  }, [todo, idx, dispatch]);

  return (
    <Paper
      elevation={checked ? 2 : 4}
      sx={{
        padding: "1.5rem 3%",
        position: "relative",
        cursor: "pointer",
        bgcolor: checked ? "#FAFAFA" : "background.paper",
      }}
      onClick={handleChange}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          component="div"
          sx={{
            width: "90%",
            textDecoration: checked ? "line-through" : null,
          }}
        >
          {todo.title}
        </Typography>
        <Checkbox
          aria-label="Check Todos"
          checked={checked}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
        />
      </Box>
    </Paper>
  );
};

export default Todo;
