import { Formik, Form } from "formik";
import Input from "src/pages/Input";
import { validator } from "src/utils/validator";

function UserForm({ edit }: { edit: boolean }) {
    return (
        <Formik
            initialValues={{
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
            }}
            validationSchema={validator}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {(formik) => (
                <div>
                    {edit ? <div>Edit User</div> : <div>Create User</div>}
                    <Form>
                        <Input label="Name" name="name" type="text" />
                        <Input label="Username" name="username" type="text" />
                        <Input label="Email" name="email" type="email" />
                        <Input label="Phone" name="phone" type="text" />
                        <Input label="Website" name="website" type="text" />
                        <button type="submit">Create</button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

export default UserForm;
