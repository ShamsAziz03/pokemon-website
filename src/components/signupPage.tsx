import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/context";

function SignUpPage() {
	const navigate = useNavigate();
	const { authProvider } = useContext(UserContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState("female");
	const [birthday, setBirthday] = useState("");
	const [password, setPassword] = useState("");

	return (
		<section className="w-[100%] h-[100vh] bg-gray-200 flex flex-col justify-center items-center p-4">
			<h1
				className="w-[50%] mb-5 text-4xl font-black text-gray-800"
				style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
			>
				Sign Up
			</h1>

			<form className="w-[50%] h-[85vh] rounded-2xl bg-white border border-gray-300 shadow-xl p-8 flex flex-col justify-center gap-5">
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700" htmlFor="name">
						Name
					</label>
					<input
						className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
						id="name"
						name="name"
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter your name"
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
						className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
						id="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
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
						className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
						id="phone"
						name="phone"
						onChange={(e) => setPhone(e.target.value)}
						placeholder="Enter your phone"
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
							className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
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
							className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
							id="birthday"
							name="birthday"
							onChange={(e) => setBirthday(e.target.value)}
							type="date"
							value={birthday}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<label
						className="text-sm font-medium text-gray-700"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
						id="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
						type="password"
						value={password}
					/>
				</div>

				<button
					className="mt-2 rounded-lg bg-gray-600 py-3 text-white font-semibold hover:bg-gray-700 transition"
					onClick={() => {
						const addUser = authProvider?.addUser({
							name: name,
							email: email,
							phone: phone,
							gender: gender,
							birthday: birthday,
							password: password,
						});
						if (addUser) {
							alert("Sign up Success.");
							navigate("/");
						} else {
							alert("This Email is Already Used, Choose another one.");
						}
					}}
					type="button"
				>
					Sign Up
				</button>

				<button
					className="rounded-lg border border-gray-300 py-3 text-gray-700 font-medium hover:bg-gray-100 transition"
					onClick={() => navigate("/")}
					type="button"
				>
					Back to Login
				</button>
			</form>
		</section>
	);
}

export default SignUpPage;
