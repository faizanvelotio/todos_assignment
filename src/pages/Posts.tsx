import { useLocation } from "react-router-dom";
import useApiHook from "../utils/useApiHook";
import { Post } from "../interfaces";

function Posts() {
    const location = useLocation();
    const userId: number = Number(location.pathname.split("/")[2]);
    const { data, isPending, error } = useApiHook<Post>(
        `/users/${userId}/posts`
    );

    return (
        <div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
            {data &&
                data.map((val: Post) => (
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
                        Body: {val.body}
                    </div>
                ))}
        </div>
    );
}

export default Posts;
