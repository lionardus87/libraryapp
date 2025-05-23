import { IconButton, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
	return (
		<>
			{/* Footer with Social Icons */}
			<Box
				sx={{
					backgroundColor: "#db7c1c",
					py: 2,
					display: "flex",
					justifyContent: "center",
					gap: 4,
				}}
			>
				<IconButton sx={{ color: "blue" }}>
					<FacebookIcon />
				</IconButton>
				<IconButton sx={{ color: "red" }}>
					<YouTubeIcon />
				</IconButton>
				<IconButton sx={{ color: "#0A66C2" }}>
					<LinkedInIcon />
				</IconButton>
				<IconButton sx={{ color: "black" }}>
					<InstagramIcon />
				</IconButton>
			</Box>
		</>
	);
};

export default Footer;
