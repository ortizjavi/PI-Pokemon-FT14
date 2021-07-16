import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchPokemonByID } from '../../redux/actions';

const Pokemon = () => {
	const [pokemon, setPokemon] = useState(null);
	const pokeSearch = useSelector(state => state.searchedPokemon);
	let { id } = useParams();

	useEffect(() => {
		if (id !== 'search'){
			searchPokemonByID(id)
			.then((poke) => setPokemon(poke));
		}
	}, [id])

	useEffect(() => {
		if (pokeSearch){
			setPokemon(pokeSearch);
		}
	}, [pokeSearch])

	if (!pokemon)
		return (
			<div>
				Lo siento, no hemos podido capturar ese pokemon :(
			</div>
		)
	return (
		<div>
			{JSON.stringify(pokemon)}
		</div>
	)
}

export default Pokemon;