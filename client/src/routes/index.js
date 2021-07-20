import asyncComponent from './modules/AsyncComponent';

const routes = {
	LANDING: {
		path: '/landing',
		component: asyncComponent(() => import('../components/Landing/Landing'))
	},
	HOME: {
		path: '/',
		component: asyncComponent(() => import('../components/Home/Home'))
	},
	POKEMONFACTORY: {
		path: '/pokemon/create',
		component: asyncComponent(() => import('../components/PokeFactory/PokeFactory'))
	},
	POKEMONID: {
		path: '/pokemon/:id',
		component: asyncComponent(() => import('../components/Pokemons/Pokemon'))
	}
}


export default routes;