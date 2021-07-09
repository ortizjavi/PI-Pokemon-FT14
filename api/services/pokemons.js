const { 
	API_POKEMONS_ENDPOINT,
	API_DEFAULT_LIMIT
} = require('../constants.js');
const axios = require('axios');
var Promise = require('bluebird');

function getPokemonAttributes(obj){
	const {
		id,
		name,
		hp,
		attack,
		defense,
		speed,
		weight,
		height,
		types
	} = obj;
	return {
		id, name, hp,
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
			[...Array(limit)], (value, idx) => (
				axios.get(`${API_POKEMONS_ENDPOINT}${offset + idx}`)
				.then(response => pokemons.push(formatResponseToPokemon(response)))
				.catch(err => console.log(err.response.status)) // no pokemonAPI
			)
		).then(() => {
			resolve(pokemons);
		}).catch(err => {
			reject(err);
		})
	});
}

module.exports = {getPokemons, getPokemonBy};