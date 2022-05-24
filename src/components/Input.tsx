import { useMemo } from "react";
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

  const configTextField: TextFieldProps = useMemo(
    () => ({
      ...field,
      ...rest,
      label: label,
      fullWidth: true,
      variant: "standard",
      InputLabelProps: {
        style: {
          textTransform: "uppercase",
          fontFamily: "'Open Sans Condensed', sans-serif",
        },
      },
    }),
    [field, rest, label]
  );

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default Input;
