import s from './SearchBar.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchPokemonByName } from '../../redux/actions';
import { BsSearch } from 'react-icons/bs';

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
				className={s.searchInput}
				onChange={handleOnChange}
				placeholder={`buscar`}
				type="search" 
				name="search" 
				pattern=".*\S.*" 
				required
			/>
			<span className={`${s.searchIcon}`}>
				<BsSearch/>
			</span>
		</form>
	);
}

export default SearchBar;