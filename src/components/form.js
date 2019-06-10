import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { getPokemonData, renderPokemon } from './../services';

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

	render() {
		const pokemonList = renderPokemon(this.state.pokemon);
		return (
			<div>
				<div className="header heading-primary">
	      		 	<Link className="nav" to="/pokedex">Pokedex</Link> <br />
	      		 	<Link className="nav active" to="/">Home</Link> <br />
	      		 	<Link className="nav" to="/pokemonGenerator">Pokemon Generator</Link>
      		 	</div>	
				<section className="container">
					<div className="content">			
 
						<h1 className="heading-primary spacing-bottom-large">Pokemon database</h1>
						
						{ this.state.loading ? <p>Loading...</p> : '' }

						<form className="content-text">
				        	<label htmlFor="pokemonName">Pokemon Name:</label>
			      		 	<input className="input" name="pokemonName" type="text" onChange={this.handleChange} id="pokemonName"/>

			      		 	<input className="btn" type="submit" onClick={this.submit} value="Search"></input>
		      		 	</form>
						{ 
							pokemonList
						}
		      		 	<br />
		      		 	<span className="error">{ this.props.error }</span>
		  		 	</div>
				</section>
			</div>
		);
	};
};