import * as Yup from "yup";

export const validator = Yup.object({
  name: Yup.string()
    .min(2, "Minimum 2 characters are required.")
    .required("Name is required."),
  username: Yup.string()
    .min(2, "Minimum 2 characters are required.")
    .required("Username is required."),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  website: Yup.string().url(),
  phone: Yup.string().matches(
    new RegExp(/[\d -]+/),
    "Phone number should be numeric"
  ),
  zipcode: Yup.string().matches(
    new RegExp(/\d\d\d\d\d\d/),
    "Zipcode should be of length 6."
  ),
});
