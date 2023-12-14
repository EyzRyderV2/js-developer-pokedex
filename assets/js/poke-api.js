const baseAPIUrl = 'https://pokeapi.co/api/v2/';
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type1] = types
  const pokemon = new Pokemon({
    number: pokeDetail.id,
    name: pokeDetail.name,
    types: types,
    type: type1,
    photo: pokeDetail?.sprites?.versions[`generation-vii`]['ultra-sun-ultra-moon']?.front_default
  });
  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then(res => res.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offsetValue = 0, limitValue = 20) => {
  const url = baseAPIUrl + `pokemon?offset=${offsetValue}&limit=${limitValue}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detainRequests) => Promise.all(detainRequests))
    .then((pokemonDetail) => pokemonDetail)
    .catch((err) => console.log('Error: ', err))
}
