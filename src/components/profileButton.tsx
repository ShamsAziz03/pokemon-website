import { useNavigate } from "react-router-dom";

type buttonInfo = {
	icon: React.ElementType;
	label: string;
	goTo: string;
};

function ProfileButton(props: buttonInfo) {
	const navigate = useNavigate();

	return (
		<button
			className="bg-white rounded-[5px] border-2 border-gray-300 flex items-center gap-5 p-1 shadow-md font-semibold"
			onClick={() => navigate(props.goTo)}
			type="button"
		>
			<props.icon size={20} />
			{props.label}
		</button>
	);
}

export default ProfileButton;
