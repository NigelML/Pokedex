const pokemonName = document.querySelector('#pokemon_nome');
const pokemonNumber = document.querySelector('#pokemon_id');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let currentPokemonID = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    currentPokemonID = data.id;
  } else {
    pokemonImage.src = "../images/pokebola-gif.gif"
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (currentPokemonID > 1) {
    currentPokemonID -= 1;
    renderPokemon(currentPokemonID);
  }
});

buttonNext.addEventListener('click', () => {
  currentPokemonID += 1;
  renderPokemon(currentPokemonID);
});

renderPokemon(currentPokemonID);