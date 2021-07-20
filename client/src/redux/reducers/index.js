import * as a from '../types';

const initialState = {
	pokemons: [],
	loadMorePokemons: true,
	types: [],
	filteredPokemons: [],
	filter: false,
	searchedPokemon: null,
	createdPokemon : undefined
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
			return {...state, searchedPokemon: payload, pokemons: state.pokemons.concat(payload)};
		case a.CREATED_POKEMON:
			return {...state, pokemons: [payload].concat(state.pokemons), createdPokemon: payload};
		case a.ERROR_CREATED_POKEMON:
			return {...state, createdPokemon: payload};
		case a.RESET_CREATED_POKEMON:
			return {...state, createdPokemon: null};
		default:
			return state;
	}
}

export default reducer;