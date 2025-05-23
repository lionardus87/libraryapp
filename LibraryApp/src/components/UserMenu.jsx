import React from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const handleClick = () => {
		if (isAuthenticated) {
			logout();
			navigate("/");
		} else {
			navigate("/login");
		}
	};

	return (
		<Box display="flex" alignItems="center" gap={1}>
			{isAuthenticated && (
				<Box display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
					<Typography variant="body1" sx={{ color: "white" }}>
						Cart
					</Typography>
					<IconButton sx={{ color: "white" }} onClick={() => navigate("/cart")}>
						<ShoppingCartIcon />
					</IconButton>
				</Box>
			)}
			<IconButton sx={{ color: "white" }} onClick={handleClick}>
				<AccountCircleIcon />
			</IconButton>
			<Typography
				variant="body1"
				sx={{ color: "white", cursor: "pointer" }}
				onClick={handleClick}
			>
				{isAuthenticated ? "Logout" : "Login"}
			</Typography>
		</Box>
	);
}
