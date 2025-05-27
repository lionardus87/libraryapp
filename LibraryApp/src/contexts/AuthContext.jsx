import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userRole, setUserRole] = useState(() => {
		return localStorage.getItem("userRole") || "guest";
	});

	useEffect(() => {
		const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
		if (storedUsers.length === 0) {
			const defaultUsers = [
				{ username: "admin", password: "Password1", role: "admin" },
				{ username: "member", password: "Password1", role: "member" },
			];
			localStorage.setItem("users", JSON.stringify(defaultUsers));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("userRole", userRole);
	}, [userRole]);

	const login = (identifier, password) => {
		const users = JSON.parse(localStorage.getItem("users")) || [];
		const foundUser = users.find(
			(u) => u.username === identifier && u.password === password
		);
		if (foundUser) {
			setUserRole(foundUser.role);
			return { success: true, role: foundUser.role };
		}
		return { success: false };
	};

	const logout = () => {
		localStorage.removeItem("userRole");
		setUserRole("guest");
	};

	const isAuthenticated = userRole !== "guest";

	return (
		<AuthContext.Provider value={{ userRole, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
