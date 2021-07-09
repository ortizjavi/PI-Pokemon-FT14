const { Router } = require('express');
const pokemonController = require('../controllers/pokemons.js');
const pokemons = Router();


pokemons.post('/', pokemonController.create);
pokemons.get('/', pokemonController.get);
pokemons.get('/:id', pokemonController.getByID);

module.exports = pokemons;
