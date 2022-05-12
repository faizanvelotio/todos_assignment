import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import { useFormik, FormikProps } from "formik";
import { useCallback, useContext, useEffect, useState } from "react";
import Input from "src/pages/Input";
import getLocationId from "src/utils/getLocationId";
import validator from "src/utils/validator";
import useFetchUser from "src/utils/useFetchUser";
import { UserContentContext } from "src/context/UserContentContext";
import { setUser, updateUser } from "src/api/User";
import { AxiosResponse } from "axios";
import { ActionType } from "src/types/ActionTypes";
import { useHistory } from "react-router-dom";

interface UserFormProps {
  edit: boolean;
}

const isUser = (x: User | UserWithoutID): x is User => "id" in x;

const userInitialValues: UserWithoutID = {
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
  phone: "",
  website: "",
};

const UserForm: React.FC<UserFormProps> = ({ edit }) => {
  const history = useHistory();
  const userId = getLocationId();
  const success = useFetchUser(userId !== -Infinity ? userId : null);
  const [error, setError] = useState<string | null>(null);
  const { state, dispatch } = useContext(UserContentContext);
  const { currentUser } = state;

  const saveEditChanges = useCallback(
    async (user: User) => {
      try {
        const response: AxiosResponse<User, UserWithoutID> = await updateUser(
          user
        );
        dispatch({ type: ActionType.UPDATE_USER, payload: response.data });
        history.push(`/users`, {
          message: `${user.name}'s profile updated successfully`,
        });
      } catch (e) {
        setError("Unable to update at the moment");
      }
    },
    [history, dispatch]
  );

  const createUser = useCallback(
    async (user: UserWithoutID) => {
      try {
        const response: AxiosResponse<User, UserWithoutID> = await setUser(
          user
        );
        dispatch({ type: ActionType.ADD_USER, payload: response.data });
        history.push("/users", {
          message: "User created successfully!",
        });
      } catch (e) {
        setError("Unable to create user");
      }
    },
    [history, dispatch]
  );

  const formik: FormikProps<User | UserWithoutID> = useFormik<
    User | UserWithoutID
  >({
    initialValues: userInitialValues,
    onSubmit: (values: UserWithoutID | User) => {
      if (isUser(values)) {
        saveEditChanges(values);
      } else {
        createUser(values);
      }
    },
    validationSchema: validator,
  });

  const { setValues } = formik;

  useEffect(() => {
    if (success && edit) {
      setValues(currentUser, true);
    }
  }, [success, edit, currentUser, setValues]);

  const renderUserForm = useCallback(() => {
    const subHeadingStyles = {
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "0.05rem",
      color: "primary.main",
    };
    return (
      <Box
        sx={{
          padding: "1rem 2.5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="pageHeading"
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {edit ? "Edit User" : "Create User"}
        </Typography>
        <Box
          width={{
            lg: "1200px",
            md: "800px",
            sm: "600px",
            xs: "90%",
          }}
          sx={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: "1.5rem",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              columnSpacing={{ sm: 2, md: 3, lg: 8 }}
              rowSpacing={{ xs: 2, lg: 3 }}
            >
              <Grid item xs={12}>
                <Typography sx={{ ...subHeadingStyles }}>
                  Personal Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  formik={formik}
                  label="Name"
                  name="name"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  formik={formik}
                  label="Username"
                  name="username"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  formik={formik}
                  label="Email"
                  name="email"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  formik={formik}
                  label="Phone"
                  name="phone"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input formik={formik} label="Website" name="website" />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    ...subHeadingStyles,
                    marginTop: "1rem",
                  }}
                >
                  Company Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  formik={formik}
                  label="Company Name"
                  name="company.name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  formik={formik}
                  label="CatchPhrase"
                  name="company.catchPhrase"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  formik={formik}
                  label="Business Slogan"
                  name="company.bs"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    ...subHeadingStyles,
                    marginTop: "1rem",
                  }}
                >
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input formik={formik} label="Street" name="address.street" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input formik={formik} label="Suite" name="address.suite" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input formik={formik} label="City" name="address.city" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input formik={formik} label="Zipcode" name="address.zipcode" />
              </Grid>
              <Button
                variant="contained"
                sx={{
                  margin: "3rem auto",
                  color: "#ffffff",
                  fontWeight: "bold",
                  width: "fit-content",
                  alignSelf: "center",
                }}
                type="submit"
              >
                <Typography variant="buttonText">
                  {edit ? "Save Changes" : "Submit"}
                </Typography>
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    );
  }, [edit, formik]);

  const renderErrorMessage = useCallback(
    () => (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    ),
    [error]
  );

  return (
    <>
      {renderUserForm()}
      {renderErrorMessage()}
    </>
  );
};

export default UserForm;
