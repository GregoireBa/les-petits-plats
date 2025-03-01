// SearchBar.js
import { displayRecipes } from "../../main.js";
import { Recipes } from "../modules/recipes.js";

export function createSearchBar() {
  const searchContainer = document.createElement("div");
  searchContainer.className = "search-bar";

  const input = document.createElement("input");
  input.type = "search";
  input.className = "input-search";
  input.placeholder = "Rechercher une recette, un ingrédient, ...";

  const button = document.createElement("button");
  button.className = "btn-submit-search";
  button.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

  searchContainer.appendChild(input);
  searchContainer.appendChild(button);

  // Recherche en temps réel avec input et suppression avec keyup
  input.addEventListener("input", (e) => {
    const results = Recipes.searchRecipes(e.target.value);
    displayRecipes(results);
  });

  input.addEventListener("keyup", (e) => {
    const results = Recipes.searchRecipes(e.target.value);
    displayRecipes(results);
  });

  // Recherche au clic sur le bouton
  button.addEventListener("click", () => {
    const results = Recipes.searchRecipes(input.value);
    displayRecipes(results);
  });

  return searchContainer;
}
