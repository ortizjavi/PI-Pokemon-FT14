const NOT_FOUND_CODE = 404;
const BAD_REQUEST_CODE = 400;

const ERROR_BAD_REQUEST = (message) => ({
	status: BAD_REQUEST_CODE,
	message: message || 'Bad request'
})

const POKEMON_NOT_FOUND = (message) => ({
	status: NOT_FOUND_CODE,
	message: message || 'Pokemon not found'
})

module.exports = {
	POKEMON_NOT_FOUND,
	ERROR_BAD_REQUEST
}