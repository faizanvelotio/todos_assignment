import React, { useCallback, useContext, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { UserContentContext } from "src/context/UserContentContext";
import { commentValidator } from "src/utils/validators";
import { createCommentForPost } from "src/api/Post";
import { AxiosResponse } from "axios";
import { ActionType } from "src/types/ActionTypes";
import AlertMessage from "src/components/AlertMessage";
import { Box, Button, Stack, Typography } from "@mui/material";
import Input from "src/pages/Input";

interface CommentInputProps {
  postId: number;
  postIdx: number;
  email: string;
}

const commentInitialValues: PostCommentWithoutID = {
  postId: -Infinity,
  name: "",
  email: "",
  body: "",
};

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  postIdx,
  email,
}) => {
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    message: "",
    status: "success",
  });
  const [disabled, setDisabled] = useState(false);
  const { dispatch } = useContext(UserContentContext);
  const formik: FormikProps<PostCommentWithoutID> =
    useFormik<PostCommentWithoutID>({
      initialValues: {
        ...commentInitialValues,
        postId: postId,
        email: email,
      },
      onSubmit: (values: PostCommentWithoutID) => {
        handleSubmit(values);
      },
      validationSchema: commentValidator,
    });
  const { setValues } = formik;

  const handleSubmit = useCallback(
    async (comment: PostCommentWithoutID) => {
      try {
        setDisabled(true);
        const response: AxiosResponse<PostComment, PostCommentWithoutID> =
          await createCommentForPost(comment);
        dispatch({
          type: ActionType.ADD_POST_COMMENT,
          payload: { postIndex: postIdx, comment: response.data },
        });
        setAlertInfo({
          status: "success",
          message: "Comment added successfully!",
        });
        setValues(
          { ...commentInitialValues, postId: postId, email: email },
          false
        );
      } catch (e) {
        setAlertInfo({
          status: "error",
          message: "Unable to comment at the moment",
        });
      } finally {
        setDisabled(false);
      }
    },
    [dispatch, email, postId, setValues, postIdx]
  );

  const renderCommentInput = useCallback(
    () => (
      <Box
        sx={{
          padding: "1rem",
          border: "1px solid lightgray",
          borderRadius: "5px",
          "&:focus-within": {
            borderColor: "primary.main",
          },
        }}
      >
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={{ xs: 2, lg: 3 }}>
            <Input formik={formik} label="Name" name="name" required={true} />
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
                margin: "1rem auto",
                color: "#ffffff",
                fontWeight: "bold",
                width: "fit-content",
                alignSelf: "flex-end",
              }}
              disabled={disabled}
              type="submit"
            >
              <Typography variant="buttonText">Comment</Typography>
            </Button>
          </Stack>
        </form>
      </Box>
    ),
    [disabled, formik]
  );

  const renderAlert = useCallback(
    () => (
      <AlertMessage
        {...alertInfo}
        handleClose={() => setAlertInfo({ status: "success", message: "" })}
      />
    ),
    [alertInfo]
  );

  return (
    <>
      {renderCommentInput()}
      {renderAlert()}
    </>
  );
};

export default CommentInput;
