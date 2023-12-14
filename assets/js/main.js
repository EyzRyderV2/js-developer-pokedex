const HTMLPokemonList = document.getElementById('pokemonList')
const LoadMoreBTN = document.getElementById('loadMoreButton')
const limit = 10;
const maxRecords = 151;
let offset = 0;

function loadPokemonItens(offset, limit) {
  function convertPokemonToHTML(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">
          #${pokemon.number}
        </span>
        <span class="name">
          ${pokemon.name}
        </span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((name) => `<li class='type'>${name}</li>`)
        .join("")}
          </ol>
          <img src="${pokemon?.photo}" alt="${pokemon.name}">
        </div>
      </li>
  `
  }
  pokeApi.getPokemons(offset, limit).then((pokeList = []) => {
    const newHTML = pokeList
      .map((pokemon) => convertPokemonToHTML(pokemon))
      .join("")
    HTMLPokemonList.innerHTML += newHTML;
  })
}

loadPokemonItens(offset, limit)

LoadMoreBTN.addEventListener('click', () => {
  offset += limit;

  const qtdRecord = offset + limit;
  if (qtdRecord >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    LoadMoreBTN.parentElement.removeChild(LoadMoreBTN)
  } else {
    loadPokemonItens(offset, limit)
  }
})