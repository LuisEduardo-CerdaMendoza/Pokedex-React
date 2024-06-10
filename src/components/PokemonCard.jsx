
import "./PokemonCard.css";

const PokemonCard = ({ pokemon, onSelect }) => {
  const handleCardClick = () => {
    onSelect(pokemon);
  };

  return (
    <div className="card col-sm-5 p-3 col-md-2 m-3 pb-1  rounded border border-secondary d-flex flex-column align-items-center" onClick={handleCardClick}>
      <p className="col-12 text-end fs-4 text-light">#{pokemon.id}</p>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="col-10"
      />
      <p className='text-center text-light'>{pokemon.name}</p>
    </div>
  );
};

export default PokemonCard;