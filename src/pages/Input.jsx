import { ErrorMessage, useField } from "formik";

import React from 'react'

const Input = ({label, ...props}) => {
    const[field, meta] = useField(props);
    // console.log(meta);
  return (
    <div>
        <label htmlFor={field.name}>{label}</label>
        <input {...field} {...props} />
        <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  )
}

export default Input