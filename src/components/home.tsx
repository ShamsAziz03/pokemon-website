import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import Fuse from "fuse.js";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHeart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
	const [searchText, setSearchText] = useState("");
	const navigate = useNavigate();

	function search(data: string) {
		const names = pokemonList?.map((pokemon) => pokemon.name) || [];
		const fuse = new Fuse(names);
		let filtered = [...(pokemonList || [])];
		if (!data.trim()) {
			filtered = [...(pokemonList || [])];
		} else {
			const findPokemons = fuse.search(data).map((result) => result.item);
			filtered = (pokemonList || []).filter((pokemon) =>
				findPokemons.includes(pokemon.name),
			);
		}
		return filtered;
	}

	async function getPokemon() {
		const randomId = Math.floor(Math.random() * 1025) + 1;
		const details = await Axios.get(
			`https://pokeapi.co/api/v2/pokemon/${randomId}`,
		);

		const types: string[] = details.data.types.map(
			(type: { type: { name: string } }) => type.type.name.toUpperCase(),
		);

		const pokemonDetails = {
			img: details.data.sprites.front_default,
			name: details.data.name.toUpperCase(),
			id: `# ${details.data.id}`,
			types: types,
			height: `${details.data.height} dm`,
			weight: `${details.data.weight} lbs`,
			abilities: details.data.abilities
				.map((a: { ability: { name: string } }) => a.ability.name)
				.join(", "),
		};
		return pokemonDetails;
	}

	async function getPokemonsList() {
		const list = ["", "", "", "", "", ""];
		const promises = list.map(getPokemon);
		const result = await Promise.all(promises);
		return result.flat();
	}

	const pokemons = () => {
		if (!searchText) return pokemonList || [];
		return search(searchText);
	};

	const {
		isPending,
		error,
		data: pokemonList,
	} = useQuery({
		queryKey: ["pokemonList"],
		queryFn: () => getPokemonsList(),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	if (isPending)
		return (
			<h1
				className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
				style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
			>
				Loading...
			</h1>
		);

	if (error)
		return (
			<h1
				className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
				style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
			>
				An error has occurred: {error.message}
			</h1>
		);

	return (
		<>
			<section className=" flex w-[100%] justify-around items-center">
				{/* search */}
				<div className=" flex flex-row justify-center items-center p-5 gap-5 w-[50%]">
					<FaSearch color="black" size="20px" />
					<input
						className="w-[100%] h-[30px] bg-gray-200 rounded-[20px] shadow-xl border-2 border-black text-sm font-semibold text-black p-5"
						id="input"
						onInput={(event: React.InputEvent<HTMLInputElement>) => {
							setSearchText(event.currentTarget.value.trim());
						}}
						placeholder="Search..."
						type="text"
					></input>
				</div>

				<div className=" flex flex-row justify-center items-center gap-5">
					{/* favorites */}
					<div className=" flex flex-row justify-center items-center gap-2 text-white bg-gray-800 rounded-[10px] shadow-xl hover:text-black hover:shadow-2xl  p-3 hover:bg-gray-400 border-2 h-auto flex-wrap">
						<FaHeart size={20} />
						<button
							className="text-sm font-semibold "
							onClick={() => {
								navigate("/favouritePage");
							}}
							type="button"
						>
							Favourites
						</button>
					</div>
					{/* profile */}
					<div className=" flex flex-row justify-center items-center gap-2 text-white bg-gray-800 rounded-[10px] shadow-xl hover:text-black hover:shadow-2xl  p-3 pl-6 pr-6 hover:bg-gray-400 border-2 h-auto flex-wrap">
						<CgProfile size={20} />
						<button
							className="text-sm font-semibold "
							onClick={() => {
								navigate("/userProfile");
							}}
							type="button"
						>
							Profile
						</button>
					</div>
				</div>
			</section>

			<section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-20 p-10">
				{pokemons()?.map((pokemon: Pokemon, index) => {
					return (
						<div key={index}>
							<PokemonCard pokemonDetails={pokemon} />
						</div>
					);
				})}
			</section>
		</>
	);
}

export default Home;
