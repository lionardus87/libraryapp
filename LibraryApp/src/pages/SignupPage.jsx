import { Container, Typography, Paper } from "@mui/material";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
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
					Sign Up
				</Typography>
				<SignupForm />
			</Paper>
		</Container>
	);
};

export default SignupPage;
