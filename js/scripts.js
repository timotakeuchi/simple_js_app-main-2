let pokemonRepository = (function () {
  let pkmnList = [];
  
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pkmnList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
    // pokemonList.push(pokemon);
  }

  function getAll() {
    return pkmnList;
  }

  function addListItem(pokemon) {
    //list of variables in the function
    let pokemonList = document.querySelector('.pokemon-list');
    let pkmnListItem = document.createElement('li');
    let button = document.createElement('button');
    //button features
    button.innerText = pokemon.name;
    button.classList.add('pkbutton','btn','btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', 'modalContainer');
    pkmnListItem.classList.add('list-group');
    //appending children
    pokemonList.appendChild(pkmnListItem);
    pkmnListItem.appendChild(button);
    //event listener
    button.addEventListener('click', () => {showDetails(pokemon);
    });
  }
  

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.image = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    loadDetails(item);
    showModal(item);
  };

  let modalContainer = document.querySelector('#modal-container');

  function showModal(item){
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();
    let nameElement = $("<h1>" + item.name + "<h1>");
    let imageElement = $('<img class="modal-img" style="width:120%">');
    imageElement.attr("src", item.image);
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    console.log(imageElement)
    // modalContainer.innerHTML = '';
    // //Modal Element & Class
    // let modal = document.createElement('div');
    // modal.classList.add('modal');
    // //Button Element & Class
    // let closeButtonElement = document.createElement('button');
    // closeButtonElement.classList.add('modal-close');
    // closeButtonElement.innerText = 'Close';
    // closeButtonElement.addEventListener('click', hideModal);
    // //Pokemon Name Element
    // let nameElement = document.createElement('h1');
    // nameElement.innerText = item.name;
    // //Pokemon Height Element
    // let heightElement = document.createElement('p');
    // heightElement.innerText = "Height: " + item.height;
    // //Pokemon Image Element
    // let imageElement = document.createElement('img');
    // imageElement.setAttribute("src", item.image)
    // imageElement.setAttribute("width", "120");
    // imageElement.setAttribute("height", "120");
    // imageElement.setAttribute("alt", "Pokemon Image")
    // //Append Child Elements
    // modal.appendChild(closeButtonElement);
    // modal.appendChild(nameElement);
    // modal.appendChild(heightElement);
    // modal.appendChild(imageElement);
    // modalContainer.appendChild(modal);
    // //Modal Container Visible
    // modalContainer.classList.add('is-visible');
    // //Modal Container Event Listener
 }

  function hideModal(){
    $('modalContainer').removeClass('is-visible');
    // modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer){
      hideModal();
    }
  })

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList
  };
})();

// for (let i = 0; i < pokemonList.length; i++){
//   if (pokemonList[i].height >= 2) {
//       document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!</li>`)
//   } else {
//       document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height})</li>`)
//   }
// }
// pokemonRepository.add({name: 'Charmandar', height: 0.6, types: 'Fire'});

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
    // if (pokemon.height >= 2) {
    //     document.write(`<li>${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!</li>`)
    // } else {
    //     document.write(`<li>${pokemon.name} (height: ${pokemon.height})</li>`)}