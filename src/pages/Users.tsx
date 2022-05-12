import { useCallback, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import { getUsers } from "src/api/User";
import { UserContentContext } from "src/context/UserContentContext";
import { ActionType } from "src/types/ActionTypes";
import UserCard from "src/components/UserCard";
import AddUser from "src/components/AddUser";
import DisplayError from "src/pages/DisplayError";
import { useLocation } from "react-router-dom";

interface LocationProps {
  message: string;
}

function Users() {
  const location = useLocation<LocationProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

  const renderSnackbar = useCallback(
    () => (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>
    ),
    [message]
  );

  return (
    <>
      <Box
        sx={{
          padding: "1rem 2.5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {error ? (
          <DisplayError />
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
              {isLoading ? <CircularProgress /> : renderUsers()}
            </Box>
          </>
        )}
      </Box>
      {renderSnackbar()}
    </>
  );
}

export default Users;
