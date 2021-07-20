import { useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';
import s from './Home.module.css';

const setColorBack = () => {
	document.getElementsByTagName('body')[0]
		.style.backgroundColor = `var(--app-default)`;
}
		
const Home = () => {
	
	useEffect(() => {
		setColorBack();
	}, [])
	
	return (
		<div className={s.container}>
			<Filter />
			<Pagination/>
		</div>
	);
}

export default Home;