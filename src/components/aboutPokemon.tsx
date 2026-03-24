import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AboutPokemon() {
  const location = useLocation();
  const data = location.state;
  const [pokemonDetails, setPokemonDetails]: any[] = useState([]);

  const aboutData = {
    about:
      "  The more sunlight Ivysaur bathes in, the more strength wells up within it, allowing the bud on its back to grow larger.",
    detailsData: {
      Height: "3' 03",
      Weight: "28.7 lbs",
      Category: "Seed",
      Abilities: "Overgrow",
      Gender: "Female",
    },
  };

  // Array of weaknesses
  const weaknesses: string[] = ["Fire", "Ice", "Flying", "Psychic"];

  useEffect(() => {
    let arr: any[] = [];
    for (let key in aboutData.detailsData) {
      if (
        ["Height", "Weight", "Category", "Abilities", "Gender"].includes(key)
      ) {
        arr.push(
          <div className="flex flex-row gap-5" key={key}>
            <p className="text-gary-400 text-sm font-medium"> {key} </p>
            <p
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
              className="font-bold text-gray-800 text-md"
            >
              {(aboutData.detailsData as any)[key]}
            </p>
          </div>,
        );
      }
    }
    setPokemonDetails(arr);
  }, []);

  return (
    <section className="bg-gray-200 h-[100vh] flex flex-row justify-center items-center">
      <section
        className="bg-gray-100 rounded-[20px] 
      shadow-xl border-2 border-gray-400 h-[90vh] w-[50%] grid [grid-template-rows:auto 1fr]
      grid-cols-2 justify-items-center items-center gap-8 p-8
      hover:shadow-2xl transition-shadow duration-300"
      >
        <h1
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          className="row-start-1 row-end-2 col-start-1 col-end-3 font-bold text-gray-800 text-2xl"
        >
          {data.name} {data.id}
        </h1>

        <img
          src={data.img}
          className="w-[100%] h-[80%] row-start-2 col-start-1 border-2 border-gray-400 rounded-[15px] shadow-inner"
        />

        <div className="row-start-2 col-start-2 flex flex-col gap-6">
          <h2
            id="aboutPokemon"
            className="text-gray-700 bg-gray-200 p-4 rounded-lg shadow-sm ring-1 ring-gray-300"
          >
            {aboutData.about}
          </h2>

          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))] gap-5 text-gray-700 bg-gray-200 p-4 rounded-lg shadow-sm border border-gray-300">
            {pokemonDetails}
          </div>
          <div>
            <p className="mb-3">Types</p>
            <div className="flex flex-row gap-5 flex-wrap">
              {data.types.map((type: string) => (
                <p
                  key={type}
                  className="text-sm font-semibold text-gray-900 bg-gray-300 rounded-lg shadow-md p-2 pl-4 pr-4 ring-1 ring-gray-400"
                >
                  {type}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3">Weakness</p>
            <div className="flex flex-row gap-5 flex-wrap">
              {weaknesses.map((weak) => (
                <div
                  key={weak}
                  className="text-sm font-semibold text-gray-900 bg-gray-300 rounded-lg shadow-md p-2 pl-4 pr-4 ring-1 ring-gray-400"
                >
                  {weak}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default AboutPokemon;
