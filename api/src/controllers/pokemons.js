const { Pokemon, Type } = require('../db.js');
const { Op, UniqueConstrainError } = require('sequelize');
const { apiPokemons } = require('../../services')
const { 
	API_DEFAULT_LIMIT
} = require('../../constants');
const errors = require('../../errors');
var Promise = require('bluebird');
const { v4: uuidv4 } = require('uuid');
uuidv4();

// include type's name
const include = {
	model: Type,
	attributes : ['name']
}

function createPokemon(req, res, next){
	const attr = req.body;

	let pokemon = Pokemon.create({
		...attr,
		id: uuidv4()
	})

	let { types } = req.body;
	if (!Array.isArray(types))
		types = [types]
	
	const typesQuery = Type.findAll({ where : {
		name : {
		 [Op.in] : types
		}
	}})

	Promise.all([pokemon, typesQuery])
	.then(results => {
		pokemon = results[0];
		return results[0].setTypes(results[1])
	}).then(() => {
		res.json(pokemon);
	}).catch(err => {
		if (err.errors){
			const { message } = err.errors[0];
			return next(errors.ERROR_BAD_REQUEST(message))
		}
		next(err);
	})
}

function getPokemons(req, res, next){
	if (req.query.hasOwnProperty('name')){
	  return getPokemonsByName(req, res, next);
	}

	let { limit, page } = req.query;
	limit = limit ? parseInt(limit) : API_DEFAULT_LIMIT;
	page = page > '0' ? parseInt(page) : 1;
	let offset = (page - 1) * limit;

	let pokemons = [];

	Pokemon.findAll({
		attributes : ['id','name','attack'], //,'img'
		include
	}).then(pokemonsDB => {
		const { length } = pokemonsDB;
		pokemons = pokemonsDB.slice(offset, limit);
		if (pokemons.length === limit){
			return res.json(pokemons);
		}
		offset -= length;
		limit -= pokemons.length;
		return apiPokemons.getPokemons(limit, offset + 1);
	}).then(pokemonsAPI => {
		if (pokemonsAPI){
			pokemons = pokemons.concat(pokemonsAPI);
			if (pokemons.length){
				res.json(pokemons)
			} else next(errors.POKEMON_NOT_FOUND())
		}
	}).catch((err) => {
		next(err);
	})
}

function getPokemonsById(req, res, next){
	const { id } = req.params;
	let promise;
	if (id.length > 10){
		promise = apiPokemons.getPokemonBy(id);
	} else {
		promise = Pokemon.findByPk(id, { 
			include
		});
	}

	Promise.resolve(promise)
	.then((pokemon) => {
		res.json(pokemon);
	}).catch((err) => {
		next(err);
	})
}


function getPokemonsByName(req, res, next){
	let { name } = req.query;
	name = name.toLowerCase();
	
	const pokemonDB = Pokemon.findOne({
		 where: {
		 	name : {
			 [Op.like] : name 
			}
		 },
		 include
	})
	const pokemonAPI = apiPokemons.getPokemonBy(name);

	const pokemons = [];

	pokemonDB.then( pokemon => {
		if (pokemon)
			pokemons.push(pokemon);
		return pokemonAPI;
	})
	.then((pokemon) => {
		pokemons.push(pokemon);
	}, (err) => {
		// no pokemonAPI :(
	})
	.finally(() => {
		if (pokemons.length)
			return res.json(pokemons[0]);
		next(errors.POKEMON_NOT_FOUND());
	})
}



module.exports = {
	'create' : createPokemon, 
	'get' : getPokemons,
	'getByID' : getPokemonsById
}