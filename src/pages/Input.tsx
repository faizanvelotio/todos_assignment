import React from "react";
import { FormikProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

type InputProps = {
  formik: FormikProps<User | UserWithoutID>;
  name: string;
  label: string;
} & TextFieldProps;

const Input: React.FC<InputProps> = ({ formik, name, label, ...props }) => {
  const field = formik.getFieldProps(name);
  const meta = formik.getFieldMeta(name);

  const configTextField: TextFieldProps = {
    ...field,
    ...props,
    label: label,
    fullWidth: true,
    variant: "standard",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextField
      sx={{
        ".MuiInputLabel-root": {
          textTransform: "uppercase",
          fontFamily: "'Open Sans Condensed', sans-serif",
        },
        ".MuiInputBase-root": {
          borderBottom: "1px solid rgba(233, 237, 242, 0.1)",
        },
      }}
      {...configTextField}
    />
  );
};

export default Input;
