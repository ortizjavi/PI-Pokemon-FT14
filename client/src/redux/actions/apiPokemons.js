import * as a from '../types';
import * as c from '../../config';
import axios from 'axios';


let pageNumber = c.POKEMONS_FIRST_PAGE;

export function getPokemonsPage(){
	return (dispatch) => {
		axios.get(`${c.API_POKEMONS}?limit=${c.POKEMONS_PER_PAGE}&page=${pageNumber++}`)
		.then((response) => {
			const { data } = response;
			dispatch({type: a.LOAD_POKEMONS, payload: data});
			return dispatch({
				type: a.LOAD_MORE_POKEMONS,
				payload: data.length === c.POKEMONS_PER_PAGE
			});
		}).catch ((err) => {
			if (err.response && err.response.status === c.POKEMONS_NOT_FOUND_CODE){
				console.log('NO MORE POKEMONS :(');
			} else {
				console.error(err);
			}
			return dispatch({type: a.LOAD_MORE_POKEMONS, payload: false})
		})
	}
}

export function getTypes(){
	return (dispatch) => {
		axios.get(`${c.API_TYPES}`)
		.then((response) => {
			return dispatch({type: a.LOAD_TYPES, payload: response.data})
		}).catch ((err) => {
			console.error(err);
		})
	}
}


export function searchPokemonByName(name){
	return (dispatch) => {
		axios.get(`${c.API_POKEMONS}?${c.QUERY_NAME_POKEMON}${name}`)
		.then(response => {
			return dispatch({
				type: a.ADD_SEARCHED_NAME,
				payload: response.data
			})
		}).catch(err => {
			return dispatch({
				type: a.ADD_SEARCHED_NAME,
				payload: null
			})
		})
	}
}

export function searchPokemonByID(id){
	return axios.get(`${c.API_POKEMONS}/${id}`)
}

export function postPokemon(values){
	return (dispatch) => {
		axios.post(`${c.API_POKEMONS}`, values)
		.then(response => {
			return dispatch({
				type: a.CREATED_POKEMON,
				payload: response.data
			})
		}).catch(err => {
			return dispatch({
				type: a.ERROR_CREATED_POKEMON,
				payload: err.response
			})
		})
	}
}

export function resetCreated(){
	return (dispatch) => (
		dispatch({
			type: a.RESET_CREATED_POKEMON
		})
	)
}