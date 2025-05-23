import React from "react";
import { IconButton, Tooltip, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../contexts/AuthContext";

export default function UserMenu({ onMenuSelect }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const { isAuthenticated } = useAuth();

	const settings = isAuthenticated
		? ["Profile", "Cart", "Logout"]
		: ["Profile", "Cart", "Login"];

	const handleOpen = (event) => setAnchorEl(event.currentTarget);
	const handleClose = (setting) => {
		setAnchorEl(null);
		if (setting) onMenuSelect(setting);
	};

	return (
		<>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpen} sx={{ p: 0 }}>
					<AccountCircleIcon sx={{ color: "white", fontSize: 32 }} />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => handleClose(null)}
				sx={{ mt: "45px" }}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
			>
				{settings.map((setting) => (
					<MenuItem key={setting} onClick={() => handleClose(setting)}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
