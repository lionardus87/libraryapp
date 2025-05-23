import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
	const [credentials, setCredentials] = useState({
		identifier: "",
		password: "",
	});
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const { identifier, password } = credentials;
		// Simulate authentication (replace with real API call)
		if (identifier === "admin@test.com" && password === "Password1") {
			login();
			alert("Login successful!");
			navigate("/");
		} else {
			alert("Invalid email/username or password.");
		}
	};

	return (
		<Box component="form" onSubmit={handleLogin} noValidate>
			<TextField
				label="Email or Username"
				name="identifier"
				value={credentials.identifier}
				onChange={handleChange}
				fullWidth
				required
				margin="normal"
			/>
			<TextField
				label="Password"
				name="password"
				type="password"
				value={credentials.password}
				onChange={handleChange}
				fullWidth
				required
				margin="normal"
			/>
			<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
				Log In
			</Button>
		</Box>
	);
};

export default LoginForm;
