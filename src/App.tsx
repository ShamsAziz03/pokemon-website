import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import AboutPokemon from "./components/aboutPokemon";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/pokemon-website">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutPokemon" element={<AboutPokemon />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
