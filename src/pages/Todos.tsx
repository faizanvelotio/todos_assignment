import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AxiosResponse } from "axios";
import { useInView } from "react-intersection-observer";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { UserContentContext } from "src/context/UserContentContext";
import getLocationId from "src/utils/getLocationId";
import { getUserTodos } from "src/api/Todos";
import { ActionType } from "src/types/ActionTypes";
import TabSwitch from "src/components/TabSwitch";
import ErrorPage from "src/pages/ErrorPage";
import Todo from "src/components/Todo";

const UserTodos: React.FC = () => {
  const [error, setError] = useState(false);
  const userId: number = getLocationId();
  const { state, dispatch } = useContext(UserContentContext);
  const { userTodos } = state;
  const moreTodos: boolean = useMemo(
    () => !(userId === userTodos.userId && userTodos.complete),
    [userId, userTodos.userId, userTodos.complete]
  );

  // For intersection observer
  const [pageNumber, setPageNumber] = useState<number>(
    userId !== userTodos.userId ? 1 : userTodos.page
  );
  const [inViewRef, inView] = useInView({ threshold: 1 });

  const fetchUserTodos = useCallback(
    async (userId: number, pageNumber: number) => {
      try {
        const response: AxiosResponse<Todos[]> = await getUserTodos(
          userId,
          pageNumber,
          5
        );
        dispatch({
          type: ActionType.SET_TODOS,
          payload: {
            userId: userId,
            todos: response.data,
            pageNumber: pageNumber + 1,
          },
        });
      } catch (e) {
        setError(true);
      }
    },
    [dispatch]
  );

  // When the element is in view, update the page number and
  // fetch new elements
  useEffect(() => {
    if (inView && !userTodos.complete) {
      setPageNumber((prev) => prev + 1);
    }
  }, [inView, userTodos.complete]);

  useEffect(() => {
    // If the todos in the state is of different user, then update the state,
    // else update render with the same state
    if (moreTodos) {
      fetchUserTodos(userId, pageNumber);
    }
  }, [userId, moreTodos, fetchUserTodos, pageNumber]);

  const renderUserTodos = useCallback((): JSX.Element => {
    return (
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        spacing={5}
      >
        {userTodos.todos &&
          userTodos.todos.map((todo: Todos, idx: number) => (
            <Box
              ref={userTodos.todos.length === idx + 1 ? inViewRef : null}
              key={todo.id}
              onClick={() => {}}
              sx={(theme) => ({
                width: {
                  xs: 1,
                  sm: theme.breakpoints.values.sm,
                  md: theme.breakpoints.values.md,
                  lg: theme.breakpoints.values.lg,
                },
              })}
            >
              <Todo todo={todo} idx={idx} />
            </Box>
          ))}
        {!userTodos.complete && (
          <Box my={4} display={"flex"} justifyContent={"center"}>
            <CircularProgress />
          </Box>
        )}
        {userTodos.complete && userTodos.todos.length === 0 && (
          <Box my={4} display={"flex"} justifyContent={"center"}>
            <Typography variant="body1" fontWeight={"bold"}>
              <Box fontStyle={"italic"} component="span">
                Chillaaax!
              </Box>{" "}
              NOTHING TODO
            </Typography>
          </Box>
        )}
      </Stack>
    );
  }, [userTodos.complete, userTodos.todos, inViewRef]);

  return (
    <Box py={2} px={"2.5%"} display={"flex"} flexDirection={"column"}>
      <TabSwitch userId={userId} currentActive={"todos"} />
      {error ? (
        <ErrorPage />
      ) : (
        <>
          <Typography variant="pageHeading" mt={2} mb={4} mx={"auto"}>
            Todos
          </Typography>
          {renderUserTodos()}
        </>
      )}
    </Box>
  );
};

export default UserTodos;
