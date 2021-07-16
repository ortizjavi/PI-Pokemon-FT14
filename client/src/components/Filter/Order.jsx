import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { order, removeOrder } from '../../redux/actions';

const ASCENDENT = 'ASC';
const DESCENDENT = 'DESC';


const Order = () => {
	const [name, setName] = useState(null);
	const [attack, setAttack] = useState(null);
	//redux
	const dispatch = useDispatch();
	const filter = useSelector(state => state.filter);
	const pokemons = useSelector(state => state.pokemons);
	const filtPokemons = useSelector(state => state.filteredPokemons);

	useEffect(() => {
		if (name || attack){
			const poke = filter ? filtPokemons : pokemons;
			dispatch(order(name, attack, poke));
		}
	// eslint-disable-next-line
	}, [dispatch, filtPokemons.length])

	useEffect(() => {
		if (name || attack){
			const poke = filter ? filtPokemons : pokemons;
			return dispatch(order(name, attack, poke));
		}
		if (pokemons.length === filtPokemons.length){
			dispatch(removeOrder());
		}
	// eslint-disable-next-line
	}, [name, attack])

	const handleNameChange = () => {
		if (!name){
			return setName(ASCENDENT);
		} else if (name === ASCENDENT){
			return setName(DESCENDENT);
		}
		setName(null);
	}

	const handleAttackChange = () => {
		if (!attack){
			return setAttack(ASCENDENT);
		} else if (attack === ASCENDENT){
			return setAttack(DESCENDENT);
		}
		setAttack(null);
	}

	return (
		<div>
			Order by:
			<span onClick={handleNameChange}> Nombre </span>
			<span> {name} </span>
			<span onClick={handleAttackChange}> Fuerza </span>
			<span> {attack} </span>
		</div>
	)
}


export default Order;