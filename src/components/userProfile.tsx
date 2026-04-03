import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { UserContext } from "../contexts/context";

function UserProfile() {
	return (
		<section className="bg-gray-200 h-screen flex justify-center items-center p-4">
			<section
				className="bg-white rounded-[30px] shadow-2xl border-2 border-gray-300 
                h-[90vh] w-[80%] flex flex-col gap-10 p-10 hover:shadow-2xl"
			>
				<h1
					className="font-black text-gray-800 text-4xl"
					style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
				>
					Your Profile
				</h1>
			</section>
		</section>
	);
}

export default UserProfile;
