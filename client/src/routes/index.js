import asyncComponent from './modules/AsyncComponent';

const routes = {
	HOME: {
		path: '/',
		component: asyncComponent(() => import('../components/Home/Home'))
	},
	POKEMONID: {
		path: '/pokemon/:id',
		component: asyncComponent(() => import('../components/Home/Home'))
	}
}


export default routes;