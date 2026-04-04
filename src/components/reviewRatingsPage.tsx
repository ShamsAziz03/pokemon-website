import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/context";

function ReviewRatingsPage() {
	const { ratings } = useContext(UserContext);

	async function getImgName(pokemonId: string) {
		const details = await Axios.get(
			`https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
		);
		const pokemonDetails = {
			img: details.data.sprites.front_default,
			name: details.data.name.toUpperCase(),
		};
		return pokemonDetails;
	}

	async function getImgsNames() {
		const promises =
			ratingList?.map((review) => getImgName(review.pokemonId)) ?? []; //cause promise all expect [] and this could be undefiend
		const results = await Promise.all(promises);
		return results;
	}

	const {
		isPending,
		error,
		data: ratingList,
	} = useQuery({
		queryKey: ["ratingList"],
		queryFn: () => ratings?.getUserRatingsReview(),
	});

	const {
		isPending: isImagesNamesPending,
		error: imagesNamesError,
		data: imagesNamesList,
	} = useQuery({
		queryKey: ["imagesNamesList"],
		queryFn: () => getImgsNames(),
		enabled: !!ratingList && ratingList.length > 0,
	});
	if (isPending || isImagesNamesPending)
		return (
			<h1
				className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
				style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
			>
				Loading...
			</h1>
		);

	if (error || imagesNamesError)
		return (
			<h1
				className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
				style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
			>
				An error has occurred: {error?.message}
			</h1>
		);

	return (
		<section className="bg-gray-200 h-screen flex justify-center items-center p-4">
			<section
				className="bg-white rounded-[30px] shadow-2xl border-2 border-gray-300 
                h-[90vh] w-[80%] flex flex-col gap-10 p-10 hover:shadow-2xl"
			>
				<h1
					className="font-black text-gray-800 text-4xl"
					style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
				>
					Your Ratings and Reviews
				</h1>

				<div className="flex flex-col gap-20 p-10 overflow-auto justify-center items-center">
					{ratingList?.map((ratingObj, index) => (
						<div
							className="w-[100%] flex flex-row items-center gap-4 p-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md"
							key={ratingObj.pokemonId}
						>
							<img
								alt={imagesNamesList[index].img}
								className="w-16 h-16"
								src={imagesNamesList[index].img}
							/>

							<span className="text-xl font-semibold capitalize text-gray-900 mr-10">
								{imagesNamesList[index].name}
							</span>
							<div className="flex flex-col gap-3">
								<span className="text-lg font-semibold capitalize text-gray-900">
									Rating: {ratingObj.rating}
								</span>
								<span className="text-lg text-gray-700">
									Review: {ratingObj.review}
								</span>
							</div>
						</div>
					))}
				</div>
			</section>
		</section>
	);
}

export default ReviewRatingsPage;
