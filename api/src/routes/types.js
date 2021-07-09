const { Router } = require('express');
const typeController = require('../controllers/types.js');
const types = Router();


types.get('/', typeController.get);

module.exports = types;
