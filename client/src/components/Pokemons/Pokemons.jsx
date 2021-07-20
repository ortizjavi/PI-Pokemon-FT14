import { Link } from 'react-router-dom';
import s from './Pokemons.module.css';

const getType = (types) => {
	return types[0].name;
}

const beautyID = (id) => {
	if(typeof id !== 'string')
		id += '';

	id = id.slice(-3);
	while(id.length < 3){
		id = '0' + id;
	}

	return `#${id}`;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const Pokemons = ({ pokemons }) => {
		let type = null;
		return (
			<div className={s.container}>
			<div className={s.pokeContainer}>
				{pokemons.map((pokemon, idx) => {
					{type = getType(pokemon.types)};
					return (
					<div 
						className={s.pokemon}
						style={{backgroundColor: `var(--${type})`}}
						key={idx}
					>
						<div className={s.pokeHeader}>
							<span 
								className={s.pokeID}
								style={{color: `var(--${type})`}}
							> {beautyID(pokemon.id)} </span>
							<div className={s.imageContainer}>
								<img src={pokemon.img} alt={pokemon.name}></img>
							</div>
						</div>
						<div className={s.pokeDetails}>
							<Link className={s.pokeName} to={`/pokemon/${pokemon.id}`}>
								{pokemon.name.capitalize()}
							</Link>
							<div className={s.pokeATT}>
								<span> ATAQUE </span>
								<span> {pokemon.attack} </span>
							</div>
							<div className={s.pokeBar}>
								<div 
								className={s.pokeStatus}
								style={{width: `${(pokemon.attack / 200) * 100}%`}}
								> </div>
							</div>
						</div>
					</div>
				)})}
			</div>
			</div>
		);
}

export default Pokemons;