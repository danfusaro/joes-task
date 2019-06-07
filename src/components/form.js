import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { getPokemonData } from './../services';

export class Form extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			pokemonName: '',
			pokemon: undefined,
			loading: false
		};
	}

	submit = (e) => {
		e.preventDefault();
		if(this.state.pokemonName === "") return;
		this.setState({
			loading: true
		})
		getPokemonData(this.state.pokemonName) 
			.then( (response) => {
				const { id, name, weight, sprites } = response
				this.setState({
					pokemon: { id: id, name: name, weight: weight, sprites: sprites },
					loading: false
				})
			}, (error) => {
				this.setState({
					pokemon: {error: error},
					loading: false
				})		
			})
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value});
	}

	renderPokemon = (pokemon) => {
		let result = [];
		if(!pokemon) { return [] }
		if(pokemon.error) { 
			result.push(
				<div key="1">
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
			<section className="container">
      
				<div className="content">
	      		 	<Link className="btn" to="/pokedex">Pokedex</Link> <br />
	      		 	<Link className="btn" to="/">Home</Link> <br />
	      		 	<Link className="btn" to="/pokemonGenerator">Pokemon Generator</Link>

					<h1 className="heading">Pokemon database</h1>
					
					{ this.state.loading ? <p>Loading...</p> : '' }

					<form className="form">
			        	<label className="label" htmlFor="pokemonName">Pokemon Name:</label>
		      		 	<input className="input" name="pokemonName" type="text" onChange={this.handleChange} id="pokemonName"/>

		      		 	<input className="btn float-element" type="submit" onClick={this.submit} value="Search"></input>
	      		 	</form>
					{ 
						renderPokemon
					}
	      		 	<br />
	      		 	<span className="error">{ this.props.error }</span>
      		 	</div>
			</section>
		);
	};
};