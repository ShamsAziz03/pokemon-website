import "./App.css";
import PokemonCard from "./components/pokemonCard";

function App() {
  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-20">
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </section>
    </>
  );
}

export default App;
