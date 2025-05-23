import { BrowserRouter, Routes, Route } from "react-router";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactUsPage from "./pages/ContactPage";
import BooksPage from "./pages/BooksPage";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<ResponsiveAppBar></ResponsiveAppBar>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/books" element={<BooksPage />} />
				<Route path="/contactus" element={<ContactUsPage />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer></Footer>
		</BrowserRouter>
	);
};

export default AppRouter;
