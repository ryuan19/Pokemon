/**
 * Name: Roy Yuan
 * Date: May 6, 2020
 * Section AF with Jack Venburg
 * description
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
    console.log(url);

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
    let div = document.createElement("div");
    div.textContent = "Please insert a valid Pokemon name";
    div.id = "abilities";
    qs("main").appendChild(div);
  }

  function create(abilities) {
    for (let i = 0; i < abilities.length; i++) {
      let div = document.createElement("div");
      div.textContent = abilities[i].ability.name;
      div.id = "abilities";
      qs("main").appendChild(div);
    }
  }

  function getData(data) {
    return data.abilities;
  }

  function checkStatus(response) {
    console.log(response);
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }


  function handleError() {
    console.log(input.textValue);
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }


})();
