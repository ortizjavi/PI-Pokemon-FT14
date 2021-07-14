const { 
	API_POKEMONS_ENDPOINT,
	API_DEFAULT_LIMIT,
	API_ID_LIMIT
} = require('../constants.js');
const axios = require('axios');
var Promise = require('bluebird');

function getPokemonAttributes(obj){
	const {
		id,
		name,
		hp,
		img,
		attack,
		defense,
		speed,
		weight,
		height,
		types
	} = obj;
	return {
		id, name, hp, img,
		attack, defense, speed,
		weight, height, types
	}
}

function flatStats(statsObj){
	return statsObj.reduce((stats, stat) => {
		stats[stat.stat.name] = stat.base_stat;
		return stats;
	}, {})
}


function flatTypes(typesObj){
	return typesObj.map((type) => {
		return { 'name' : type.type.name }
	})
}

function formatResponseToPokemon(response){
	const { data } = response;
	data.types = flatTypes(data.types);
	const stats = flatStats(data.stats)
	data.img = data.sprites.front_default;

	return getPokemonAttributes({
		...data, 
		...stats
	});
}

function getPokemonBy(by){
	return new Promise((resolve, reject) => {
		axios.get(`${API_POKEMONS_ENDPOINT}${by}`)
		.then(response => {
			resolve(formatResponseToPokemon(response));
		})
		.catch(err => {
			reject(err);
		})
	})
}

function getPokemons(limit = API_DEFAULT_LIMIT, offset = 1){
	return new Promise((resolve, reject) => {
		offset = offset > 0 ? offset : 1;
		limit = limit > 0 ? limit : API_DEFAULT_LIMIT;
		const pokemons = [];
		Promise.each(
			[...Array(limit)], (value, idx) => {
				const id = offset + idx;

				if (id > API_ID_LIMIT){
					return [];
				}
				return axios.get(`${API_POKEMONS_ENDPOINT}${id}`)
				.then(response => pokemons.push(formatResponseToPokemon(response)))
				.catch(err => undefined) // no pokemonAPI
			}
		).then(() => {
			resolve(pokemons);
		}).catch(err => {
			reject(err);
		})
	});
}

module.exports = {getPokemons, getPokemonBy};