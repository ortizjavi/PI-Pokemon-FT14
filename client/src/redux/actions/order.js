import * as a from '../types';

const NAME_ATTR = 'name';
const ATTACK_ATTR = 'attack';
const ASCENDENT = 'ASC';

export function order(name, attack, pokemons, prior){
	return (dispatch) => {
		let poke = pokemons.slice();
		if (name && attack){
			if (prior){
				poke = orderByTwo(poke, NAME_ATTR, ATTACK_ATTR, name, attack);
			} else {
				poke = orderByTwo(poke, ATTACK_ATTR, NAME_ATTR, attack, name);
			}
		} else if (name){
			poke = orderBy(poke, NAME_ATTR, name);
		} else { // attack
			poke = orderBy(poke, ATTACK_ATTR, attack);
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


function getAttributeOrderer(attr, aZ){
	if (typeof attr === 'string'){
		return aZ === ASCENDENT ? 
			(a,b) => (a.localeCompare(b)) : 
				(a,b) => (b.localeCompare(a));
	} else {
		return aZ === ASCENDENT ?
				(a,b) => (a - b) :
					(a,b) => (b - a);			
	}
}


function orderByTwo(list, attrA, attrB, typeA, typeB){
   const order1 = getAttributeOrderer(list[0][attrA], typeA);
   const order2 = getAttributeOrderer(list[0][attrB], typeB);
   return list.sort((a,b) => { 
   	 if (a[attrA] === b[attrA]){
   	 	return order2(a[attrB], b[attrB]);
   	 }
     return order1(a[attrA], b[attrA]);
   })
}

function orderBy(list, attr, type){
    const order = getAttributeOrderer(list[0][attr], type);
    return list.sort((a,b) => order(a[attr], b[attr]))
}