export type Pokemon = {
	pokemonId: string;
	img: string;
	name: string;
};

export type Rating = {
	pokemonId: string;
	rating: number;
	review?: string;
};
export interface IFavourite {
	addToFavList(favouriteInfo: Pokemon): void;
	removeFromFavList(pokemonId: string): void;
	getUserList(): string[]; //must done so pokemons fav will shown in the first
}

export interface IRatingReview {
	addRatingReview(pokemonInfo: Rating): void;
	getPokemonRatings(pokemonId: string): number[];
}
