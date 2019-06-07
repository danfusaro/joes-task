import axios from 'axios';

const pokemonApi = 'https://pokeapi.co/api/v2/pokemon/';

export function getPokemonData(param = '') {
	let url = `${pokemonApi}${param}?limit=151`;
	return axios.get(url)
		.then( (response) => {
			return response.data;
		});
}