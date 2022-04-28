import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUsers } from "src/api/User";
import { UserContentContext } from "src/context/UserContentContext";
import { ActionType } from "src/ActionTypes";
import { AxiosResponse } from "axios";
function Users() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const { state, dispatch } = useContext(UserContentContext);
  const { users } = state;
  const fetchUsers = useCallback(async () => {
    try {
      const response: AxiosResponse<User[]> = await getUsers();
      dispatch({ type: ActionType.SET_USERS, payload: response.data });
    } catch (e) {
      // Toastify the error
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const handleUserClick = useCallback(
    (userId: number) => {
      history.push(`users/${userId}/posts`);
    },
    [history]
  );

  useEffect(() => {
    if (users === null) {
      fetchUsers();
    } else {
      setIsLoading(false);
    }
  }, [fetchUsers, users]);

  const renderUsers = useCallback(
    () =>
      users
        ? users.map((user: User) => (
            <div
              key={user.id}
              style={{
                height: "24px",
                margin: "10px",
                padding: "10px",
                cursor: "pointer",
                border: "1px solid black",
              }}
              onClick={() => handleUserClick(user.id)}
            >
              {user.name}
            </div>
          ))
        : null,
    [users, handleUserClick]
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {users && <h1 style={{ textAlign: "center" }}>Users</h1>}
      {renderUsers()}
    </div>
  );
}

export default Users;
