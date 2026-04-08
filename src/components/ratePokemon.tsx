import { useContext, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { UserContext } from "../contexts/context";

function RatePokemon() {
	const location = useLocation();
	const pokemonObj = location.state || { name: "Pokemon", img: "", id: "0" };
	const { ratings } = useContext(UserContext);

	const [rating, setRating] = useState(1);
	const [review, setReview] = useState("");

	function getStars(rating: number) {
		let stars = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				stars.push(
					<button key={i} onClick={() => setRating(i)}>
						<FaStar color="#facc15" size={30} />
					</button>,
				);
			} else
				stars.push(
					<button key={i} onClick={() => setRating(i)}>
						<FaRegStar color="#9ca3af" size={30} />
					</button>,
				);
		}
		return stars;
	}

	return (
		<section className="bg-gray-200 h-screen flex justify-center items-center p-4">
			<section
				className="bg-white rounded-[30px] shadow-2xl border-2 border-gray-300 
                h-[85vh] w-[60%] grid grid-cols-2 grid-rows-[auto_1fr] 
                gap-x-8 p-10 hover:shadow-2xl"
			>
				<div className="col-span-2 flex justify-center items-center pb-6 border-b border-gray-200 mb-4">
					<h1
						className="font-black text-gray-800 text-4xl"
						style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
					>
						{pokemonObj.name}
						<span className="text-gray-400 font-bold">{pokemonObj.id}</span>
					</h1>
				</div>

				<div className="flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-200 p-6">
					<img
						alt="how the pokemon looks like"
						className="w-full h-auto"
						src={pokemonObj.img}
					/>
				</div>

				<div className="flex flex-col justify-start gap-10 py-4">
					<div className="flex flex-col gap-3">
						<span className="text-2xl font-bold text-gray-700">Rating:</span>
						<div className="flex gap-2">{getStars(rating)}</div>
					</div>

					<div className="flex flex-col gap-3">
						<span className="text-2xl font-bold text-gray-700">Review:</span>
						<textarea
							className="w-full flex-grow min-h-[150px] p-4 rounded-xl border-2 border-gray-300 
                            bg-gray-50 shadow-sm text-lg"
							onInput={(event: React.InputEvent<HTMLTextAreaElement>) =>
								setReview(event.currentTarget.value)
							}
							placeholder="Write Your Review here..."
							value={review}
						/>
					</div>

					<button
						className="bg-gray-800 text-white font-bold py-4 rounded-xl hover:bg-black"
						onClick={() => {
							ratings?.addRatingReview({
								pokemonId: pokemonObj.id.trim().split(" ")[1],
								rating: rating,
								review: review,
							});
							alert("Your review Submitted");
						}}
					>
						Submit Review
					</button>
				</div>
			</section>
		</section>
	);
}

export default RatePokemon;
