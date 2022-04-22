// import { useEffect } from "react";
import useApiHook from "../utils/useApiHook";
import { User } from "../interfaces";
import { useHistory } from "react-router-dom";

function Users() {
    const { data, isPending, error } = useApiHook<User>("/users");
    const history = useHistory();

    return (
        <div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
            {data &&
                data.map((val: User) => (
                    <div
                        key={val.id}
                        style={{
                            height: "24px",
                            margin: "10px",
                            padding: "10px",
                            cursor: "pointer",
                            border: "1px solid black",
                        }}
                        onClick={() => {
                            history.push(`/users/${val.id}/posts`);
                        }}
                    >
                        {val.name}
                    </div>
                ))}
        </div>
    );
}

export default Users;
