import { Link } from 'react-router-dom';
import s from './Header.module.css';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';


const Header = () => {
	return (
		<div className={s.container}>
			<div className={s.logoContainer}>
			  <Link to='/'>
		      <img 
			      className={s.logo}
			      src="./pokemon-logo.png" alt="Logo - Pokedex website"
		      />
		      </Link>
		     </div>
		   	<NavBar/>
	    	<SearchBar/>
		</div>
	);
}

export default Header;