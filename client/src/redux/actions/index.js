import * as a from './actionTypes';
import * as c from '../../config';
import axios from 'axios';


let pageNumber = c.POKEMONS_FIRST_PAGE;

export function getPokemonsPage(){
	return (dispatch) => {
		return axios.get(`${c.API_POKEMONS}?limit=${c.POKEMONS_PER_PAGE}&page=${pageNumber++}`)
		.then((response) => {
			const { data } = response;
			dispatch({type: a.LOAD_POKEMONS, payload: data});
			return dispatch({
				type: a.LOAD_MORE_POKEMONS,
				payload: data.length === c.POKEMONS_PER_PAGE
			});
		}).catch ((err) => {
			console.error(err);
			if (err.response.status === c.POKEMONS_NOT_FOUND_CODE){
				return dispatch({type: a.LOAD_MORE_POKEMONS, payload: false})
			}
		})
	}
}

export function getTypes(){
	return (dispatch) => {
		return axios.get(`${c.API_TYPES}`)
		.then((response) => {
			return dispatch({type: a.LOAD_TYPES, payload: response.data})
		}).catch ((err) => {
			console.error(err);
		})
	}
}

export function filter(types, from, update){
	console.log(types, from, update);
	return (dispatch) => {
		if (types.length){
			if (from){
				return dispatch({
					type: a.FILTER_BY_TYPE_FROM,
					payload: { types, from, update }
				})
			}
			return dispatch({
				type: a.FILTER_BY_TYPE,
				payload: { types, update }
			})
		}
		if (!from)
		 return dispatch(removeFilter());

		return dispatch({
			type: a.FILTER_BY_FROM,
			payload: { from, update }
		})
	}

}

export function removeFilter(){
	return {
		type: a.REMOVE_FILTER,
		payload: null
	}
}

