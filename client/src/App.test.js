import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render,
		 cleanup,
		 fireEvent,
		 screen,
		 waitForElementToBeRemoved
		} from './test-utils/test-utils';
import "@testing-library/jest-dom/extend-expect";

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from './App';
import { API_POKEMONS, API_TYPES } from './config.js';

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get(API_POKEMONS, (req, res, ctx) => {
    return res(ctx.json([{ name: 'Pikachu', id : '1', types: []}]), ctx.delay(150))
  }),
  rest.get(API_TYPES, (req, res, ctx) => {
    return res(ctx.json(['normal', 'fighting']), ctx.delay(150))
  })
]

const server = setupServer(...handlers)
let history, debuG;

// Enable API mocking before tests.
beforeAll(async () => {
	server.listen();
})

beforeEach(async () => {
	history = createMemoryHistory();
	const { debug } = await render(
	    <Router history={history}>
	      <App />
	    </Router>
  	)
  	debuG = debug;
})

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
	server.resetHandlers()
})


afterEach(cleanup);


// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('shows message no pokemons before fetching', async () => {
  await history.push('/')
  expect(screen.queryByText(/Lo siento, no hay pokemons hoy :\(/i)).toBeInTheDocument()
  await waitForElementToBeRemoved(
		screen.queryByText(/Lo siento, no hay pokemons hoy :\(/i))
  		.catch((err) =>
			console.log(err))
})

test('render pikachu :)', async () => {
  await history.push('/')
  await waitForElementToBeRemoved(
		screen.queryByText(/Lo siento, no hay pokemons hoy :\(/i))
  		.catch((err) =>
			console.log(err));
  expect(screen.queryByText(/Pikachu/i)).toBeInTheDocument();
  expect(screen.queryByText(/\#001/i)).toBeInTheDocument();
  
})


test(`'crear pokemon' exists and goes to form`, async () => {
  await history.push('/');
  expect(screen.getByText(/crear pokemon/i)).toBeInTheDocument();
  await fireEvent.click(screen.getByText(/crear pokemon/i))
  expect(await screen.findByPlaceholderText(/Nombre/)).toBeInTheDocument();
})