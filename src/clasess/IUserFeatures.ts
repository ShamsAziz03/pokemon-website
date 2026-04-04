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

export type UserStoredData = {
	// the data obj that stored in users obj
	id: string;
	name: string;
	phone: string;
	gender: string;
	birthday: string;
	password: string;
};

export type UserInfo = {
	//the data obj comes from user sign up
	name: string;
	phone: string;
	gender: string;
	birthday: string;
	password: string;
	email: string;
};

export type LoggedUser = UserInfo & {
	id: string;
};

export interface IFavourite {
	addToFavList(favouriteInfo: Pokemon): void;
	removeFromFavList(pokemonId: string): void;
	getUserList(): string[]; //must done so pokemons fav will shown in the first
	getUsersFavList(): Pokemon[];
}

export interface IRatingReview {
	addRatingReview(pokemonInfo: Rating): void;
	getPokemonRatings(pokemonId: string): number[];
	getUserRatingsReview(): Rating[];
}

//for login and signup features
export interface IUser {
	addUser(userInfo: UserInfo): boolean; //for signup
	editUserInfo(userInfo: LoggedUser): boolean; // for edit profile
	isUserInSystem(email: string): LoggedUser | null; //for login
	// not create function get all users, no create this instead since same bussiness
}
