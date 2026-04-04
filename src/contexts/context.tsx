import { createContext, useState } from "react";
import type {
	IFavourite,
	IRatingReview,
	IUser,
	LoggedUser,
} from "../clasess/IUserFeatures";
import { LocalStorageUserFeatures } from "../clasess/LocalStorageUserFeatures";

export const UserContext = createContext<{
	favourites?: IFavourite;
	ratings?: IRatingReview;
	authProvider?: IUser;
	loggedUser?: LoggedUser;
	setLoggedUser?: (userInfo: LoggedUser) => void;
}>({
	favourites: undefined,
	ratings: undefined,
	authProvider: undefined,
	loggedUser: undefined,
	setLoggedUser: undefined,
});

//to prevent use any so we remove createContext<any>({}); and do like above

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [loggedUser, setLoggedUser] = useState({
		name: "",
		phone: "",
		gender: "",
		birthday: "",
		password: "",
		email: "",
		id: "",
	});
	const currentUserId = loggedUser?.id || "0";

	const useLocalStorage = true;
	const favourites: IFavourite = useLocalStorage //here the imp must be of interface type
		? new LocalStorageUserFeatures(currentUserId)
		: new LocalStorageUserFeatures(currentUserId); //put backend option later

	const ratings: IRatingReview = useLocalStorage
		? new LocalStorageUserFeatures(currentUserId)
		: new LocalStorageUserFeatures(currentUserId);

	const authProvider: IUser = useLocalStorage
		? new LocalStorageUserFeatures(currentUserId)
		: new LocalStorageUserFeatures(currentUserId);

	return (
		<UserContext.Provider
			value={{
				favourites: favourites,
				ratings: ratings,
				authProvider: authProvider,
				loggedUser: loggedUser,
				setLoggedUser: setLoggedUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
