import { useNavigate } from "react-router-dom";

type Pokemon = {
	img: string;
	name: string;
	id: string;
	types: string[];
	height: string;
	weight: string;
	abilities: string;
};

function PokemonCard({ pokemonDetails }: { pokemonDetails: Pokemon }) {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col rounded-[20px] shadow-xl border-2 border-black justify-center items-center hover:[transform:translateY(-10px)]">
			<img
				alt="how the pokemon looks like"
				className="w-[50%] h-[200px] border-b-2"
				src={pokemonDetails.img}
			/>
			<section className="flex flex-col gap-2 justify-start items-start pl-8 pr-8 pb-3 w-[100%]">
				<p className="text-md font-bold text-gray-500">{pokemonDetails.id}</p>
				<p className="text-xl font-bold">{pokemonDetails.name}</p>
				<div className="flex flex-wrap gap-4">
					{pokemonDetails.types.map((type) => {
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
						navigate("/aboutPokemon", { state: { ...pokemonDetails } });
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
