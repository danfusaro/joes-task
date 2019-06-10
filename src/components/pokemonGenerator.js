import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { getPokemonData, renderPokemon } from './../services';

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

	render() {
		const pokemonList = renderPokemon(this.state.pokemon);
		return (
			<div>
				<div className="header heading-primary">
	      		 	<Link className="nav" to="/pokedex">Pokedex</Link> <br />
	      		 	<Link className="nav" to="/">Home</Link> <br />
	      		 	<Link className="nav active" to="/pokemonGenerator">Pokemon Generator</Link>
      		 	</div>	
				<div className="container">
					<h1 className="heading-primary spacing-bottom-large">Pokemon Generator</h1>

					<div className="content content-text">
	
						{ 
							pokemonList
						}
						
						{ this.state.loading ? <p className="spacing-top-large">Loading...</p> : <button className="btn spacing-top-large" onClick={this.generateNewPokemon}>Generate Pokemon</button> }
					</div>
				</div>
			</div>
		);
	}

}