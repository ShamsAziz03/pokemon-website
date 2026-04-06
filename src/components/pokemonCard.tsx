import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import type { Pokemon } from "./home";

type PokemonData = {
	img: string;
	name: string;
	id: string;
	types: string[];
	height: string;
	weight: string;
	abilities: string;
};

export async function getPokemonInfo(url: string): Promise<PokemonData> {
	const details = await Axios.get(url);

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

function PokemonCard({ pokemonDetails }: { pokemonDetails: Pokemon }) {
	const navigate = useNavigate();

	const {
		isPending,
		error,
		data: pokemonInfo,
	} = useQuery({
		queryKey: ["pokemonInfo", pokemonDetails.url],
		queryFn: () => getPokemonInfo(pokemonDetails.url),
		refetchOnWindowFocus: false,
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
				An error has occurred: {error?.message}
			</h1>
		);

	return (
		<div className="flex flex-col rounded-[20px] shadow-xl border-2 border-black justify-center items-center relative top-0 transition-[top] duration-[350ms] ease-in-out hover:-top-[10px]">
			<img
				alt="how the pokemon looks like"
				className="w-[50%] h-[200px] border-b-2"
				src={pokemonInfo.img}
			/>
			<section className="flex flex-col gap-2 justify-start items-start pl-8 pr-8 pb-3 w-[100%]">
				<p className="text-md font-bold text-gray-500">{pokemonInfo.id}</p>
				<p className="text-xl font-bold">{pokemonInfo.name}</p>
				<div className="flex flex-wrap gap-4">
					{pokemonInfo.types.map((type) => {
						return (
							<p
								className="text-xs font-semibold text-black bg-gray-300 rounded-[10px] shadow-xl p-1 pl-4 pr-4"
								key={type}
							>
								{type}
							</p>
						);
					})}
				</div>
				<button
					className="text-md font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-1 mt-5 hover:bg-gray-400 border-2 hover:shadow-2xl hover:text-black"
					onClick={() => {
						navigate("/aboutPokemon", { state: { ...pokemonInfo } });
					}}
					type="button"
				>
					Details
				</button>
			</section>
		</div>
	);
}

export default PokemonCard;
