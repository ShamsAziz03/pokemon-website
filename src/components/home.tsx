import Axios from "axios";
import { useQuery } from "@tanstack/react-query";

import PokemonCard from "../components/pokemonCard";

type Pokemon = {
  img: string;
  name: string;
  id: string;
  types: string[];
  height: string;
  weight: string;
  abilities: string;
};

function Home() {
  async function getPokemonsList() {
    let list: Pokemon[] = [];
    for (let i = 0; i < 6; i++) {
      let randomId = Math.floor(Math.random() * 1025) + 1;
      const details = await Axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`,
      );

      let types: string[] = details.data.types.map(
        (type: { type: { name: string } }) => type.type.name.toUpperCase(),
      );

      const pokemonDetails = {
        img: details.data.sprites.front_default,
        name: details.data.name.toUpperCase(),
        id: "# " + details.data.id,
        types: types,
        height: details.data.height + " dm",
        weight: details.data.weight + " lbs",
        abilities: details.data.abilities
          .map((a: { ability: { name: string } }) => a.ability.name)
          .join(", "),
      };

      list.push(pokemonDetails);
    }
    return list;
  }

  const {
    isPending,
    error,
    data: pokemonList,
  } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => getPokemonsList(),
  });

  if (isPending)
    return (
      <h1
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
      >
        Loading...
      </h1>
    );

  if (error)
    return (
      <h1
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
      >
        An error has occurred: {error.message}
      </h1>
    );

  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-20 p-10">
        {pokemonList.map((pokemon: Pokemon) => {
          return (
            <div key={pokemon.id}>
              <PokemonCard pokemonDetails={pokemon} />
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Home;
