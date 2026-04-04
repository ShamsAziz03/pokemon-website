import type {
	IFavourite,
	IRatingReview,
	Pokemon,
	Rating,
} from "./IUserFeatures";

type Favourites = {
	userId: string;
	FavPokemonList: Pokemon[];
};

type userRatingReview = {
	userId: string;
	rating: number;
	review?: string;
};

type RatingsReviews = {
	pokemonId: string;
	pokemonRatingsReviews: userRatingReview[];
};

export class LocalStorageUserFeatures implements IFavourite, IRatingReview {
	userId: string;
	constructor(userId: string) {
		this.userId = userId;

		const intialFavList: Favourites[] = [];
		localStorage.setItem("favList", JSON.stringify(intialFavList));

		const intialRatingsReviewsList: RatingsReviews[] = [];
		localStorage.setItem(
			"ratingReviewsList",
			JSON.stringify(intialRatingsReviewsList),
		);
	}

	addToFavList(data: Pokemon) {
		const raw = localStorage.getItem("favList");
		let favList: Favourites[] = raw ? JSON.parse(raw) : [];
		const indexOfUser = favList.findIndex(
			(userObj) => userObj.userId === this.userId,
		);
		if (indexOfUser !== -1) {
			//check if pokemon exist
			const isAlreadyFav = favList[indexOfUser].FavPokemonList.some(
				(p) => p.pokemonId === data.pokemonId,
			);

			if (!isAlreadyFav) {
				favList[indexOfUser].FavPokemonList.push(data);
			}
		} else {
			favList.push({
				userId: this.userId,
				FavPokemonList: [{ ...data }],
			});
		}
		localStorage.setItem("favList", JSON.stringify(favList));
		console.log(JSON.stringify(favList, null, 2));
	}

	removeFromFavList(pokemonId: string): void {
		const raw = localStorage.getItem("favList");
		let favList: Favourites[] = raw ? JSON.parse(raw) : [];
		const userFavObject = favList.findIndex(
			(userObj) => userObj.userId === this.userId,
		);

		if (userFavObject !== -1) {
			const filteredList = favList[userFavObject].FavPokemonList.filter(
				(pokemon) => pokemon.pokemonId !== pokemonId,
			);
			favList[userFavObject].FavPokemonList = filteredList;
			localStorage.setItem("favList", JSON.stringify(favList));
			console.log(JSON.stringify(favList, null, 2));
		}
	}

	//change name to is pokemon in fav
	getUserList(): string[] {
		//return list of poks ids only
		const raw = localStorage.getItem("favList");
		let favList: Favourites[] = raw ? JSON.parse(raw) : [];
		const userObjectIndex = favList.findIndex(
			(userObj) => userObj.userId === this.userId,
		);
		if (userObjectIndex !== -1) {
			const favPokemons = favList[userObjectIndex].FavPokemonList.map(
				(pokemonObj) => pokemonObj.pokemonId,
			);
			return favPokemons;
		}
		return [];
	}

	//to return user's fav list to show it
	getUsersFavList(): Pokemon[] {
		//return list of poks ids only
		const raw = localStorage.getItem("favList");
		let favList: Favourites[] = raw ? JSON.parse(raw) : [];
		const userObjectIndex = favList.findIndex(
			(userObj) => userObj.userId === this.userId,
		);
		if (userObjectIndex !== -1) {
			return favList[userObjectIndex].FavPokemonList;
		}
		return [];
	}

	//implement review rating Interface functions
	addRatingReview(pokemonInfo: Rating) {
		const raw = localStorage.getItem("ratingReviewsList");
		let ratingReviewsList: RatingsReviews[] = raw ? JSON.parse(raw) : [];

		const indexOfPokemon = ratingReviewsList.findIndex(
			(pokemonObj) => pokemonObj.pokemonId === pokemonInfo.pokemonId,
		);
		if (indexOfPokemon !== -1) {
			//pokemon obj exist
			//check if user has rating obj
			const isUserRates = ratingReviewsList[
				indexOfPokemon
			].pokemonRatingsReviews.findIndex((obj) => obj.userId === this.userId);

			if (isUserRates === -1) {
				ratingReviewsList[indexOfPokemon].pokemonRatingsReviews.push({
					userId: this.userId,
					rating: pokemonInfo.rating,
					review: pokemonInfo.review,
				});
			} else {
				ratingReviewsList[indexOfPokemon].pokemonRatingsReviews[
					isUserRates
				].rating = pokemonInfo.rating;
				ratingReviewsList[indexOfPokemon].pokemonRatingsReviews[
					isUserRates
				].review = pokemonInfo.review;
			}
		} else {
			ratingReviewsList.push({
				pokemonId: pokemonInfo.pokemonId,
				pokemonRatingsReviews: [
					{
						userId: this.userId,
						rating: pokemonInfo.rating,
						review: pokemonInfo.review,
					},
				],
			});
		}
		localStorage.setItem(
			"ratingReviewsList",
			JSON.stringify(ratingReviewsList),
		);
		console.log(JSON.stringify(ratingReviewsList, null, 2));
	}

	getPokemonRatings(pokemonId: string) {
		const raw = localStorage.getItem("ratingReviewsList");
		let ratingReviewsList: RatingsReviews[] = raw ? JSON.parse(raw) : [];

		const indexOfPokemon = ratingReviewsList.findIndex(
			(pokemonObj) => pokemonObj.pokemonId === pokemonId,
		);

		if (indexOfPokemon !== -1) {
			return ratingReviewsList[indexOfPokemon].pokemonRatingsReviews.map(
				(userObj) => userObj.rating,
			);
		}
		return [];
	}

	getUserReview(
		pokemonReviews: userRatingReview[],
		pokemonId: string,
	): Rating | null {
		const userIndex = pokemonReviews.findIndex(
			(review) => review.userId === this.userId,
		);
		if (userIndex !== -1) {
			return {
				pokemonId: pokemonId,
				rating: pokemonReviews[userIndex].rating,
				review: pokemonReviews[userIndex].review,
			};
		} else {
			return null;
		}
	}

	getUserRatingsReview(): Rating[] {
		const raw = localStorage.getItem("ratingReviewsList");
		let ratingReviewsList: RatingsReviews[] = raw ? JSON.parse(raw) : [];

		const userReviewsRatings = ratingReviewsList
			.map((pokemonObj) =>
				this.getUserReview(
					pokemonObj.pokemonRatingsReviews,
					pokemonObj.pokemonId,
				),
			)
			.filter((review) => review !== null); //to remove nulls from array

		return userReviewsRatings;
	}
}
