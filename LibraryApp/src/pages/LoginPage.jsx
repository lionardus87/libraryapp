import { Container, Typography, Paper } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
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
			</Paper>
		</Container>
	);
};

export default LoginPage;
