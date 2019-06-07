import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { getPokemonData } from './../services';

export class PokemonGenerator extends PureComponent {

	componentDidMount() {
		this.generateNewPokemon();
	}

	generateNewPokemon = () => {
		const randNum = Math.floor(Math.random() * 151) + 1;
		this.setState({
			loading: true
		});
		getPokemonData(randNum)
			.then( (response) => {
				const { id, name, weight, sprites } = response;
				this.setState({
					pokemon: { id: id, name: name, weight: weight, sprites: sprites },
					loading: false
				})
			})
	}

	constructor(props) {
		super(props);

		this.state = {
			pokemon: undefined,
			loading: false
		}
	}

	renderPokemon = (pokemon) => {
		let result = [];
		if(!pokemon) { return [] }
		if(pokemon.error) { 
			result.push(
				<div key={pokemon.id}>
					<p>Not Found</p>
					<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201.png" alt="not found"></img>
				</div>
			);
		} else {
			result.push(
				<div key={pokemon.id}>
					Id: {pokemon.id} <br />
					Name: {pokemon.name} <br />
					Weight: {pokemon.weight} <br />
					<img src={pokemon.sprites.front_default} width="100px" height="100px" alt=""></img>
				</div>
			);			
		}
		return result;
	}

	render() {
		const renderPokemon = this.renderPokemon(this.state.pokemon);
		return (
			<div>
      		 	<Link className="btn" to="/pokedex">Pokedex</Link> <br />
      		 	<Link className="btn" to="/">Home</Link> <br />
      		 	<Link className="btn" to="/pokemonGenerator">Pokemon Generator</Link>
				{ 
					renderPokemon
				}
				<button onClick={this.generateNewPokemon}>Generate Pokemon</button>
				{ this.state.loading ? <p>Loading...</p> : '' }
			</div>
		);
	}

}