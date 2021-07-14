import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';

const Home = () => {
	const pokemons = useSelector(state => state.pokemons);
	const filter = useSelector(state => state.filter);
	const filtered = useSelector(state => state.filteredPokemons);

	return (
		<div>
			<Filter />
			<Pagination pokemonList={filter ? filtered : pokemons}/>
		</div>
	);
}

export default Home;