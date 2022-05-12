import * as Yup from "yup";

const validator = Yup.object({
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

export default validator;
