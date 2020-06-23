import * as Yup from "yup";

const signUpFormSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "First name needs to be two or more characters")
    .max(20, "First name can not be longer than 20 characters")
    .required("Please enter your first name"),
  lastname: Yup.string()
    .min(2, "Last name needs to be two or more characters")
    .max(20, "Last name can not be longer than 20 characters")
    .required("Please enter your last name"),
  username: Yup.string()
    .min(4, "Current username is too short")
    .max(100, "Your username must be less than 100 characters")
    .required("Your username is required"),
  password: Yup.string()
    .min(4, "Password entered is too short")
    .required("Your password is Required"),
  role: Yup.string()
  .oneOf(["fundraiser", "funder"], "Please select a role"),
  
});

export default signUpFormSchema;
