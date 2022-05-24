import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
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
  const abortControllerRef: MutableRefObject<AbortController> =
    useRef<AbortController>(new AbortController());

  const handleChange = useCallback(async () => {
    try {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      setChecked((prev) => !prev);
      const response: AxiosResponse<Todos> = await toggleCompleted(
        todo.id,
        !todo.completed,
        abortControllerRef.current.signal
      );
      dispatch({
        type: ActionType.TOGGLE_TODO,
        payload: { idx: idx, completed: response.data.completed },
      });
    } catch (e: any) {
      if (e.message === "canceled") {
        setChecked((prev) => !prev);
      }
    }
  }, [todo.completed, todo.id, idx, dispatch]);

  useEffect(() => {
    setChecked(todo.completed);
  }, [todo.completed]);

  const renderTodo = useCallback(
    () => (
      <Paper
        elevation={checked ? 2 : 4}
        sx={{
          py: 3,
          px: "3%",
          position: "relative",
          cursor: "pointer",
          bgcolor: checked ? "lightGrayBG" : "background.paper",
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
              width: 0.9,
              textDecoration: checked ? "line-through" : null,
              userSelect: "none",
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
    ),
    [checked, handleChange, todo.title]
  );

  return renderTodo();
};

export default Todo;
