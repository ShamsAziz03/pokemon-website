import PokemonCard from "../components/pokemonCard";
import pokemon1 from "../assets/pokemons/pokemon1.png";
import pokemon2 from "../assets/pokemons/pokemon2.png";
import pokemon3 from "../assets/pokemons/pokemon3.png";
import pokemon4 from "../assets/pokemons/pokemon4.png";

function Home() {
  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-20 p-10">
        <PokemonCard
          img={pokemon1}
          name="Bulbasaur"
          id="#00155"
          types={["Grass", "Poison"]}
        />
        <PokemonCard
          img={pokemon2}
          name="Charmander"
          id="#00456"
          types={["Fire"]}
        />
        <PokemonCard
          img={pokemon3}
          name="Squirtle"
          id="#00788"
          types={["Water"]}
        />
        <PokemonCard
          img={pokemon4}
          name="Pikachu"
          id="#02577"
          types={["Electric"]}
        />
      </section>
    </>
  );
}

export default Home;
