import React from "react";
import { FieldInputProps, FieldMetaProps, FormikProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

type InputProps<T> = {
  formik: FormikProps<T>;
  name: string;
  label: string;
} & TextFieldProps;

const Input = <T extends object>(props: InputProps<T>) => {
  const { formik, name, label, ...rest } = props;
  const field: FieldInputProps<T> = formik.getFieldProps(name);
  const meta: FieldMetaProps<T> = formik.getFieldMeta(name);

  const configTextField: TextFieldProps = {
    ...field,
    ...rest,
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
