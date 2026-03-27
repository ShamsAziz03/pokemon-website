import Axios from "axios";
import { useState, useEffect } from "react";

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
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  async function addPokemonToList(arr: Pokemon[]) {
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

    arr.push(pokemonDetails);
  }

  async function getPokemonsList() {
    let arr: Pokemon[] = [];
    for (let i = 0; i < 6; i++) {
      await addPokemonToList(arr);
    }
    setPokemonList(arr);
  }

  useEffect(() => {
    getPokemonsList();
  }, []);

  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-20 p-10">
        {pokemonList.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              <PokemonCard
                pokemonDetails={pokemon}
              />
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Home;
