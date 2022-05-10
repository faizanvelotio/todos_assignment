import axios, { AxiosResponse } from "axios";

export const getUsers = (): Promise<AxiosResponse<User[]>> =>
  axios.get<User[]>(`/users`);

export const getUser = (userId: number): Promise<AxiosResponse<User>> =>
  axios.get<User>(`/users/${userId}`);
