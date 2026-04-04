import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/context";

function LoginPage() {
	const navigate = useNavigate();
	const { authProvider, setLoggedUser } = useContext(UserContext);

	useEffect(() => {
		//let logged user={}
		setLoggedUser?.({
			name: "",
			phone: "",
			gender: "",
			birthday: "",
			password: "",
			email: "",
			id: "",
		});
	}, []);

	return (
		<section className="w-[100%] h-[100vh] bg-gray-200 flex flex-col justify-center items-center p-4">
			<h1
				className="w-[50%] mb-5 text-4xl font-black text-gray-800"
				style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
			>
				Login
			</h1>

			<div className="w-[50%] rounded-2xl bg-white border border-gray-300 shadow-xl p-8 flex flex-col gap-6">
				<form className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-semibold text-gray-700"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="rounded-lg border border-gray-300 px-4 py-3 focus:border-gary-500"
							id="email"
							name="email"
							placeholder="Enter your email"
							required
							type="email"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-semibold text-gray-700"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-500"
							id="password"
							name="password"
							placeholder="Enter your password"
							required
							type="password"
						/>
					</div>

					<button
						className="mt-2 rounded-lg bg-gray-600 py-3 text-white font-semibold hover:bg-gray-700"
						onClick={() => {
							const isExist = authProvider?.isUserInSystem(
								(document.getElementById("email") as HTMLInputElement).value,
								(document.getElementById("password") as HTMLInputElement).value,
							);
							if (isExist) {
								//not null
								setLoggedUser?.({
									name: isExist.name,
									phone: isExist.phone,
									gender: isExist.gender,
									birthday: isExist.birthday,
									password: isExist.password,
									email: isExist.email,
									id: isExist.id,
								});
								navigate("/home");
							} else {
								alert("Email or Password not Correct!");
							}
						}}
						type="button"
					>
						Login
					</button>
				</form>

				<button
					className="rounded-lg border border-gray-300 py-3 text-gray-700 font-medium hover:bg-gray-100"
					onClick={() => navigate("/signupPage")}
					type="button"
				>
					Sign Up
				</button>
			</div>
		</section>
	);
}

export default LoginPage;
