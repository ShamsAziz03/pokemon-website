import { createContext } from "react";
import type { IFavourite } from "../clasess/IUserFeatures";
import { LocalStorageUserFeatures } from "../clasess/LocalStorageUserFeatures";

export const UserContext = createContext<{ imp?: IFavourite }>({
	imp: undefined,
});
//to prevent use any so we remove createContext<any>({}); and do like above

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const useLocalStorage = true;
	const implementation: IFavourite = useLocalStorage //here the imp must be of interface type
		? new LocalStorageUserFeatures("1")
		: new LocalStorageUserFeatures("1"); //put backend option later

	return (
		<UserContext.Provider value={{ imp: implementation }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
