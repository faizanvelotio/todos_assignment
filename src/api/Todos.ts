import { AxiosResponse } from "axios";
import axios from "src/api/axiosConfig";

interface TodosRequestConfig {
  params: { _page: number; _limit: number };
}

interface ToggleTodoRequestConfig {
  completed: boolean;
  signal?: AbortSignal;
}

export const getUserTodos = (
  userId: number,
  pageNumber: number,
  limit: number
): Promise<AxiosResponse<Todos[], TodosRequestConfig>> =>
  axios.get<
    Todos[],
    AxiosResponse<Todos[], TodosRequestConfig>,
    TodosRequestConfig
  >(`/users/${userId}/todos`, {
    params: { _page: pageNumber, _limit: limit },
  });

export const toggleCompleted = (
  id: number,
  completed: boolean,
  signal: AbortSignal
): Promise<AxiosResponse<Todos, ToggleTodoRequestConfig>> =>
  axios.patch<
    Todos,
    AxiosResponse<Todos, ToggleTodoRequestConfig>,
    ToggleTodoRequestConfig
  >(
    `/todos/${id}`,
    {
      completed: completed,
    },
    {
      signal: signal,
    }
  );
