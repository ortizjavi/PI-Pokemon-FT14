const { Router } = require('express');
const pokemonController = require('../controllers/pokemons.js');
const cache = require('../cache');
const pokemons = Router();


pokemons.post('/', cache.clear(), pokemonController.create);
pokemons.get('/', cache.cache(60 * 60 * 10), pokemonController.get); // cache 10 horas
pokemons.get('/:id', pokemonController.getByID);

module.exports = pokemons;
