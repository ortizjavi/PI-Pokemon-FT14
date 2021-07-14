const API_BASE_URL = 'https://pokeapi.co/api/v2';

const API_TYPES_ENDPOINT = `${API_BASE_URL}/type`;

const API_POKEMONS_ENDPOINT = `${API_BASE_URL}/pokemon/`;

const API_DEFAULT_LIMIT = 12;

const API_ID_LIMIT = 40;

module.exports = {
	API_POKEMONS_ENDPOINT,
	API_TYPES_ENDPOINT,
	API_DEFAULT_LIMIT,
	API_ID_LIMIT
};