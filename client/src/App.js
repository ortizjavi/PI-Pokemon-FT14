import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { getPokemonsPage, getTypes } from './redux/actions'; //fillPokemonList
import Header from './components/Header/Header';
import routes from './routes/';

function renderRoute({path, component}){
	return (
		<Route
			key = {path}
			exact
			path = {path}
			component = {component}
		/>
	);
}


function App() {
	const dispatch = useDispatch();
	const loadMorePokemons = useSelector(state => state.loadMorePokemons);
	const location = useLocation();
	useEffect(() => {
		if (loadMorePokemons){
			dispatch(getPokemonsPage());
		}
	}, [dispatch, loadMorePokemons])

	useEffect(() => {
		dispatch(getTypes());
	}, [dispatch])


  return (
    <div id="App">
      {location.pathname !== '/landing' ? <Header /> : null}
      <Switch>
	      {Object.values(routes).map(renderRoute)}
      </Switch>
    </div>
  );
}

export default App;
