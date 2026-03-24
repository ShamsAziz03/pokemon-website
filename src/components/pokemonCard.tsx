import { useNavigate } from "react-router-dom";

type Pokemon = {
  img: string;
  name: string;
  id: string;
  types: string[];
};

function PokemonCard({ img, name, id, types }: Pokemon) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-[20px] shadow-xl border-2 border-black justify-center items-center hover:[transform:translateY(-10px)]">
      <img src={img} className="w-[60%] h-[230px] border-b-2 mb-5" />
      <section className="flex flex-col gap-3 justify-start items-start pl-8 pr-8 pb-5 w-[100%]">
        <p className="text-md font-bold text-gray-500">{id}</p>
        <p className="text-3xl font-bold">{name}</p>
        <div className="flex flex-wrap gap-4">
          {types.map((type) => {
            return (
              <p
                key={type}
                className="text-sm font-semibold text-black bg-gray-300 rounded-[10px] shadow-xl p-1 pl-4 pr-4"
              >
                {type}
              </p>
            );
          })}
        </div>
        <button
          className="text-md font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-1 mt-5 hover:bg-gray-400 border-2 hover:shadow-2xl hover:text-black"
          onClick={() => {
            const myData = {
              name: name,
              id: id,
              img: img,
              types: types,
            };
            navigate("/aboutPokemon", { state: { ...myData } });
          }}
        >
          Details
        </button>
      </section>
    </div>
  );
}

export default PokemonCard;
