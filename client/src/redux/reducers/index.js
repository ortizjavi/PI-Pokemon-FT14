import * as a from '../actions/actionTypes';

const initialState = {
	pokemons: [],
	types: [],
	loadMorePokemons: true,
	filter: false,
	filteredPokemons: []
};


const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	let list;
	switch (type){
		case a.LOAD_TYPES:
			return {...state, types: payload};
		case a.LOAD_POKEMONS:
			return {...state, pokemons: state.pokemons.concat(payload), loadMorePokemons: false};
		case a.LOAD_MORE_POKEMONS:
			return {...state, loadMorePokemons: payload};
		case a.FILTER_BY_TYPE_FROM:
			list = payload.update ? state.pokemons : state.filteredPokemons;
			return {...state, filteredPokemons: list.filter(poke => {
				const from = poke.id.length > 10 ? 'DB' : 'API';
				const types = payload.types;
				return poke.types
					.filter(type => types.includes(type.name)).length
													 === types.length &&
					from === payload.from;
			}), filter: true}
		case a.FILTER_BY_TYPE:
			list = payload.update ? state.pokemons : state.filteredPokemons;
			return {...state, filteredPokemons: list.filter(poke => (
				poke.types
				.filter(type => payload.types.includes(type.name)).length 
													=== payload.types.length
			)), filter: true }
		case a.FILTER_BY_FROM:
			list = payload.update ? state.pokemons : state.filteredPokemons;
			return {...state, filteredPokemons: list.filter(poke => {
				const from = poke.id.length > 10 ? 'DB' : 'API';
				return from === payload.from;
			}), filter: true }

		case a.REMOVE_FILTER:
			return {...state, filter: false, filteredPokemons: []};
		default:
			return state;
	}
}

export default reducer;