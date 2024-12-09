import { useState } from "react";
import { useGetPokemonByNameQuery } from "./services/pokemonApi";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pokemonName, setPokemonName] = useState<string>("");

  const {
    data: pokemon,
    isError,
    isLoading,
  } = useGetPokemonByNameQuery(pokemonName, {
    skip: !pokemonName?.trim(),
  });

  const handleSearch = () => {
    setPokemonName(searchTerm);
  };

  if (isError) return <p>There's an error</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {pokemon ? (
        <div>
          <img src={pokemon.sprites.front_default} />
          <br />
          <p>Name: {pokemon.name}</p>
          <p>Abilities:</p>
          <ul>
            {pokemon.abilities.map((a, i) => (
              <li key={i}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default App;
