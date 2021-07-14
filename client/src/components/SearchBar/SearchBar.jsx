import s from './SearchBar.module.css';


const SearchBar = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit} className={s.searchForm}>
			<input type="search" name="search" pattern=".*\S.*" required/>
			<button className={s.searchBtn} type="submit">
				<span>Search</span>
			</button>
		</form>
	);
}

export default SearchBar;