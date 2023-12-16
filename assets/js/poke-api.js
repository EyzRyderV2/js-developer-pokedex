const baseAPIUrl = 'https://pokeapi.co/api/v2/';
const pokeApi = {};

async function convertPokeApiDetailToPokemon(pokeDetail) {
  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type1] = types
  const abilities = pokeDetail.abilities.map(abilitySlot => abilitySlot.ability.name)
  const stats = pokeDetail.stats.map(statSlot => { return { name: statSlot.stat.name, base: statSlot.base_stat } })

  const pokemonSpecies = await fetch(`${baseAPIUrl}pokemon-species/${pokeDetail.id}`).then(res => res.json())
  const eggGroups = pokemonSpecies.egg_groups.map(eggSlot => eggSlot.name)

  const pokemon = new Pokemon({
    number: pokeDetail.id,
    name: pokeDetail.name,
    types,
    type: type1,
    abilities,
    stats,
    eggGroups,
    eggCycle:pokemonSpecies.color.name,
    weight: pokeDetail.weight,
    height: pokeDetail.height,
    photo: pokeDetail?.sprites?.versions[`generation-vii`]['ultra-sun-ultra-moon']?.front_default
  });
  return pokemon
}

pokeApi.getPokemonDetail = (url) => {
  return fetch(url)
    .then(res => res.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offsetValue = 0, limitValue = 20) => {
  const url = baseAPIUrl + `pokemon?offset=${offsetValue}&limit=${limitValue}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon.url)))
    .then((detainRequests) => Promise.all(detainRequests))
    .then((pokemonDetail) => pokemonDetail)
    .catch((err) => console.log('Error: ', err))
}
