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

  /**
   * This function initializes the page and allows it to work.
   */
  function init() {
    id("go-btn").addEventListener("click", goPokemon);
  }

  /**
   * Fetches the abilities of the Pokemon
   */
  function goPokemon() {
    clear();
    pokemonName = id("input").value;
    let url = BASE_URL + pokemonName.toLowerCase() + "/";
    fetch(url)
      .then(response => checkStatus(response))
      .then(convert => convert.json())
      .then(data => getData(data))
      .then(abilities => create(abilities))
      .catch(error);
  }

  /**
   * Resets the message being displayed, if it is either an error message or the Pokemon's
   * abilities
   */
  function clear() {
    let main = qs("main");
    while (main.contains(id("abilities"))) {
      let myId = id("abilities");
      main.removeChild(myId);
    }
  }

  /**
   * Displays the error message if there is an error
   */
  function error() {
    make("Plese insert a valid Pokemon name");
  }

  /**
   * Creates and displays the Pokemon's abilities
   * @param {object} abilities - the JSON object's abilities
   */
  function create(abilities) {
    for (let i = 0; i < abilities.length; i++) {
      make(abilities[i].ability.name);
    }
  }

  /**
   * Creates and appends a div tag with the text content set to the inputed element to main
   * @param {string} element - the text you want as the text content
   */
  function make(element) {
    let div = document.createElement("div");
    div.textContent = element;
    div.id = "abilities";
    qs("main").appendChild(div);
  }

  /**
   * Returns the abilities of the Pokemon that the user inputed
   * @param {object} data - the JSON object that the abilities are being retrieved from
   * @returns {object} the JSON object's abilities
   */
  function getData(data) {
    return data.abilities;
  }

  /**
   * Returns the response (URL) if it is valid, otherwise will throw an error
   * @param {string} response - checks if the response (URL) exists/is valid
   * @returns {string} the response (URL), returned only if it is valid
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

  /**
   * Returns an element object based on the parameter's (String) ID.
   * @param {string} idName - the element whose ID will be used
   * @returns {object} the object that is associated with element's ID
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns an element object based on the parameter's (String) class.
   * @param {string} selector - the element whose class will be used
   * @returns {object} The first DOM object matching the query
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
