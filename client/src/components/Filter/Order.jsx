import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { order, removeOrder } from '../../redux/actions';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import s from './Order.module.css';

const ASCENDENT = 'ASC';
const DESCENDENT = 'DESC';


const Order = () => {
	const [name, setName] = useState(null);
	const [attack, setAttack] = useState(null);
	const [prior, setPrior] = useState(false);
	//redux
	const dispatch = useDispatch();
	// const filter = useSelector(state => state.filter);
	const pokemons = useSelector(state => state.pokemons);
	const filtPokemons = useSelector(state => state.filteredPokemons);

	useEffect(() => {
		if ((name || attack) && filtPokemons.length !== pokemons.length){
			const poke = filtPokemons.length ? filtPokemons : pokemons;
			dispatch(order(name, attack, poke, prior));
		}
	// eslint-disable-next-line
	}, [dispatch, filtPokemons.length])

	useEffect(() => {
		if (name || attack){
			const poke = filtPokemons.length ? filtPokemons : pokemons;
			return dispatch(order(name, attack, poke, prior));
		}
		if (pokemons.length === filtPokemons.length){
			dispatch(removeOrder());
		}
	// eslint-disable-next-line
	}, [name, attack])

	const handleNameChange = () => {
		if (!attack) setPrior(true);
		if (!name){
			return setName(ASCENDENT);
		} else if (name === ASCENDENT){
			return setName(DESCENDENT);
		}
		setName(null);
		setPrior(false);
	}

	const handleAttackChange = () => {
		if (!name) setPrior(false);
		if (!attack){
			return setAttack(ASCENDENT);
		} else if (attack === ASCENDENT){
			return setAttack(DESCENDENT);
		}
		setAttack(null);
		setPrior(true);
	}

	return (
		<>
			<div onClick={handleNameChange} className={`${s.container} ${s.nameOrder}`}> 
				<div className={s.letters}>
					<span> A </span>
					<span> Z </span>
				</div>
				{ arrows(name) }
			</div>
			<div onClick={handleAttackChange} className={`${s.container} ${s.attOrder}`}> 
				<span className={s.attackTitle}> Fuerza </span>
				{ arrows(attack) }
			</div>
		</>
	)
}


function arrows(prop) {
	return (
		<>
		<BsArrowUp 
		style={{ color: prop === ASCENDENT ? 'var(--app-yellow)' : 'white'}}
		size={25}/>
		<BsArrowDown 
		style={{ color: prop === DESCENDENT ? 'var(--app-yellow)' : 'white'}}
		size={25}/>
		</>
	)
}


export default Order;