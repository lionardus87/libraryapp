import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		identifier: "",
		password: "",
	});

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await login(credentials);

		if (result.success) {
			alert(`Welcome ${result.user.username}`);
			navigate("/");
		} else {
			alert("Login failed: " + result.message);
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit} noValidate>
			<TextField
				label="Email or Username"
				name="identifier"
				value={credentials.identifier}
				onChange={handleChange}
				fullWidth
				required
				margin="normal"
				sx={{ backgroundColor: "white" }}
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
				sx={{ backgroundColor: "white" }}
			/>
			<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
				Log In
			</Button>
		</Box>
	);
}
