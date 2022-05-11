import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import Input from "src/pages/Input";
import { validator } from "src/utils/validator";

interface UserFormProps {
  edit: boolean;
}

const userInitialValues: UserWithoutID = {
  name: "maasi",
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
  const saveEditChanges = useCallback(() => {}, []);

  const createUser = useCallback((user: UserWithoutID) => {}, []);
  const [user, setUser] = useState<User>({
    ...userInitialValues,
    id: -Infinity,
  });

  // useEffect(() => {
  //   setTimeout(() => setUser((prev) => ({ ...prev, name: "kaaku" })), 10000);
  // }, []);

  useEffect(() => {
    console.log("update", user);
  }, [user]);
  const formik = useFormik<User | UserWithoutID>({
    initialValues: user,
    onSubmit: (values) => {
      console.log("mesha", values);
    },
    validationSchema: validator,
  });

  const subHeadingStyles = {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.05rem",
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
            <button type="submit">Create</button>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default UserForm;
