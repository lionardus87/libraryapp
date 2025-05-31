import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute() {
	const { auth, userRole } = useAuth();
	return auth?.accessToken && userRole === "admin" ? (
		<Outlet />
	) : (
		<Navigate to="/unauthorized" replace />
	);
}
