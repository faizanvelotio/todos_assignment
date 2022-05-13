import { useCallback, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";

import { getUsers } from "src/api/User";
import { UserContentContext } from "src/context/UserContentContext";
import { ActionType } from "src/types/ActionTypes";
import UserCard from "src/components/UserCard";
import AddUser from "src/components/AddUser";
import ErrorPage from "src/pages/ErrorPage";
import { useLocation } from "react-router-dom";
import AlertMessage from "src/components/AlertMessage";

function Users() {
  const location = useLocation<LocationPropsForMsg>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleAlertClose = useCallback(() => setMessage(""), []);

  useEffect(() => {
    if (users === null) {
      fetchUsers();
    } else {
      setIsLoading(false);
    }
  }, [fetchUsers, users]);

  // For displaying the success message only one time
  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const renderUsers = useCallback(
    () => (
      <Box
        sx={{
          padding: "1rem 2.5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {error ? (
          <ErrorPage />
        ) : (
          <>
            <Typography
              variant="pageHeading"
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
              {isLoading ? (
                <CircularProgress />
              ) : (
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
                )
              )}
            </Box>
          </>
        )}
      </Box>
    ),
    [users, error, isLoading]
  );

  const renderAlert = useCallback(
    () => (
      <AlertMessage
        message={message}
        status={"success"}
        handleClose={handleAlertClose}
      />
    ),
    [message, handleAlertClose]
  );

  return (
    <>
      {renderUsers()}
      {renderAlert()}
    </>
  );
}

export default Users;
