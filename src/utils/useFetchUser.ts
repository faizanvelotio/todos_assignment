import { AxiosResponse } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { getUser } from "src/api/User";
import { UserContentContext } from "src/context/UserContentContext";
import { ActionType } from "src/types/ActionTypes";

const useFetchUser = (userId: number | null): boolean => {
  const [success, setSuccess] = useState<boolean>(false);
  const { state, dispatch } = useContext(UserContentContext);
  const { currentUser } = state;

  const fetchUser = useCallback(
    async (userId: number) => {
      try {
        const response: AxiosResponse<User> = await getUser(userId);
        dispatch({ type: ActionType.SET_CURRENT_USER, payload: response.data });
        setSuccess(true);
      } catch (e) {
        setSuccess(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (userId === null || currentUser.id === userId) {
      setSuccess(true);
    } else if (currentUser.id !== userId) {
      fetchUser(userId);
    }
  }, [currentUser, userId, fetchUser]);

  return success;
};

export default useFetchUser;
