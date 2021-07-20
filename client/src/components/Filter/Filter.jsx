import { useState, useEffect, useMemo } from 'react';
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

	//redux
	const dispatch = useDispatch();
	const typesRdx = useSelector(state => state.types)
	// guardo el array de nombres
	const types = useMemo(() => typesRdx.map(type => type.name), [typesRdx])
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


	const handleChangeType = (category) => {
		if (!categories.includes(category)){
			setCategories(cat => [...cat, category])
		} else {
			handleRemove(category);
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

	const toggleOpen = () => {
		setOpen(open => !open);
	}

	return (
		<div className={s.container}>
		<div className={s.filterContainer}>
			<span className={s.filterTitle}> Tipos </span>
			<BsFilter 
			onClick={toggleOpen} 
			className={s.filterIcon}
			style={{ color: categories.length ? 'var(--app-yellow' : 'white'}}/>
			{ open ? typesMenu(handleChangeType, types, categories) : null}	
        </div>

			<select onChange={handleChangeFrom} data-filter="from" className={s.filterContainer}>
			<option value={ALL_FILTER} key="0" className={s.filterTitle}> API & DB </option>
			{ ['DB', 'API'].map((type, idx) => (
				<option value={type} key={idx}> {type} </option>
			))}
			</select>
			<Order/>
		</div>
	)
}



function typesMenu(handleChange, types, selected){
	let select = null;
	return (
		<div className={s.selectTypes}>
			{ types ? types.map((type, idx) => (
				<div key={idx} className={s.typeOption}>
					{select = selected.includes(type)}
					<span 
					className={s.type}
					style={{
						color: select ? `var(--${type}` : 'var(--app-default)'
					}}> {type.capitalize()} </span>
					<span 
					onClick={() => handleChange(type)}
					className={s.selector}
					style={{
						backgroundColor: select ? `var(--${type}` : 'white'
					}}> 
					</span>
				</div>
			)) : null}
		</div>
	)
}
/*		<select 
		name='types' 
		onChange={handleChangeType} 
		multiple={true} className={s.selectTypes}
		values={types}>          
	         { types ? 
	         	types.map((type, idx) => <option key={idx} value={type}>{type}</option>) 
	         : null}
	     </select>*/
     



/*
<select ref={ref} onChange={handleChangeType} data-filter="type" className="">
	<option value={ALL_FILTER} key="0"> Select category </option>
	{ types.map(type => (
		<option value={type.name} key={type.id}> {type.name} </option>
	))}
</select>
{ categories.length ? categories.map((cat, idx) => (
	<span key={idx} value={cat} onClick={() => handleRemove(cat)}> {cat} </span>
)) : null}
*/

export default Filter;