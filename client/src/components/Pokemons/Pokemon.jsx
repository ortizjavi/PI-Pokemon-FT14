import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchPokemonByID } from '../../redux/actions';
import s from './Pokemon.module.css';
import { GiWeight } from 'react-icons/gi';
import { FaRulerVertical } from 'react-icons/fa';

const setColorBack = (type) => {
	document.getElementsByTagName('body')[0]
		.style.backgroundColor = `var(--${type})`
}

const pokemonStats = ['hp', 'attack', 'defense', 'speed']

const spanishStat = {
	'hp' : 'salud',
	'attack' : 'ataque',
	'defense' : 'defensa',
	'speed' : 'velocidad'
}


const Pokemon = () => {
	const [pokemon, setPokemon] = useState(null);
	const pokeSearch = useSelector(state => state.searchedPokemon);
	let { id } = useParams();

	useEffect(() => {
		if (id && id !== 'search'){
			console.log(id);
			searchPokemonByID(id)
			.then((res) => setPokemon(res.data));
		}
	}, [id])

	useEffect(() => {
		if (pokeSearch){
			setPokemon(pokeSearch);
		}
	}, [pokeSearch])

	if (!pokemon)
		return (
			<div style={{color: 'white', fontWeight: '600'}}>
				Lo siento, no hemos podido capturar ese pokemon :(
			</div>
		)
	const mainType = pokemon.types.length ? 
						pokemon.types[0].name : 'normal';
	setColorBack(mainType);
	return (
		<div className={s.container}>
			<div 
			className={s.heroContainer}
			style={{backgroundImage: "url(./pokeball.svg)"}}
			>
				<img src={pokemon.img} alt={pokemon.name}/>
			</div>
			<div className={`${s.pokeDetails} ${s.flexDetails}`}>
				<div className={s.pokeTypes}>
					{pokemon.types.map(type => (
						<span 
						style={{backgroundColor: `var(--${type.name}`}}
						className={s.pokeType}
						>
						 {type.name} 
						</span>
					))}
				</div>
				<div className={s.pokeDimensions}>
					<span className={s.pokeDimension}>
						<GiWeight/>
						{pokemon.weight / 10} kg
						<span> Peso </span>
					</span>
					<span className={s.pokeDimension}>
						<FaRulerVertical/>
						{pokemon.height / 10} m
						<span> Altura </span>
					</span>
				</div>
				<table className={s.statContainer}>
					{ pokemonStats
						.filter(stat => pokemon[stat])
						.map(stat => (
							<tr>
								<td 
								className={s.statName} 
								style={{ color: `var(--${mainType})`}}
								> 
								{ spanishStat[stat].toUpperCase() } 
								</td>
								<td> { pokemon[stat] } </td>
								<td>
									<div className={s.statBar}>
										<div 
										style={{
											width: `${(pokemon[stat] / 200) * 100}%`,
											backgroundColor: `var(--${mainType})`
										}}>
										</div>
									</div>
								</td>
							</tr>
						))
					}
				</table>
			</div>
		</div>
	)
}

export default Pokemon;