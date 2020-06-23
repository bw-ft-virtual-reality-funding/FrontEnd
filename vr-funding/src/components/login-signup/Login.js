import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from "yup";
import loginFormSchema from "./validation/loginFormSchema";
import axios from "axios";

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
	const [disabled, setDisabled] = useState(initialDisabled);
	const [formValues, setFormValues] = useState(initialVal);
	const [formErrors, setFormErrors] = useState(initialErr);

	let history = useHistory();

	// const loginUser = newUser => {
	// 	axios
	// 		.post("https://regres.in/api/users", newUser)
	// 		.then(response => {
	// 			console.log(response);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		})
	// 		.finally(() => {
	// 			setFormValues(initialVal);
	// 		});
	// };

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
				`https://virtual-reality-fundraising.herokuapp.com/api/login`,
				user
			)
			.then(res => {
				console.log(res);
				setFormValues(initialVal);
				// localStorage.setItem("token", res.data.payload);
				// localStorage.setItem("id", res.data.id);
				history.push("/dashboard/profile")
			})
			.catch(err => {
				console.log(err);
				setFormErrors({ ...formErrors, invalid: "Incorrect username or password" });
			});
	};

	useEffect(() => {
		loginFormSchema.isValid(formValues).then(valid => {
			//if values meet validation, enable the login button
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

			<input
				placeholder="Password"
				name="password"
				type="password"
				onChange={onInputChange}
				value={formValues.password}
			/>

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