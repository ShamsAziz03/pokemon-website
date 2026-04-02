import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPokemon from "./components/aboutPokemon";
import Home from "./components/home";
import RatePokemon from "./components/ratePokemon";
import UserProvider from "./contexts/context";

const queryClient = new QueryClient();

function App() {
	return (
		<UserProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter basename="/pokemon-website">
					<Routes>
						<Route element={<Home />} path="/" />
						<Route element={<AboutPokemon />} path="/aboutPokemon" />
						<Route element={<RatePokemon />} path="/ratePokemon" />
						{/* add id with path of the pokemon about page, so user can load the page with path, without need to click on button details */}
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</UserProvider>
	);
}

export default App;
