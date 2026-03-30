import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPokemon from "./components/aboutPokemon";
import Home from "./components/home";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter basename="/pokemon-website">
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<AboutPokemon />} path="/aboutPokemon" />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
