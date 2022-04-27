import axios from "axios";

export const getUsers = (): Promise<User[]> => axios.get(`/users`);
