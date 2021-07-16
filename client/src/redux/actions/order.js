import * as a from '../types';


export function order(name, attack, pokemons){
	return (dispatch) => {
		let poke = pokemons.slice();
		if (name){
			poke = orderBy(poke, 'name', name);
		}
		if (attack){
			poke = orderBy(poke, 'attack', attack);
			console.log(poke)
		}
		return dispatch({
			type: a.ORDER_BY,
			payload: poke
		})
	}
}

export function removeOrder(){
	return (dispatch) => {
		return dispatch({
			type: a.REMOVE_FILTER,
			payload: null
		})
	}
}


function ASC(a, b){
    return a > b ? 1 : a < b ? -1 : 0;
}

function DESC(a,b){
    return a < b ? 1 : a > b ? -1 : 0;
}

function orderBy(list, attr, type){
    const fn = type === 'ASC' ? ASC : DESC;
    return list.sort((a,b) => fn(a[attr], b[attr]))
}