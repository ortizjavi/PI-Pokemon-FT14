import * as a from '../types';

export function filter(types, from, pokemons){
	return (dispatch) => {
		let payload;
		if (types.length){
			if (from){
				payload = filterByTypeFrom(types, from, pokemons);
			} else {
				payload = filterByType(types, pokemons)
			}
		} else if (from){
			payload = filterByFrom(from, pokemons);
		} else return dispatch(removeFilter());
		dispatch({
			type: a.FILTER_BY,
			payload
		})
	}
}



function filterByTypeFrom(types, from, list){
	return list.filter(poke => {
		const fromPoke = poke.id.length > 10 ? 'DB' : 'API';
		return (
			poke.types
			.filter(type => 
				types.includes(type.name)).length === types.length &&
													fromPoke === from
		);
	})
}

function filterByType(types, list){
	return list.filter(poke => (
		poke.types
		.filter(type => types.includes(type.name)).length 
											=== types.length
	))
}

function filterByFrom(from, list){
	return list.filter(poke => {
		const fromPoke = poke.id.length > 10 ? 'DB' : 'API';
		return fromPoke === from;
	})
}


function removeFilter(){
	return {
		type: a.REMOVE_FILTER,
		payload: null
	}
}