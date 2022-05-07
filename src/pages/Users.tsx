import { useCallback, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";

import { getUsers } from "src/api/User";
import { UserContentContext } from "src/context/UserContentContext";
import { ActionType } from "src/types/ActionTypes";
import UserCard from "src/components/UserCard";
import AddUser from "src/components/AddUser";
import DisplayError from "src/pages/DisplayError";

function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(UserContentContext);
  const { users } = state;

  const fetchUsers = useCallback(async () => {
    try {
      const response: AxiosResponse<User[]> = await getUsers();
      dispatch({ type: ActionType.SET_USERS, payload: response.data });
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (users === null) {
      fetchUsers();
    } else {
      setIsLoading(false);
    }
  }, [fetchUsers, users]);

  const renderUsers = useCallback(
    () =>
      users && (
        <Grid container spacing={{ xs: 4, md: 3, xl: 5 }}>
          {users.map((user: User) => (
            <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
              <UserCard user={user} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AddUser />
          </Grid>
        </Grid>
      ),
    [users]
  );

  return (
    <Box
      sx={{
        padding: "1rem 2.5%",
        display: "flex",
        color: "#393D46",
        flexDirection: "column",
      }}
    >
      {error ? (
        <DisplayError />
      ) : (
        <>
          <Typography
            variant="mainPageHeading"
            sx={{ marginLeft: "auto", marginRight: "auto" }}
          >
            Users
          </Typography>
          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isLoading ? <CircularProgress /> : renderUsers()}
          </Box>
        </>
      )}
    </Box>
  );
}

export default Users;
