import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPokemon from "./components/aboutPokemon";
import EditProfile from "./components/editProfile";
import FavouritePage from "./components/favouritePage";
import Home from "./components/home";
import LoginPage from "./components/loginPage";
import RatePokemon from "./components/ratePokemon";
import ReviewRatingsPage from "./components/reviewRatingsPage";
import SignupPage from "./components/signupPage";
import UserProfile from "./components/userProfile";
import UserProvider from "./contexts/context";

const queryClient = new QueryClient();

function App() {
	return (
		<UserProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter basename="/pokemon-website">
					<Routes>
						<Route element={<LoginPage />} path="/" />
						<Route element={<SignupPage />} path="/signupPage" />
						<Route element={<Home />} path="/home" />
						<Route element={<AboutPokemon />} path="/aboutPokemon" />
						{/* add id with path of the pokemon about page, so user can load the page with path, without need to click on button details */}
						<Route element={<RatePokemon />} path="/ratePokemon" />
						<Route element={<FavouritePage />} path="/favouritePage" />
						<Route element={<UserProfile />} path="/userProfile" />
						<Route element={<ReviewRatingsPage />} path="/reviewRatingsPage" />
						<Route element={<EditProfile />} path="/editProfile" />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</UserProvider>
	);
}

export default App;
