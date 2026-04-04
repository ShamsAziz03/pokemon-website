import { useContext, useState } from "react";
import { UserContext } from "../contexts/context";

function EditProfile() {
	const { loggedUser, authProvider, setLoggedUser } = useContext(UserContext);
	const [name, setName] = useState(loggedUser?.name ?? "");
	const [email, setEmail] = useState(loggedUser?.email ?? "");
	const [phone, setPhone] = useState(loggedUser?.phone ?? "");
	const [gender, setGender] = useState(loggedUser?.gender ?? "female");
	const [birthday, setBirthday] = useState(loggedUser?.birthday ?? "");

	return (
		<section className="bg-gray-200 flex flex-col gap-5 justify-center items-center p-4 h-[100vh]">
			<h1
				className="w-[50%] font-black text-gray-800 text-4xl"
				style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
			>
				Edit Profile
			</h1>
			<form className="w-[50%] h-[85vh] rounded-2xl bg-white p-8 shadow-lg border border-gray-200 flex flex-col justify-center gap-6">
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700" htmlFor="name">
						Name
					</label>
					<input
						className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gary-500 focus:ring-2 focus:ring-gary-200"
						id="name"
						name="name"
						onChange={(e) => setName(e.target.value)}
						required
						type="text"
						value={name}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700" htmlFor="email">
						Email
					</label>
					<input
						className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gary-500 focus:ring-2 focus:ring-gary-200"
						id="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						required
						type="email"
						value={email}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700" htmlFor="phone">
						Phone
					</label>
					<input
						className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gary-500 focus:ring-2 focus:ring-gary-200"
						id="phone"
						name="phone"
						onChange={(e) => setPhone(e.target.value)}
						required
						type="text"
						value={phone}
					/>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="gender"
						>
							Gender
						</label>
						<select
							className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gary-500 focus:ring-2 focus:ring-gary-200"
							id="gender"
							name="gender"
							onChange={(e) => setGender(e.target.value)}
							value={gender}
						>
							<option value="female">Female</option>
							<option value="male">Male</option>
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="birthday"
						>
							Birthday
						</label>
						<input
							className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gary-500 focus:ring-2 focus:ring-gary-200"
							id="birthday"
							name="birthday"
							onChange={(e) => setBirthday(e.target.value)}
							type="date"
							value={birthday}
						/>
					</div>
				</div>

				<button
					className="mt-4 rounded-lg bg-gray-700 px-5 py-2.5 text-white font-medium hover:bg-gary-700 transition"
					onClick={() => {
						if (loggedUser) {
							const success = authProvider?.editUserInfo({
								name: name,
								phone: phone,
								gender: gender,
								birthday: birthday,
								password: "",
								email: email,
								id: loggedUser.id,
							});
							if (success) {
								setLoggedUser?.({
									name: name,
									phone: phone,
									gender: gender,
									birthday: birthday,
									password: loggedUser.password,
									email: email,
									id: loggedUser.id,
								});
								alert("Update Success");
							} else alert("Error Happened");
						}
					}}
					type="button"
				>
					Submit
				</button>
			</form>
		</section>
	);
}
export default EditProfile;
