import axios, { AxiosResponse } from "axios";

interface TodosRequestConfig {
  params: { _page: number; _limit: number };
}

interface ToggleTodoRequestConfig {
  completed: boolean;
}

export const getUserTodos = (
  userId: number,
  pageNumber: number,
  limit: number
): Promise<AxiosResponse<Todos[], TodosRequestConfig>> =>
  axios.get<Todos[], AxiosResponse<Todos[]>, TodosRequestConfig>(
    `/users/${userId}/todos`,
    {
      params: { _page: pageNumber, _limit: limit },
    }
  );

export const toggleCompleted = (
  id: number,
  completed: boolean
): Promise<AxiosResponse<Todos, ToggleTodoRequestConfig>> =>
  axios.patch<Todos, AxiosResponse<Todos>, ToggleTodoRequestConfig>(
    `/todos/${id}`,
    {
      completed: completed,
    }
  );
