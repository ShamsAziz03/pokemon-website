import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-dev-runtime";
import { useLocation } from "react-router-dom";

type PokemonExtraDetails = {
	about: string;
	category: string;
	gender: string;
};

function AboutPokemon() {
	const location = useLocation();
	const data = location.state;

	const [pokemonDetailsHtml, setPokemonDetailsHtml] = useState<JSX.Element[]>(
		[],
	);

	async function getAboutCategoryGender(id: string) {
		const pokemonExtraDetails: PokemonExtraDetails = {
			about: "",
			category: "",
			gender: "",
		};

		const numberId = id.split(" ")[1];
		const details = await Axios.get(
			`https://pokeapi.co/api/v2/pokemon-species/${numberId}`,
		);

		//return first about in english language
		const about = details.data.flavor_text_entries.find(
			(t: { language: { name: string } }) => t.language.name === "en",
		);
		pokemonExtraDetails.about = about.flavor_text;

		//return first 3 categories in english language
		const category = details.data.genera
			.filter(
				(g: { genus: string; language: { name: string } }) =>
					g.language.name === "en",
			)
			.map((g: { genus: string }) => g.genus)
			.slice(0, 3)
			.join(", ");
		pokemonExtraDetails.category = category;

		const genderRate = Number(details.data.gender_rate);
		if (!Number.isNaN(genderRate)) {
			if (genderRate === 8) pokemonExtraDetails.gender = "Female";
			else if (genderRate === 0) pokemonExtraDetails.gender = "Male";
			else pokemonExtraDetails.gender = "Mixed";
		}
		return pokemonExtraDetails;
	}

	async function getWeaknessesForType(type: string, weaknesses: string[]) {
		const result = await Axios.get(`https://pokeapi.co/api/v2/type/${type}`);

		result.data.damage_relations.double_damage_from.forEach(
			(obj: { name: string }) => {
				if (!weaknesses.includes(obj.name)) {
					weaknesses.push(obj.name);
				}
			},
		);
	}

	async function getWeaknesses(types: string[]) {
		const weaknesses: string[] = [];
		const promises = types.map((t) => getWeaknessesForType(t, weaknesses));
		await Promise.all(promises);
		return weaknesses;
	}

	useEffect(() => {
		//to create the content of html to prevent copy and paste 3 times
		const htmlCode = Object.keys(data)
			.filter(
				(key) => key === "height" || key === "weight" || key === "abilities",
			)
			.map((key) => (
				<div className="flex flex-row gap-5" key={key}>
					<p className="text-gary-400 text-xs font-medium">
						{key.toUpperCase()}
					</p>
					<p
						className="font-semibold text-gray-800 text-sm"
						style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.3)" }}
					>
						{data[key]}
					</p>
				</div>
			));

		setPokemonDetailsHtml(htmlCode);
	}, [data]);

	// Object.keys

	const {
		isPending: pokemonExtraDetailsIsPending,
		error: pokemonExtraDetailsError,
		data: pokemonExtraDetails,
	} = useQuery({
		queryKey: ["pokemonExtraDetails"],
		queryFn: () => getAboutCategoryGender(data.id),
	});

	const {
		isPending: pokemonWeaknessesIsPending,
		error: pokemonWeaknessesError,
		data: pokemonWeaknesses,
	} = useQuery({
		queryKey: ["pokemonWeaknesses"],
		queryFn: () => getWeaknesses(data.types),
	});

	if (pokemonExtraDetailsIsPending || pokemonWeaknessesIsPending)
		return (
			<h1
				className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
				style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
			>
				Loading...
			</h1>
		);

	if (pokemonExtraDetailsError || pokemonWeaknessesError)
		return (
			<h1
				className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
				style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
			>
				An error has occurred:
				{pokemonExtraDetailsError?.message || pokemonWeaknessesError?.message}
			</h1>
		);

	return (
		<section className="bg-gray-200 h-[100vh] flex flex-row justify-center items-center">
			<section
				className="bg-gray-100 rounded-[20px] 
      shadow-xl border-2 border-gray-400 h-[90vh] w-[50%] grid [grid-template-rows:auto 1fr]
      grid-cols-2 justify-items-center items-center gap-5 p-8
      hover:shadow-2xl transition-shadow duration-300"
			>
				<h1
					className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
					style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
				>
					{data.name} {data.id}
				</h1>

				<img
					alt="how the pokemon looks like"
					className="w-[100%] h-[80%] row-start-2 col-start-1 border-2 border-gray-400 rounded-[15px] shadow-inner"
					src={data.img}
				/>

				<div className="row-start-2 col-start-2 flex flex-col gap-3">
					<h2
						className="text-gray-700 bg-gray-200 p-4 rounded-lg shadow-sm ring-1 ring-gray-300 text-md"
						id="aboutPokemon"
					>
						{pokemonExtraDetails.about || "loading"}
					</h2>

					<div className="w-[100%] grid [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))] gap-5 text-gray-700 bg-gray-200 p-4 rounded-lg shadow-sm border border-gray-300">
						{pokemonDetailsHtml}
						{/* to show category and gender */}
						<div className="flex flex-row gap-5">
							<p className="text-gary-400 text-xs font-medium"> CATEGORY </p>
							<p
								className="font-semibold text-gray-800 text-sm"
								style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.3)" }}
							>
								{pokemonExtraDetails.category || "loading"}
							</p>
						</div>
						<div className="flex flex-row gap-5">
							<p className="text-gary-400 text-xs font-medium"> GENDER </p>
							<p
								className="font-semibold text-gray-800 text-sm"
								style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.3)" }}
							>
								{pokemonExtraDetails.gender || "loading"}
							</p>
						</div>
					</div>
					<div>
						<p className="mb-3 text-gray-700 font-semibold text-sm">TYPES</p>
						<div className="flex flex-row gap-2 flex-wrap">
							{data.types.map((type: string) => (
								<p
									className="text-xs text-gray-900 bg-gray-300 rounded-lg shadow-md p-2 pl-4 pr-4 ring-1 ring-gray-400"
									key={type}
									style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.3)" }}
								>
									{type}
								</p>
							))}
						</div>
					</div>

					<div>
						<p className="mb-3 text-gray-700 font-semibold text-sm">
							WEAKNESSES
						</p>
						<div className="flex flex-row gap-2 flex-wrap">
							{pokemonWeaknesses.map((weak: string) => (
								<div
									className="text-xs text-gray-900 bg-gray-300 rounded-lg shadow-md p-2 pl-4 pr-4 ring-1 ring-gray-400"
									key={weak}
									style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.3)" }}
								>
									{weak.toUpperCase()}
								</div>
							)) || "loading"}
						</div>
					</div>
				</div>
			</section>
		</section>
	);
}

export default AboutPokemon;
