import * as Yup from "yup";

export const userValidator = Yup.object({
  name: Yup.string()
    .matches(
      new RegExp(/^(\w)+ (\w)+$/),
      "Name should contain first name and last name"
    )
    .required("Name is required."),
  username: Yup.string()
    .min(2, "Minimum 2 characters are required.")
    .required("Username is required."),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  website: Yup.string().matches(
    new RegExp(/^(https:\/\/|http:\/\/)?(www\.)?(\w)+\.(\w)+$/),
    "Invalid URL"
  ),
  phone: Yup.string()
    .matches(new RegExp(/^[\d \-().x]+$/), "Invalid Phone Number")
    .max(30, "Phone number is too long"),
  address: Yup.object({
    zipcode: Yup.string().matches(
      new RegExp(/(\d\d\d\d-\d\d\d\d)|(\d\d\d\d\d)/),
      "Invalid Zip code"
    ),
  }),
});

export const postValidator = Yup.object({
  title: Yup.string()
    .min(2, "Title must atleast contain 2 characters")
    .required("Title of post is required"),
  body: Yup.string()
    .min(5, "Body must atleast contain 5 characters")
    .required("Body of post is required"),
});

export const commentValidator = Yup.object({
  name: Yup.string()
    .min(2, "Comment name must atleast contain 2 characters")
    .required("Comment name is required"),
  body: Yup.string()
    .min(5, "Comment body must atleast contain 5 characters")
    .required("Comment body is required"),
});
