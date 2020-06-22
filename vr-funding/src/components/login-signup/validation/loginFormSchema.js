import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
    username: Yup.string()
    .trim()   
        .min(4, "Current username is too short")
        .required("Your username is required"),

    password: Yup.string()   
    .trim()
    .min(4, 'Password entered is too short')    
    .required("Your password is Required"),
  });
  
  export default loginFormSchema;