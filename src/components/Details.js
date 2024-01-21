import TypePlate from "./TypePlate";
import { TypeChart } from "./TypeChart";
import StatBar from "./StatBar";
import Ability from "./Ability";

function Details({
  pokemon,
  pokemonChain,
  pokeType,
  pokeAbility,
  onTypeClick,
}) {
  if (!pokemon) return null;
  const { basic } = pokemon;
  const mappedTypes = pokeType.map((element) => {
    return (
      <TypePlate
        key={element.slot}
        typ={element.type.name}
        onClick={() => {
          onTypeClick(element.type.url);
        }}
      />
    );
  });
  const typeArray = [];
  const typeRelationsArray = [];
  for (const typ in TypeChart) {
    typeArray.push(
      <th key={typ}>
        <TypePlate notClickable rotate typ={typ} />
      </th>
    );
  }
  for (const typ in TypeChart) {
    let value = 1;
    for (const sub in TypeChart[typ]) {
      if (sub === pokeType[0].type.name) {
        value *= TypeChart[typ][sub];
      }
      if (pokeType[1]) {
        if (sub === pokeType[1].type.name) {
          value *= TypeChart[typ][sub];
        }
      }
    }
    typeRelationsArray.push(<td key={typ}>{value}</td>);
  }
  const name = basic.data.name
    .slice(0, 1)
    .toUpperCase()
    .concat(basic.data.name.slice(1));
  const mappedStats = basic.data.stats.map((stat, index) => {
    return <StatBar key={index} stat={stat.stat.name} value={stat.base_stat} />;
  });
  const mappedAbilities = pokeAbility.map((ability, index) => {
    return <Ability ability={ability} key={index} />;
  });

  return (
    <div className="bg-purple-100 h-screen">
      <div className="font-bold text-5xl"> {name}</div>
      <div className="text-lg font-semibold"> Type:</div>
      <div className="flex">{mappedTypes}</div>
      <div className="flex">
        <div className="flex">
          <img
            src={basic.data.sprites.other["official-artwork"].front_default}
            alt="elo"
            className="w-64 "
          />
          <img
            src={basic.data.sprites.other["official-artwork"].front_shiny}
            alt="elo"
            className="w-64 "
          />
        </div>
        <div>
          <div className="flex flex-col ">
            <div className="flex space-x-2">
              <div className="text-xl font-bold"> Abilities:</div>
              <div>{mappedAbilities}</div>
            </div>
          </div>
          <div className="w-[500px]">
            <table className="w-full table-fixed">
              <tbody>{mappedStats}</tbody>
            </table>
          </div>
        </div>
      </div>

      <table className="table table-auto bg-gray-500 text-center border-separate ">
        <thead className="bg-gray-300">
          <tr>{typeArray}</tr>
        </thead>
        <tbody>
          <tr className="bg-gray-300">{typeRelationsArray}</tr>
        </tbody>
      </table>

      <div className="text-lg font-semibold"> Evolution:</div>
      <div className="flex flex-row ">{pokemonChain}</div>
    </div>
  );
}

export default Details;
