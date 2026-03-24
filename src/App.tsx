import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/home";
import AboutPokemon from "./components/aboutPokemon";


function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutPokemon" element={<AboutPokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
