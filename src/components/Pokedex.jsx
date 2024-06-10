import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PokemonCard from "./PokemonCard";
import DatosPokemon from "./DatosPokemon";

const Pokedex = () => {
  const [listaPokemons, setListaPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20; // Cantidad de Pokémon para cargar en cada carga adicional

  useEffect(() => {
    const leerPokemons = async () => {
      try {
        const datosSinFormato = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        const datosJson = await datosSinFormato.json();

        let pokemons = await Promise.all(
          datosJson.results.map(async (pokemon) => {
            const datosPokemonRaw = await fetch(pokemon.url);
            const datosPokemon = await datosPokemonRaw.json();
            return datosPokemon;
          })
        );
        setListaPokemons((prevPokemons) => [...prevPokemons, ...pokemons]);
      } catch (error) {
        Swal.fire("Error", "No se pudo conectar al API", "error");
        console.error(error);
      }
    };

    leerPokemons();
  }, [offset]); // Se ejecutará cada vez que cambie el offset

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setOffset((prevOffset) => prevOffset + limit);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="col-sm-12 col-lg-8 d-flex justify-content-center flex-wrap z-1 mt-5">
      {listaPokemons.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} onSelect={handlePokemonSelect} />
      ))}
      <DatosPokemon pokemon={selectedPokemon} />
    </section>
  );
};

export default Pokedex;