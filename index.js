/**
 * Name: Roy Yuan
 * Date: May 6, 2020
 * Section AF with Jack Venburg
 * This is the index.js page. It fetches information about Pokemon abilities from the PokeAPI page.
 * It is used by my index.html page to allow the user to interact with buttons.

 */
"use strict";

(function() {

  let pokemonName;
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

  window.addEventListener("load", init);

  function init() {
    id("go-btn").addEventListener("click", goPokemon);
  }

  function goPokemon() {
    clear();
    pokemonName = id("input").value + "/";
    let url = BASE_URL + pokemonName;
    fetch(url)
      .then(response => checkStatus(response))
      .then(convert => convert.json())
      .then(data => getData(data))
      .then(abilities => create(abilities))
      .catch(err => error(err));
  }

  function clear() {
    let main = qs("main");
    while (main.contains(id("abilities"))) {
      let myId = id("abilities");
      main.removeChild(myId);
    }
  }

  function error(err) {
    make("Plese insert a valid Pokemon name")
  }

  function create(abilities) {
    for (let i = 0; i < abilities.length; i++) {
      make(abilities[i].ability.name);
    }
  }

  function make(element) {
    let div = document.createElement("div");
    div.textContent = element;
    div.id = "abilities";
    qs("main").appendChild(div);
  }

  function getData(data) {
    return data.abilities;
  }

  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }
})();
