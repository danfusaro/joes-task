import axios from 'axios';
import React from 'react';

const pokemonApi = 'https://pokeapi.co/api/v2/pokemon/';

function filterOutData(pokemonArray) {
	return pokemonArray.map( (pokemon) => {
		const { id, name, weight, sprites } = pokemon.data;
		return {
			id: id,
			name: name,
			weight: weight,
			sprites: sprites
		}
	})
};

function getPokemonList(offset) {
	let url = `${pokemonApi}?limit=10&offset=${offset}`;
	return axios.get(url)
		.then( (response) => {
			return Promise.all(
				response.data.results.map( (pokemon) => {
					return axios.get(pokemon.url);						
				})
			).then( (pokemonArray) => {
				return filterOutData(pokemonArray)
			});
		});
}

export function getPokemonData(param = '', offset=0) {
	let url = `${pokemonApi}${param}?limit=10&offset=10`;
	if(param === '') {
		return getPokemonList(offset);
	} else {
		return axios.get(url)
			.then( (response) => {
				return response.data;
			});
	}
}

export function renderPokemon(pokemon) {
		let result = [];
		if(!pokemon) { return [] }
		if(pokemon.error) { 
			result.push(
				<div className="pokemon content-text"  key="1">
					<p>Not Found</p>
					<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201.png" alt="not found"></img>
				</div>
			);
		} else {
			result.push(
				<div className="pokemon content-text" key={pokemon.id}>
					Id: {pokemon.id} <br />
					Name: {pokemon.name} <br />
					Weight: {pokemon.weight} <br />
					<img src={pokemon.sprites.front_default} width="100px" height="100px" alt=""></img>
				</div>
			);			
		}
		return result;
	}