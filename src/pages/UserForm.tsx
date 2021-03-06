import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useFormik, FormikProps } from "formik";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

import Input from "src/components/Input";
import getLocationId from "src/utils/getLocationId";
import AlertMessage from "src/components/AlertMessage";
import useFetchUser from "src/utils/useFetchUser";
import { userValidator } from "src/utils/validators";
import { UserContentContext } from "src/context/UserContentContext";
import { setUser, updateUser } from "src/api/User";
import { ActionType } from "src/types/ActionTypes";

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
  const [error, setError] = useState<string>("");
  const [disabled, setDisabled] = useState(false);
  const { state, dispatch } = useContext(UserContentContext);
  const { currentUser } = state;
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
    validationSchema: userValidator,
  });
  const { setValues } = formik;

  const saveEditChanges = useCallback(
    async (user: User) => {
      try {
        setDisabled(true);
        const response: AxiosResponse<User, UserWithoutID> = await updateUser(
          user
        );
        dispatch({ type: ActionType.UPDATE_USER, payload: response.data });
        history.push("/users", {
          message: `${user.name}'s profile updated successfully`,
        });
      } catch (e) {
        setDisabled(false);
        setError("Unable to update at the moment");
      }
    },
    [history, dispatch]
  );

  const createUser = useCallback(
    async (user: UserWithoutID) => {
      try {
        setDisabled(true);
        const response: AxiosResponse<User, UserWithoutID> = await setUser(
          user
        );
        dispatch({ type: ActionType.ADD_USER, payload: response.data });
        history.push("/users", {
          message: "User created successfully!",
        });
      } catch (e) {
        setDisabled(false);
        setError("Unable to create user");
      }
    },
    [history, dispatch]
  );

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
            <Input formik={formik} label="Name" name="name" required={true} />
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
            <Input formik={formik} label="Email" name="email" required={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input formik={formik} label="Phone" name="phone" required={true} />
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
            <Input formik={formik} label="Company Name" name="company.name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              formik={formik}
              label="CatchPhrase"
              name="company.catchPhrase"
            />
          </Grid>
          <Grid item xs={12}>
            <Input formik={formik} label="Business Slogan" name="company.bs" />
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
              my: 6,
              mx: "auto",
              color: "background.paper",
              fontWeight: "bold",
              width: "fit-content",
              alignSelf: "center",
            }}
            disabled={disabled}
            type="submit"
          >
            <Typography variant="buttonText">
              {edit ? "Save Changes" : "Submit"}
            </Typography>
          </Button>
        </Grid>
      </form>
    );
  }, [edit, disabled, formik]);

  const renderErrorMessage = useCallback(
    () => (
      <AlertMessage
        message={error}
        status={"error"}
        handleClose={() => setError("")}
      />
    ),
    [error]
  );

  return (
    <>
      <Box py={2} px={"2.5%"} display={"flex"} flexDirection={"column"}>
        <Typography variant="pageHeading" m={"auto"}>
          {edit ? "Edit User" : "Create User"}
        </Typography>
        <Box
          mt={3}
          sx={(theme) => ({
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: {
              xs: 1,
              sm: theme.breakpoints.values.sm,
              md: theme.breakpoints.values.md,
              lg: theme.breakpoints.values.lg,
            },
          })}
        >
          {renderUserForm()}
        </Box>
      </Box>

      {renderErrorMessage()}
    </>
  );
};

export default UserForm;
