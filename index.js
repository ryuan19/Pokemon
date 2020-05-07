/**
 * Name: Roy Yuan
 * Date: May 6, 2020
 * Section AF with Jack Venburg
 * description
 */
"use strict";

(function() {

  let pokemonName;
  const BASE_URL = "https://pokeapi.co/api/v2/";

  window.addEventListener("load", init);

  function init() {
    id("go-btn").addEventListener("click", goPokemon);
  }

  function goPokemon() {
    pokemonName = id("input").value + "/";
    let url = BASE_URL + pokemonName;
  }

  function create(data) {

  }

  function checkStatus(response) {
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
