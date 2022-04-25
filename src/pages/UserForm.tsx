import { Formik, Form } from "formik";
import Input from "./Input";
import * as Yup from "yup";
import useLocationId from "../utils/useLocationId";

function UserForm({ edit }: { edit: boolean }) {
    const userId: number = useLocationId();

    console.log("user id", userId);

    const validate = Yup.object({
        name: Yup.string()
            .min(2, "Minimum 2 characters are required.")
            .required("Name is required."),
        username: Yup.string()
            .min(2, "Minimum 2 characters are required.")
            .required("Username is required."),
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
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
            validationSchema={validate}
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
