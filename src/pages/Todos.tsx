import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContentContext } from "src/context/UserContentContext";
import getLocationId from "src/utils/getLocationId";
import { getUserTodos } from "src/api/Todos";
import { ActionType } from "src/types/ActionTypes";
import { AxiosResponse } from "axios";

const UserTodos: React.FC = () => {
  const userId: number = getLocationId();
  const [isLoading, setIsLoading] = useState(true);

  const { state, dispatch } = useContext(UserContentContext);
  const { userTodos } = state;

  const fetchUserTodos = useCallback(
    async (userId: number) => {
      try {
        const response: AxiosResponse<Todos[]> = await getUserTodos(userId);
        dispatch({
          type: ActionType.SET_TODOS,
          payload: { userId: userId, todos: response.data },
        });
      } catch (e) {
        // Showing the error using toast
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // If the posts in the state is of different user, then update the state,
    // else update render with the same state
    if (userId !== userTodos.userId) {
      fetchUserTodos(userId);
    } else {
      setIsLoading(false);
    }
  }, [userId, userTodos, fetchUserTodos]);

  const renderUserTodos = useCallback((): JSX.Element => {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Todos</h1>
        {userTodos.todos &&
          userTodos.todos.map((todo: Todos) => (
            <div
              key={todo.id}
              style={{
                minHeight: "30px",
                margin: "20px",
                padding: "30px",
                cursor: "pointer",
                border: "1px solid black",
              }}
            >
              Title: {todo.title}
              <br />
              <br />
              Completed: {todo.completed ? "Yes" : "No"}
            </div>
          ))}
      </>
    );
  }, [userTodos]);

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <Link to={`/users/${userId}/posts`}>
          <button>Go to Posts</button>
        </Link>
      </div>
      {/* {error && <div>{error.message}</div>} */}
      {isLoading ? <div>Loading...</div> : renderUserTodos()}
    </div>
  );
};

export default UserTodos;
