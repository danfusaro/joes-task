import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Form, Pokedex, PokemonGenerator } from './components';

const routes = (
	<Router>
		<Switch>
			<Route path="/form" component={Form} />		
			<Route path="/pokedex" component={Pokedex} />
			<Route path="/pokemonGenerator" component={PokemonGenerator} />
			<Route path="/" component={Form} />
		</Switch>
	</Router>
)

ReactDOM.render( routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
