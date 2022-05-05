import axios, { AxiosResponse } from "axios";

export const getUsers = (): Promise<AxiosResponse<User[]>> =>
  axios.get<User[]>(`/users`);
