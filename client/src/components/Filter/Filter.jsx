import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from '../../redux/actions';
import { BsFilter } from 'react-icons/bs';
import s from './Filter.module.css';
import Order from './Order';

const ALL_FILTER = 'all'

const Filter = () => {
	const [categories, setCategories] = useState([]);
	const [from, setFrom] = useState(null);
	const [removeCategory, setRemoveCategory] = useState(false);
	const [allToFrom, setAllToFrom] = useState(true);
	const [open, setOpen] = useState(false);
	

	const ref = useRef();

	//redux
	const dispatch = useDispatch();
	const types = useSelector(state => state.types)
	const pokemons = useSelector(state => state.pokemons);
	const filtPokemons = useSelector(state => state.filteredPokemons);
	
	useEffect(() => {
		const poke = allToFrom && filtPokemons.length ? 
											filtPokemons : pokemons;
		dispatch(filter(categories, from, poke));
		if (from){
			setAllToFrom(false);
		}
	// eslint-disable-next-line
	}, [from])	


	useEffect(() => {
		const poke = !removeCategory && filtPokemons.length ?
											filtPokemons : pokemons;
		dispatch(filter(categories, from, poke));
		setRemoveCategory(false);
	// eslint-disable-next-line
	}, [categories])


	const handleChangeType = (event) => {
		const { target: { value }} = event;
		if (value !== ALL_FILTER && !categories.includes(value)){
			setCategories(cat => [...cat, value])
			// reseteo el value del selector
			ref.current.value = ALL_FILTER;
		}
	}

	const handleRemove = (category) => {
		setRemoveCategory(true); // to reset list of filtered
		setCategories(cat => cat.filter(c => c !== category));
	}

	const handleChangeFrom = (event) => {
		const { target: { value }} = event;
		if (!from){
			setAllToFrom(true); // unique case we use filtered list
		}
		value !== ALL_FILTER ? setFrom(value) : setFrom(null);
	}

	return (
		<div className={s.container}>
			<BsFilter/>
			{/*{ open ? : null }*/}
			<select ref={ref} onChange={handleChangeType} data-filter="type" className="">
			<option value={ALL_FILTER} key="0"> Select category </option>
			{ types.map(type => (
				<option value={type.name} key={type.id}> {type.name} </option>
			))}
			</select>

			{ categories.length ? categories.map((cat, idx) => (
				<span key={idx} value={cat} onClick={() => handleRemove(cat)}> {cat} </span>
			)) : null}

			<select onChange={handleChangeFrom} data-filter="from" className="">
			<option value={ALL_FILTER} key="0"> API and DB </option>
			{ ['DB', 'API'].map((type, idx) => (
				<option value={type} key={idx}> {type} </option>
			))}
			</select>
			<Order/>
		</div>
	)
}

/*          <select name='types' onChange={onChangeTipo} multiple={true} className={s.selectTypes}>          
                 { types ? types.map(type=><option value={type.name}>{type.name}</option>) : null}
             </select>*/

export default Filter;