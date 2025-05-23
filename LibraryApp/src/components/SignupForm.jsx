import React, { useReducer } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const formReducer = (state, action) => {
	switch (action.type) {
		case "InputField":
			return { ...state, [action.field]: action.value };
		case "Reset":
			return initialFormState;
		default:
			return state;
	}
};

const initialFormState = {
	username: "",
	firstname: "",
	lastname: "",
	password: "",
	repassword: "",
};

const SignupForm = () => {
	const [formData, dispatch] = useReducer(formReducer, initialFormState);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		dispatch({
			type: "InputField",
			field: e.target.name,
			value: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { username, firstname, lastname, password, repassword } = formData;

		if (password !== repassword) {
			alert("Passwords do not match.");
			return;
		}
		console.log(username, firstname, lastname);
		login();
		alert("Signup successful!");
		navigate("/");
	};

	const formField = (label, name, type = "text") => (
		<Box display="flex" alignItems="center" mb={2}>
			<Typography sx={{ width: 120 }}>{label}</Typography>
			<TextField
				fullWidth
				type={type}
				name={name}
				value={formData[name]}
				onChange={handleChange}
				variant="outlined"
				size="small"
			/>
		</Box>
	);

	return (
		<Box component="form" onSubmit={handleSubmit} noValidate>
			{formField("Username:", "username")}
			{formField("First Name:", "firstname")}
			{formField("Last Name:", "lastname")}
			{formField("Password:", "password", "password")}
			{formField("Retype Password:", "repassword", "password")}

			<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
				Sign Up
			</Button>
		</Box>
	);
};

export default SignupForm;
