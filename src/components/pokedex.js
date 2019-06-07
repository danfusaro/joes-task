import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { getPokemonData } from './../services';

export class Pokedex extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			pokemonArray: []
		}
	}

	componentDidMount() {
		getPokemonData()
			.then( (response) => {
				this.setState({
					pokemonArray: response.results
				})
			});
	}

	renderPokemon = (pokemonArray) => {
		let result = [];
		pokemonArray.map( (pokemon) => {
			result.push(
				<div key={pokemon.name}>
					<li key={pokemon.name}>{pokemon.name}</li>					
				</div>
			);
		})

		return result;
	}

	render() {
		const renderedPokemon = this.renderPokemon(this.state.pokemonArray);
		return (
			<section className="container">
      		 	<Link className="btn" to="/pokedex">Pokedex</Link> <br />
      		 	<Link className="btn" to="/">Home</Link> <br />
      		 	<Link className="btn" to="/pokemonGenerator">Pokemon Generator</Link>

				<ul>
					{renderedPokemon}
				</ul>
			</section>
		);
	};
};