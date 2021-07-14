import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from '../../redux/actions';
import s from './Filter.module.css';

const ALL_FILTER = 'all'

const Filter = () => {
	const [categories, setCategories] = useState([]);
	const [from, setFrom] = useState(null);
	// update corrige si hay que filtrar sobre lo ya filtrado o no.
	const [update, setUpdate] = useState(true);
	const ref = useRef();

	//redux
	const dispatch = useDispatch();
	const types = useSelector(state => state.types)

	useEffect(() => {
		dispatch(filter(categories, from, update));
	}, [categories, from])


	const handleChangeType = (event) => {
		const { target: { value }} = event;
		if (value !== ALL_FILTER){
			// si ya esta filtrado por categoria o from, usar los filtrados
			categories.length || from ? setUpdate(false) : setUpdate(true);

			setCategories(cat => [...cat, value])
			// reseteo el value del selector
			ref.current.value = ALL_FILTER;
		}
	}

	const handleRemove = (category) => {
		setUpdate(true);
		setCategories(cat => cat.filter(c => c !== category));
	}

	const handleChangeFrom = (event) => {
		const { target: { value }} = event;
		// solo usa los filtrados si ya fue filtrado por categorias y from es null
		!from && categories.length ? setUpdate(false) : setUpdate(true);
		setFrom(value);
		value !== ALL_FILTER ? setFrom(value) : setFrom(null);
	}



	return (
		<div> 
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
			<option value={ALL_FILTER} key="0"> Select from API or DB </option>
			{ ['DB', 'API'].map((type, idx) => (
				<option value={type} key={idx}> {type} </option>
			))}
			</select>
		</div>
	)
}


export default Filter;