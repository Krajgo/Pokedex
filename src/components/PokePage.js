import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NavigationContext from "../context/navigation";
import SearchBar from "./SearchBar";
import PokeSearch from "./PokeSearch";
import Details from "./Details";
import pokeLogo from "../pokeLogo.png";
import { TypeTable } from "./TypeTable";
import TypePlate from "./TypePlate";
function PokePage() {
  const { currentPath, navigate } = useContext(NavigationContext);
  const [pokemon, setPokemon] = useState();
  const [shownList, setShownList] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [pokemonChain, setPokemonChain] = useState([]);
  const [pokeType, setPokeType] = useState();
  const [pokeAbility, setPokeAbility] = useState([]);
  const fetchData = async (numer, eff) => {
    const data = await PokeSearch(numer);
    setPokemon(data);
    evoChain(data.advanced.data.evolution_chain.url);
    setPokeType(data.basic.data.types);
    abilities(data.basic.data.abilities);
    setShownList([]);
    if (!eff) {
      if (currentPath !== `/${numer}`) navigate(`/${numer}`);
    }
  };
  const reset = () => {
    setPokemon("");
    navigate("/");
  };
  const onTypeClick = async (url, eff) => {
    PokeList2(await fetchArray(url));
    setPokemon("");
    const urlNumber = url.slice(url.lastIndexOf("e") + 2, url.length - 1);
    if (!eff) {
      if (currentPath !== `/type/${TypeTable[urlNumber - 1]}`)
        navigate(`/type/${TypeTable[urlNumber - 1]}`);
    }
  };
  const abilities = async (arr) => {
    const mappedAbilities = await Promise.all(
      arr.map(async (ability) => {
        const response = await axios.get(`${ability.ability.url}`);
        return {
          name: response.data.name,
          effect: response.data.flavor_text_entries[7]
            ? response.data.effect_entries[1]
              ? response.data.effect_entries[1].language.name === "en"
                ? response.data.effect_entries[1].effect
                : response.data.effect_entries[0].effect
              : response.data.flavor_text_entries[7].flavor_text
            : "no data",
        };
      })
    );
    setPokeAbility(mappedAbilities);
  };
  const evoChain = async (data) => {
    const response = await axios.get(`${data}`);
    const chainArray = [];
    const printChain = (chain) => {
      const url = chain.species.url;
      const urlNumber = url.slice(url.lastIndexOf("s") + 2, url.length - 1);
      chainArray.push(urlNumber);
      if (chain.evolves_to[0]) {
        chain.evolves_to.forEach((element) => {
          printChain(element);
        });
      }
    };
    printChain(response.data.chain);
    const mappedChain = chainArray.map((element) => {
      return (
        <div key={element}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element}.png`}
            alt="elo"
            className="w-24 cursor-pointer"
            onClick={() => {
              navigate(`/${element}`);
            }}
          />
        </div>
      );
    });
    setPokemonChain(mappedChain);
  };
  const fetchArray = async (url) => {
    const response = await axios.get(url);
    return response.data.pokemon;
  };
  const PokeList2 = async (response) => {
    const mappedResponse = response.map((pokemon) => {
      const ind = pokemon.pokemon.url;
      const index = ind.slice(ind.lastIndexOf("n") + 2, ind.length - 1);
      if (index < 1011) {
        const name = pokemon.pokemon.name
          .slice(0, 1)
          .toUpperCase()
          .concat(pokemon.pokemon.name.slice(1));
        return (
          <div
            className="listItem"
            onClick={() => {
              navigate(`/${index}`);
            }}
            key={index}
          >
            #{index} {name}{" "}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
              alt="elo"
              className="w-24"
            />
          </div>
        );
      } else return "";
    });
    setShownList(mappedResponse);
  };
  const PokeList3 = (response) => {
    const mappedResponse = response.map((pokemon) => {
      const ind = pokemon.url;
      const index = ind.slice(ind.lastIndexOf("n") + 2, ind.length - 1);
      if (index < 1011) {
        const name = pokemon.name
          .slice(0, 1)
          .toUpperCase()
          .concat(pokemon.name.slice(1));
        return (
          <div
            className="listItem"
            onClick={() => {
              navigate(`/${index}`);
            }}
            key={index}
          >
            #{index} {name}{" "}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
              alt="elo"
              className="w-24"
            />
          </div>
        );
      } else return "";
    });
    setShownList(mappedResponse);
    setPokemon("");
  };

  const filtr = (term, eff) => {
    const result = fullList.filter((pokemon) => pokemon.name.includes(term));
    PokeList3(result);
    if (!eff) {
      if (currentPath !== `/search=${term}`) navigate(`/search=${term}`);
    }
  };

  const PokeList = async (url, srch) => {
    const response = await axios.get(url);
    const mappedResponse = response.data.results.map((pokemon, index) => {
      const name = pokemon.name
        .slice(0, 1)
        .toUpperCase()
        .concat(pokemon.name.slice(1));
      return (
        <div
          className="listItem"
          onClick={() => {
            navigate(`/${index + 1}`);
          }}
          key={index + 1}
        >
          #{index + 1} {name}{" "}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`}
            alt="elo"
            className="w-24"
          />
        </div>
      );
    });
    if (!srch) {
      setShownList(mappedResponse);
    }
    setFullList(response.data.results);
    setPokemon("");
  };

  const TypePathNames = TypeTable.map((type) => `/type/${type}`);
  const TypeMenu = TypeTable.map((type) => {
    let isActive = 0;
    if (type === currentPath.slice(currentPath.indexOf("e") + 2)) {
      isActive = 1;
    }
    return (
      <TypePlate
        key={type}
        typ={type}
        isActive={isActive}
        onClick={() => {
          navigate(`/type/${type}`);
        }}
      />
    );
  });
  useEffect(() => {
    if (currentPath === "/")
      PokeList(`https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0`);
    else if (currentPath.slice(1) > 0 && currentPath.slice(1) < 1011) {
      fetchData(currentPath.slice(1), 1);
      if (!fullList.length)
        PokeList("https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0", 1);
    } else if (TypePathNames.includes(currentPath))
      onTypeClick(
        `https://pokeapi.co/api/v2/type/${
          TypeTable.indexOf(currentPath.slice(currentPath.indexOf("e") + 2)) + 1
        }/`
      );
    else if (currentPath.includes("/search="))
      filtr(currentPath.slice(currentPath.lastIndexOf("=") + 1), 1);
  }, [navigate]);

  return (
    <div className="bg-purple-100 ">
      <div className="topPanel">
        <img src={pokeLogo} className="logo" alt="logo" onClick={reset}></img>
        <SearchBar
          onSubmit={(term) => {
            filtr(term);
          }}
        />
        <div className="placeholder"></div>
      </div>
      <div className="flex justify-center">
        <div className="typeMenu">{TypeMenu}</div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="grid gap-4 grid-cols-5 justify-center flex">
          {shownList}
        </div>
        <Details
          pokemon={pokemon}
          pokeAbility={pokeAbility}
          pokeType={pokeType}
          pokemonChain={pokemonChain}
          onTypeClick={onTypeClick}
        />
      </div>
    </div>
  );
}

export default PokePage;
