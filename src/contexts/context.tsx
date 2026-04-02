import { createContext } from "react";
import type { IFavourite, IRatingReview } from "../clasess/IUserFeatures";
import { LocalStorageUserFeatures } from "../clasess/LocalStorageUserFeatures";

export const UserContext = createContext<{
	favourites?: IFavourite;
	ratings?: IRatingReview;
}>({
	favourites: undefined,
	ratings: undefined,
});
//to prevent use any so we remove createContext<any>({}); and do like above

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const useLocalStorage = true;
	const favourites: IFavourite = useLocalStorage //here the imp must be of interface type
		? new LocalStorageUserFeatures("1")
		: new LocalStorageUserFeatures("1"); //put backend option later

	const ratings: IRatingReview = useLocalStorage
		? new LocalStorageUserFeatures("1")
		: new LocalStorageUserFeatures("1");

	return (
		<UserContext.Provider value={{ favourites: favourites, ratings: ratings }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
