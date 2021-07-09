const { Type } = require('../db.js');
var Promise = require('bluebird');

function getTypes(req, res, next){
  Type.findAll({ 
  	attributes: ['id','name']
  })
  .then(response => {
  	res.json(response);
  }).catch(err => {
	  next(err);
  })
}

module.exports = {
	'get' : getTypes
};