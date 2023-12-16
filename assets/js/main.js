const HTMLPokemonListId = document.getElementById('pokemonList');
const HTMLPokemons = document.getElementsByClassName('pokemon');
const LoadMoreBTN = document.getElementById('loadMoreButton');
const modalContainer = document.querySelector('.modal-container');

const pokemonList = []
const limit = 10;
const maxRecords = 151;
let offset = 0;

function convertPokemonToHTML(pokemon) {
  return `
        <a class="pokemon ${pokemon.type}" id='${pokemon.number}'>
          <span class="number">
          #${pokemon.number}
          </span>
          <span class="name">
          ${pokemon.name}
          </span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types
      .map((name) => `<li class='type'>${name}</li>`)
      .join("")}
            </ol>
            <img src="${pokemon?.photo}" alt="${pokemon.name}">
          </div>
      </a>
  `
}

function loadPokemonItens(offset, limit) {

  pokeApi.getPokemons(offset, limit)
    .then((pokeList = []) => {
      const newHTML = pokeList
        .map((pokemon) => {
          pokemonList.push(pokemon)
          return convertPokemonToHTML(pokemon)
        })
        .join("")
      HTMLPokemonListId.innerHTML += newHTML;

      for (element of HTMLPokemons) {
        element.addEventListener('click', openDetailModal)
      }
    })
}

function openDetailModal(e) {
  const pokemon = pokemonList.find(p => p.number == e.currentTarget.id)
  const newHTML = `
    <div class="modal  ${pokemon.type}" id="modal">
    <nav aria-label="modal nav">
      <button onClick="closeModal()" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-heart">
        <path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </nav>
    <div class="top">
      <div class="left">
        <span class="name">${pokemon.name}</span>
        <ol class="types">
        ${pokemon.types
      .map((name) => `<li class='type'>${name}</li>`)
      .join("")}
        </ol>
      </div>
      <span class="right number">
        #${pokemon.number}
      </span>
    </div>
    <div class="imgContainer">
                  <img src="${pokemon?.photo}" alt="${pokemon.name}">
    </div>
 <div class="details">
      <nav aria-label="details tabs">
        <span>About</span>
        <span>Base Stats</span>
        <span>Evolutions</span>
        <span>Moves</span>
      </nav>
      <article>
        <div class="stats">
          <span class="stat">
            Height
          </span>
          <span>${pokemon.height}</span>
          <span class="stat">
            Weight
          </span>
          <span>${pokemon.weight}</span>
          <span class="stat">
            Abilities
          </span>
          <span>${pokemon.abilities
      .map((name) => `${name}`)
      .join(', ')}</span>
        </div>
        <h4>Breading</h4>
        <div class="stats">
          <span class="stat">Egg Groups</span>
          <span> ${pokemon.eggGroups
      .map((name) => `${name}`)
      .join(', ')}</span>

          <span class="stat">Egg Cycle</span>
          <span>${pokemon.eggCycle}</span>
        </div>
      </article>
      <article>

   ${pokemon.stats
      .map((slot) => `
          <div class="stats">
          <span class="stat">${slot.name}</span>
          <span>${slot.base}</span>
        </div>`)
      .join("")}
      </article>
    </div>
  </div>
      `;
  modalContainer.innerHTML= newHTML
}

function closeModal() {
  modalContainer.removeChild(document.getElementById('modal'));
}

function loadMoreOnCLick() {
  offset += limit;
  const qtdRecord = offset + limit;
  if (qtdRecord >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    LoadMoreBTN.parentElement.removeChild(LoadMoreBTN)
  } else {
    loadPokemonItens(offset, limit)
  }
}

LoadMoreBTN.addEventListener('click', loadMoreOnCLick);

loadPokemonItens(offset, limit);