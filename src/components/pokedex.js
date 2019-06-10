import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { getPokemonData, renderPokemon } from './../services';

export class Pokedex extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			pokemonArray: [],
			offset: 0,
			loading: false
		}
	}

	componentDidMount() {
		this.renderMorePokemon();
	}

	renderMorePokemon = (offset = 0) => {
		this.setState({loading: true})
		getPokemonData('', offset)
			.then( (response) => {
				this.setState({
					pokemonArray: response
				})
				this.setState({loading: false})
			});
	}

	handleClick = (nextPage) => () => {		
		if(nextPage && this.state.offset < 142) {
			this.setState({
				offset: this.state.offset + 10
			}, () => {
				this.renderMorePokemon(this.state.offset);
			})
		} else if(!nextPage && this.state.offset > 9) {
			this.setState({
				offset: this.state.offset - 10
			}, () => {
				this.renderMorePokemon(this.state.offset);
			})
		}
	}

	render() {
		let pokemonList = this.state.pokemonArray.map( (pokemon) => {
			return renderPokemon(pokemon)[0];
		})
		return (
			<div>
				<div className="header heading-primary">
	      		 	<Link className="nav active" to="/pokedex">Pokedex</Link> <br />
	      		 	<Link className="nav" to="/">Home</Link> <br />
	      		 	<Link className="nav" to="/pokemonGenerator">Pokemon Generator</Link>
      		 	</div>	
				<section className="container">
					<div className="content content-text">
						<h1 className="heading-primary spacing-bottom-large">Pokedex</h1>
						<div className="pokedex-list">
							{ pokemonList }
						</div>
						<div className="pokedex-buttons spacing-top-large">		
							{ this.state.loading ? <p>Loading</p> :
								<div>
									<button className="btn" onClick={this.handleClick(false)}>Prev Page </button>
									<button className="btn" onClick={this.handleClick(true)}>Next Page </button>
								</div>
							}
						</div>
					</div>
				</section>
			</div>
		);
	};
};