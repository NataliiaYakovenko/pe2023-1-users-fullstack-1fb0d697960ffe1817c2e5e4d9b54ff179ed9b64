import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { USER_VALIDATION_SCHEMA } from "../../../utils/validate/validationSchemas";
import Input from "../Input";
import CONSTANTS from "./../../../constants";
import styles from "./UserForm.module.sass";
import { createUserThunk } from "../../../store/slices/usersSlice";

const { GENDERS } = CONSTANTS;

function UserForm({ createUser }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    passwordHush: "",
    birthday: "",
    gender: GENDERS[0],
    userPhoto: "",
  };

  const handleSubmit = (values, formikBag) => {
    // createUser(values);

    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("passwordHush", values.passwordHush);
    formData.append("birthday", values.birthday);
    formData.append("gender", values.gender);
    formData.append("userPhoto", values.userPhoto);

    createUser(formData);

    formikBag.resetForm();
  };

  const classes = {
    error: styles.error,
    input: styles.input,
    valid: styles.valid,
    invalid: styles.invalid,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={USER_VALIDATION_SCHEMA}
    >
      {(formikProps) => (
        <Form className={styles.form}>
          <Input
            label="Name:"
            type="text"
            name="firstName"
            placeholder="Yourname"
            autoFocus
            classes={classes}
          />
          <Input
            label="Surname:"
            type="text"
            name="lastName"
            placeholder="Yoursurname"
            classes={classes}
          />
          <Input
            label="Email:"
            type="email"
            name="email"
            placeholder="your@mail.com"
            classes={classes}
          />
          <Input
            label="Password:"
            type="password"
            name="passwordHush"
            classes={classes}
          />
          <Input
            label="Birthday:"
            type="date"
            name="birthday"
            classes={classes}
          />
          {GENDERS.map((g) => (
            <label key={g}>
              <Field type="radio" name="gender" value={g} />
              <span>{g} </span>
              <ErrorMessage name="gender" />
            </label>
          ))}
          <label>
            <span>Photo:</span>
            <input
              type="file"
              name="userPhoto"
              onChange={(e) => {
                formikProps.setFieldValue("userPhoto", e.target.files[0]);
              }}
            />
          </label>
          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (data) => dispatch(createUserThunk(data)),
});

export default connect(null, mapDispatchToProps)(UserForm);
