import { BrowserRouter, Routes, Route } from "react-router";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<ResponsiveAppBar></ResponsiveAppBar>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer></Footer>
		</BrowserRouter>
	);
};

export default AppRouter;
