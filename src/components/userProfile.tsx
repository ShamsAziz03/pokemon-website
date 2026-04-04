import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineFavorite, MdReviews } from "react-icons/md";
import { UserContext } from "../contexts/context";
import ProfileButton from "./profileButton";

function UserProfile() {
	const menuItems = [
		{ icon: CgProfile, label: "Edit Profile", goTo: "/editProfile" },
		{ icon: MdOutlineFavorite, label: "My Favorites", goTo: "/favouritePage" },
		{
			icon: MdReviews,
			label: "My Reviews and Ratings",
			goTo: "/reviewRatingsPage",
		},
		{ icon: IoIosLogOut, label: "Log Out", goTo: "/" },
	];

	const { loggedUser } = useContext(UserContext);

	return (
		<section className="bg-gray-200 flex flex-col gap-5 justify-center items-center p-4 h-[100vh]">
			<h1
				className="w-[50%] font-black text-gray-800 text-4xl"
				style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
			>
				Your Profile
			</h1>

			<div
				className="bg-white rounded-[30px] shadow-2xl border-2 border-gray-300 
                h-[80vh] w-[50%] flex flex-col justify-center items-center gap-6 p-10 hover:shadow-2xl"
			>
				<div className="flex flex-col justify-center items-center">
					<CgProfile size={100} />
					<h2 className="shadow-2xl text-xl text-gray-500 font-semibold">
						{loggedUser?.name}
					</h2>
					<p className="text-md text-gray-400 font-semibold">
						{loggedUser?.email}
					</p>
				</div>
				<div className="w-[100%] flex flex-col gap-5">
					{menuItems.map((item, index) => {
						return (
							<ProfileButton
								goTo={item.goTo}
								icon={item.icon}
								key={index}
								label={item.label}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default UserProfile;
