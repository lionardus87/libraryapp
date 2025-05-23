import { Container, Typography, Paper, Box, Button } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	return (
		<Container
			maxWidth="sm"
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "start",
				alignItems: "center",
				minHeight: "100vh",
				mt: 5,
			}}
		>
			<Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
				<Typography variant="h5" align="center" gutterBottom>
					Login
				</Typography>
				<LoginForm />

				{/* Signup option */}
				<Box mt={3} textAlign="center">
					<Typography variant="body2">Don't have an account?</Typography>
					<Button
						variant="outlined"
						sx={{ mt: 1 }}
						onClick={() => navigate("/signup")}
					>
						Sign Up
					</Button>
				</Box>
			</Paper>
		</Container>
	);
};

export default LoginPage;
