import { useFormik } from "formik";
import Input from "src/pages/Input";
import { validator } from "src/utils/validator";

const userInitialValues: User = {
  id: -1,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  phone: "",
  website: "",
};

function UserForm({ edit }: { edit: boolean }) {
  const formik = useFormik<User>({
    initialValues: userInitialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validator,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {edit ? <div>Edit User</div> : <div>Create User</div>}
      <Input label="Name" name="name" type="text" />
      <Input label="Username" name="username" type="text" />
      <Input label="Email" name="email" type="email" />
      <Input label="Phone" name="phone" type="text" />
      <Input label="Website" name="website" type="text" />
      <button type="submit">Create</button>
    </form>
  );
}

export default UserForm;
