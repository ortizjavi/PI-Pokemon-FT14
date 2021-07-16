import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';

const Home = () => {
	const filter = useSelector(state => state.filter);

	return (
		<div>
			<Filter />
			<Pagination filtered={filter}/>
		</div>
	);
}

export default Home;