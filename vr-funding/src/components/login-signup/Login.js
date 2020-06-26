import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import {useShowPassword} from "../dashboard/hooks/useShowPassword";
import hide from "../styles/images/hide.svg";
import show from "../styles/images/shown.svg";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from "yup";
import loginFormSchema from "./validation/loginFormSchema";
import { VRContext } from "../context/VRContext";

const initialVal = {
	username: "",
	password: "",
};

const initialErr = {
	username: "",
	password: "",
};

const initialDisabled = true;


const Login = props => {
	const [userDetails, setUserDetails] = useContext(VRContext);
	const [disabled, setDisabled] = useState(initialDisabled);
	const [formValues, setFormValues] = useState(initialVal);
	const [formErrors, setFormErrors] = useState(initialErr);
	const [type, hidden, onClickHandler] = useShowPassword();



	let history = useHistory();

	const onInputChange = e => {
		const { name, value } = e.target;

		yup
			.reach(loginFormSchema, name)
			.validate(value)
			.then(valid => {
				setFormErrors({
					...formErrors,
					[name]: "",
				});
			})
			.catch(err => {
				setFormErrors({
					...formErrors,
					[name]: err.errors[0],
				});
			});
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const onSubmitHandler = e => {
		e.preventDefault();
		const user = {
			username: formValues.username.trim(),
			password: formValues.password.trim(),
		};

		axiosWithAuth()
			.post(
				`https://virtual-reality-fundraising.herokuapp.com/api/users/login`,
				user
			)
			.then(res => {
				console.log(res);
				setFormValues(initialVal);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("id", res.data.user.id);
				setUserDetails(res.data.user);
				history.push("/dashboard/profile")
			})
			.catch(err => {
				console.log(err);
				setFormErrors({ ...formErrors, invalid: "Incorrect username or password" });
			});
	};

	useEffect(() => {
		loginFormSchema.isValid(formValues).then(valid => {
			setDisabled(!valid);
		});
	}, [formValues]);

	return (
		<form onSubmit={onSubmitHandler}>
			<h1>Login</h1>
			<div className="errors">{formErrors.invalid}</div>

			<input
				placeholder="Username"
				name="username"
				type="text"
				onChange={onInputChange}
				value={formValues.username}
			/>
			<div className="pass">
			<input
				placeholder="Password"
				name="password"
				type={type}
				onChange={onInputChange}
				value={formValues.password}
			/>
			 <img src={hidden ? show : hide} onClick={onClickHandler} />
</div>
			<button className="button" type="submit" disabled={disabled}>Login</button>
			<div className="errors">
				<div>{formErrors.username}</div>
				<div>{formErrors.password}</div>
			</div>
			<p>Don't have an account yet?</p><Link className="button" to="/Signup">Sign Up</Link>{" "}
		</form>
	);
};

export default Login;