import axios, { AxiosResponse } from "axios";

export const getUserTodos = (userId: number): Promise<AxiosResponse<Todos[]>> =>
  axios.get(`/users/${userId}/todos`);
