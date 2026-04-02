export type Pokemon = {
	pokemonId: string;
	img: string;
	name: string;
};
//must store the user id with its fav arrayof pokemons

export interface IFavourite {
	addToFavList(favouriteInfo: Pokemon): void;
	removeFromFavList(pokemonId: string): void;
	getUserList(): string[]; //must done so pokemons fav will shown in the first
}
