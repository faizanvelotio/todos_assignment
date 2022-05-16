import React, { useCallback, useContext, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { Box, Typography, Stack, Button } from "@mui/material";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

import Input from "src/components/Input";
import getLocationId from "src/utils/getLocationId";
import AlertMessage from "src/components/AlertMessage";
import { UserContentContext } from "src/context/UserContentContext";
import { postValidator } from "src/utils/validators";
import { createPost } from "src/api/Post";
import { ActionType } from "src/types/ActionTypes";

const postInitialValues: PostWithoutID = {
  userId: -Infinity,
  title: "",
  body: "",
};

const PostForm: React.FC = () => {
  const history = useHistory();
  const userId = getLocationId();
  const [error, setError] = useState<string>("");
  const [disabled, setDisabled] = useState(false);
  const { dispatch } = useContext(UserContentContext);
  const formik: FormikProps<PostWithoutID> = useFormik<PostWithoutID>({
    initialValues: { ...postInitialValues, userId: userId },
    onSubmit: (values: PostWithoutID) => {
      handleSubmit(values);
    },
    validationSchema: postValidator,
  });

  const handleSubmit = useCallback(
    async (post: PostWithoutID) => {
      try {
        setDisabled(true);
        const response: AxiosResponse<Post, PostWithoutID> = await createPost(
          post
        );
        dispatch({ type: ActionType.ADD_POST, payload: response.data });
        history.push(`/users/${userId}/posts`, {
          message: "Post created successfully",
        });
      } catch (e) {
        setDisabled(false);
        setError("Unable to create post at the moment");
      }
    },
    [userId, dispatch, history]
  );

  const renderPostForm = useCallback(
    () => (
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
          Create a post
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
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Stack spacing={{ xs: 2, lg: 3 }}>
              <Input
                formik={formik}
                label="Title"
                name="title"
                required={true}
              />
              <Input
                formik={formik}
                label="Body"
                name="body"
                multiline
                maxRows={3}
                required={true}
              />
              <Button
                variant="contained"
                sx={{
                  margin: "3rem auto",
                  color: "#ffffff",
                  fontWeight: "bold",
                  width: "fit-content",
                  alignSelf: "center",
                }}
                disabled={disabled}
                type="submit"
              >
                <Typography variant="buttonText">Submit</Typography>
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    ),
    [formik, disabled]
  );

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
      {renderPostForm()}
      {renderErrorMessage()}
    </>
  );
};

export default PostForm;
