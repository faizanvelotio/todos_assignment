import { useLocation } from "react-router-dom";
import useApiHook from "../utils/useApiHook";
import { Todos } from "../interfaces";

function UserTodos() {
    const location = useLocation();
    const userId: number = Number(location.pathname.split('/')[2]);
  const { data, isPending, error } = useApiHook<Todos>(`/users/${userId}/posts`);

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {data &&
        data.map((val: Todos) => (
          <div
            key={val.id}
            style={{
              minHeight: "30px",
              margin: "20px",
              padding: "30px",
            //   cursor: "pointer",
              border: "1px solid black",
            }}
          >
            Title: {val.title}
            <br />
            <br />
            Completed: {val.completed ? "Yes" : "No"}
          </div>
        ))}
    </div>
  );
}

export default UserTodos;
