import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';

const NavBar = () => {

	return (
		<div className={s.container}>
			<NavLink 
				exact 
				to='/' 
				className={s.nav} 
				activeClassName={s.selected}> inicio </NavLink>
			<NavLink 
				exact 
				to='/pokemon/create' 
				className={s.nav} 
				activeClassName={s.selected}>  crear pokemon </NavLink>
		</div>
	)
}

export default NavBar;