import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as Yup from "yup";
import fundraiserFormSchema from "./validation/fundraiserFormSchema";
import FundraiserCard from "./FundraiserCard";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { VRContext } from "../../context/VRContext";

const initialFormValues = {
	title: "",
	description: "",
	img_url: "",
};

const initialFormErrors = {
	title: "",
	description: "",
	img_url: "",
};

const initialFundraiser = [];
const initialDisabled = true;
// const URL = 'https://virtual-reality-fundraising.herokuapp.com/api/projects'

export default function FundraiserForm(props) {
	const [fundraiser, setFundraiser] = useState(initialFundraiser);
	const [formValues, setFormValues] = useState(
		props.values ? props.values : initialFormValues
	);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);

	const [
		userDetails,
		setUserDetails,
		currentProject,
		setCurrentProject,
	] = useContext(VRContext);

	const postNewFundraiser = newFundraiser => {
		if (props.put === "true") {
			axiosWithAuth()
				.put(props.URL, newFundraiser)
				.then(res => {
					console.log(res);
					setFundraiser([...fundraiser, res.data]);
					window.location.assign(`/dashboard/view/${props.id}`);
				})
				.catch(err => {
					// debugger;
					console.log(err);
				})
				.finally(() => {
					setFormValues(initialFormValues);
				});
		} else {
			axiosWithAuth()
				.post(props.URL, newFundraiser)
				.then(res => {
					console.log(res);
					setFundraiser([...fundraiser, res.data]);
				})
				.catch(err => {
					// debugger;
					console.log(err);
				})
				.finally(() => {
					setFormValues(initialFormValues);
				});
		}
	};

	const onInputChange = evt => {
		const name = evt.target.name;
		const value = evt.target.value;

		Yup.reach(fundraiserFormSchema, name)
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

	const onSubmitHandler = evt => {
		evt.preventDefault();

		const newFundraiser = {
			title: formValues.title.trim(),
			description: formValues.description,
			img_url: formValues.img_url ? formValues.img_url : "",
		};
		postNewFundraiser(newFundraiser);
	};

	useEffect(() => {
		fundraiserFormSchema.isValid(formValues).then(valid => {
			setDisabled(!valid);
		});
	}, [formValues]);

	return (
		<div className="container">
			<form className="form container" onSubmit={onSubmitHandler}>
				<div className="inputs">
					<h4>Fundraiser Details</h4>

					<input
						value={formValues.title}
						onChange={onInputChange}
						name="title"
						type="text"
						placeholder="Fundraiser Name"
					/>

					<input
						value={formValues.img_url}
						onChange={onInputChange}
						name="img_url"
						type="url"
						placeholder="Image Url (Optional)"
					/>

					<textarea
						value={formValues.description}
						onChange={onInputChange}
						name="description"
						type="text"
						placeholder="Description Here"
					/>
				</div>

				<button className="button" type="submit" disabled={disabled}>
					Submit
				</button>

				<div className="form-group submit">
					<div className="errors">
						<div>{formErrors.title}</div>
						<div>{formErrors.img_url}</div>
						<div>{formErrors.description}</div>
					</div>
				</div>
			</form>
		</div>
	);
}
