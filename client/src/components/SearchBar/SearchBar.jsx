import s from './SearchBar.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchPokemonByName } from '../../redux/actions';

const SearchBar = () => {
	const [name, setName] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(searchPokemonByName(name));
		history.push(`/pokemon/search`);
	}

	const handleOnChange = (e) => {
		setName(e.target.value);
	}

	return (
		<form onSubmit={handleSubmit} className={s.searchForm}>
			<input 
				onChange={handleOnChange} 
				type="search" 
				name="search" 
				pattern=".*\S.*" 
				required
			/>
			<button className={s.searchBtn} type="submit">
				<span>Search</span>
			</button>
		</form>
	);
}

export default SearchBar;