const { 
	API_TYPES_ENDPOINT
} = require('../constants.js');
const axios = require('axios');
var Promise = require('bluebird');


function getTypes(){
	return new Promise((resolve, reject) => {
		axios.get(`${API_TYPES_ENDPOINT}`)
		.then((response) => {
			const {data : {results}} = response;
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	});
}


module.exports = {getTypes};