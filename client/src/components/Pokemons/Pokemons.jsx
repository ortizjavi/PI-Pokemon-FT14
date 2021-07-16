import s from './Pokemons.module.css';

// eslint-disable-next-line
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const Pokemons = ({ pokemons }) => {
		return (
			<div className={s.container}>
				{pokemons.map((pokemon, idx) => (
					<div className={s.pokemon} key={idx}>
						<span> {pokemon.name.capitalize()} </span>
						<img src={pokemon.img} alt={pokemon.name}></img>
					</div>
				))}
			</div>
		);
}

export default Pokemons;