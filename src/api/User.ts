import { AxiosResponse } from "axios";
import axios from "src/api/axiosConfig";

export const getUsers = (): Promise<AxiosResponse<User[]>> =>
  axios.get<User[]>("/users");

export const getUser = (userId: number): Promise<AxiosResponse<User>> =>
  axios.get<User>(`/users/${userId}`);

export const setUser = (
  user: UserWithoutID
): Promise<AxiosResponse<User, UserWithoutID>> =>
  axios.post<User, AxiosResponse<User, UserWithoutID>, UserWithoutID>(
    "/users",
    user
  );

export const updateUser = (user: User): Promise<AxiosResponse<User, User>> =>
  axios.put<User, AxiosResponse<User, User>, User>(`/users/${user.id}`, user);
