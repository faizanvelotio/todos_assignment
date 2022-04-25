import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import useApiHook from "../utils/useApiHook";
import useLocationId from "../utils/useLocationId";
import { Todos } from "../interfaces";
import { UserContentContext } from "../context/UserContentContext";

function UserTodos() {
    const userId: number = useLocationId();
    const [isLoading, setIsLoading] = useState(true);

    const { state, dispatch } = useContext(UserContentContext);
    const { user_todos } = state;

    useEffect(() => {
        // If the posts in the state is of different user, then update the state,
        // else update render with the same state
        // console.log("from TODOS useeffect");
        if (userId !== user_todos.userId) {
            axios
                .get(`/users/${userId}/todos`)
                .then((response) => {
                    dispatch({
                        type: "SET_TODOS",
                        payload: { userId: userId, todos: response.data },
                    });
                    setIsLoading(false);
                })
                .catch((err) => {});
        } else {
            setIsLoading(false);
        }
    }, [userId, user_todos, dispatch]);

    return (
        <div>
            <div style={{ marginTop: "20px" }}>
                <Link to={`/users/${userId}/posts`}>
                    <button>Go to Posts</button>
                </Link>
            </div>
            {/* {error && <div>{error.message}</div>} */}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h1 style={{ textAlign: "center" }}>Todos</h1>
                    {user_todos.todos &&
                        user_todos.todos.map((val: Todos) => (
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
                </>
            )}
        </div>
    );
}

export default UserTodos;
