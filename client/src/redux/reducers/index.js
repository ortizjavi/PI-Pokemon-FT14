import * as a from '../types';

const initialState = {
	loadMorePokemons: true,
	pokemons: [],
	types: [],
	filter: false,
	filteredPokemons: [],
	searchedPokemon: null
};


const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type){
		case a.LOAD_TYPES:
			return {...state, types: payload};
		case a.LOAD_POKEMONS:
			return {...state, pokemons: state.pokemons.concat(payload), loadMorePokemons: false};
		case a.LOAD_MORE_POKEMONS:
			return {...state, loadMorePokemons: payload};
		case a.FILTER_BY:
			return {...state, filteredPokemons: payload, filter: true};
		case a.REMOVE_FILTER:
			return {...state, filteredPokemons: [], filter: false};
		case a.ORDER_BY:
			return {...state, filteredPokemons: payload, filter: true};
		case a.ADD_SEARCHED_NAME:
			if (!payload) // no pokemon
				return {...state, searchedPokemon: null}
			if (state.pokemons.filter(poke => poke.id === payload.id).length)
				return {...state, searchedPokemon: payload}; // pokemon found in list
			// new pokemon found
			return {...state, searchedPokemon: payload, pokemons: state.pokemons.concat(payload)}
		default:
			return state;
	}
}

export default reducer;