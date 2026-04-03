import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { UserContext } from "../contexts/context";

function FavouritePage() {
	const { favourites } = useContext(UserContext);
	const queryClient = useQueryClient();

	const {
		isPending,
		error,
		data: favoritesList,
	} = useQuery({
		queryKey: ["favoritesList"],
		queryFn: () => favourites?.getUsersFavList(),
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
		<section className="bg-gray-200 h-screen flex justify-center items-center p-4">
			<section
				className="bg-white rounded-[30px] shadow-2xl border-2 border-gray-300 
                h-[90vh] w-[80%] flex flex-col gap-10 p-10 hover:shadow-2xl"
			>
				<h1
					className="font-black text-gray-800 text-4xl"
					style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
				>
					Your Favourites
				</h1>

				<div className="grid grid-cols-[repeat(3,minmax(250px,1fr))] gap-20 p-10 overflow-auto">
					{favoritesList?.map((favObj) => (
						<div
							className="flex flex-col justify-center items-center gap-4 p-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md"
							key={favObj.pokemonId}
						>
							<img
								alt={favObj.name}
								className="w-[80%] h-[80%] rounded-lg bg-gray-50"
								src={favObj.img}
							/>
							<div className="flex flex-col gap-3 justify-center items-center">
								<span className="text-lg font-semibold capitalize text-gray-900">
									{favObj.name}
								</span>
								<span className="text-lg text-gray-700">
									# {favObj.pokemonId}
								</span>

								<button
									className="text-sm font-semibold "
									onClick={() => {
										favourites?.removeFromFavList(favObj.pokemonId);
										queryClient.invalidateQueries({
											queryKey: ["favoritesList"],
										}); //to force it to refetch
									}}
									type="button"
								>
									<FaTrashAlt size={20} />
								</button>
							</div>
						</div>
					))}
				</div>
			</section>
		</section>
	);
}

export default FavouritePage;
