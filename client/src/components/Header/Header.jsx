import s from './Header.module.css';
import SearchBar from '../SearchBar/SearchBar';


const Header = () => {
	return (
		<div className={s.container}>
	      <SearchBar/>
		</div>
	);
}

export default Header;