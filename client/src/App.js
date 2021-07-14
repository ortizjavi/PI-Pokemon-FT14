import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
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


function App(props) {
	const dispatch = useDispatch();
	const loadMorePokemons = useSelector(state => state.loadMorePokemons);

	useEffect(() => {
		if (loadMorePokemons){
			dispatch(getPokemonsPage());
		}
	}, [dispatch, loadMorePokemons])

	useEffect(() => {
		dispatch(getTypes());
	}, [dispatch])

	console.log(props.location.pathname);
  return (
    <div className="App">
      {props.location.pathname !== '/landing' ? <Header /> : null}
      <Switch>
	      {Object.values(routes).map(route => renderRoute(route))}
      </Switch>
    </div>
  );
}

export default withRouter(App);
