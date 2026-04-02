import type { IFavourite, Pokemon } from "./IUserFeatures";

type Favourites = {
	userId: string;
	FavPokemonList: Pokemon[];
};

export class LocalStorageUserFeatures implements IFavourite {
	userId: string;
	constructor(userId: string) {
		this.userId = userId;
		const intialFavList: Favourites[] = [];
		localStorage.setItem("favList", JSON.stringify(intialFavList));
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
				favList[indexOfUser].FavPokemonList.push({ ...data });
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
}
