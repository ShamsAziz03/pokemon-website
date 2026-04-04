import type {
	IFavourite,
	IRatingReview,
	IUser,
	LoggedUser,
	Pokemon,
	Rating,
	UserInfo,
	UserStoredData,
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

type Users = {
	[email: string]: UserStoredData;
};

export class LocalStorageUserFeatures
	implements IFavourite, IRatingReview, IUser
{
	userId: string;
	constructor(userId: string = "0") {
		this.userId = userId;

		const rawFav = localStorage.getItem("favList");
		if (!rawFav) {
			const intialFavList: Favourites[] = [];
			localStorage.setItem("favList", JSON.stringify(intialFavList));
		}

		const rawRatings = localStorage.getItem("ratingReviewsList");
		if (!rawRatings) {
			const intialRatingsReviewsList: RatingsReviews[] = [];
			localStorage.setItem(
				"ratingReviewsList",
				JSON.stringify(intialRatingsReviewsList),
			);
		}

		const rawUsers = localStorage.getItem("users");
		if (!rawUsers) {
			const users: Users = {
				"shams@gmail.com": {
					id: "1",
					name: "shams",
					phone: "123456789",
					gender: "male",
					birthday: "1980-01-01",
					password: "123",
				},
			};
			localStorage.setItem("users", JSON.stringify(users));
		}
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

	//implement login signup functions - 3
	addUser(userInfo: UserInfo) {
		const raw = localStorage.getItem("users");
		let users: Users = raw ? JSON.parse(raw) : {};
		if (!users[userInfo.email]) {
			//user not exist - returned undefined
			users[userInfo.email] = {
				id: (Date.now() + Math.floor(Math.random() * 1000)).toString(),
				name: userInfo.name,
				phone: userInfo.phone,
				gender: userInfo.gender,
				birthday: userInfo.birthday,
				password: userInfo.password,
			};
			localStorage.setItem("users", JSON.stringify(users));
			return true;
		}
		return false; //email is used
	} //for signup

	editUserInfo(userInfo: LoggedUser) {
		const raw = localStorage.getItem("users");
		const usersObj: Users = raw ? JSON.parse(raw) : {};
		const usersArray = Object.entries(usersObj);
		let userExist = 0;
		usersArray.forEach((userKeyValueArray) => {
			if (userKeyValueArray[1].id === this.userId) {
				userExist = 1;
				const oldEmail = userKeyValueArray[0];
				usersObj[oldEmail].birthday = userInfo.birthday;
				usersObj[oldEmail].gender = userInfo.gender;
				usersObj[oldEmail].name = userInfo.name;
				usersObj[oldEmail].phone = userInfo.phone;

				if (oldEmail !== userInfo.email) {
					const newInfo = usersObj[oldEmail];
					usersObj[userInfo.email] = newInfo;
					delete usersObj[oldEmail];
				}
				localStorage.setItem("users", JSON.stringify(usersObj));
			}
		});
		if (userExist === 1) return true;
		return false;
	} // for edit profile

	isUserInSystem(email: string, password: string) {
		const raw = localStorage.getItem("users");
		let users: Users = raw ? JSON.parse(raw) : {};
		if (users[email] !== undefined && users[email].password === password) {
			return {
				name: users[email].name,
				phone: users[email].phone,
				gender: users[email].gender,
				birthday: users[email].birthday,
				password: users[email].password,
				email: email,
				id: users[email].id,
			};
		}
		return null; //user not exist
	}
}
