import axios from "axios";

export const getUserTodos = (userId: number): Promise<Todos[]> =>
    axios.get(`/users/${userId}/todos`);
