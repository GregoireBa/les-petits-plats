import { api } from "./src/api/api.js";
import { CardRecipe } from "./src/components/CardRecipe.js";
import { createDropdownComponent } from "./src/components/DropDown.js";
import { Recipes } from "./src/modules/recipes.js";
import "./style.css";

function init() {
  document.addEventListener("DOMContentLoaded", () => {
    // Initialisation des éléments Dropdown
    const dropdownFiltersContainer =
      document.querySelector("#dropdown-filters");
    if (dropdownFiltersContainer) {
      const dropdownComponent1 = createDropdownComponent("Ingrédients", [
        "About",
        "Contact",
        "Blog",
      ]);
      const dropdownComponent2 = createDropdownComponent("Appareils", [
        "Support",
        "Tools",
        "Custom",
      ]);
      const dropdownComponent3 = createDropdownComponent("Ustensiles", [
        "Support",
        "Tools",
        "Custom",
      ]);

      dropdownFiltersContainer.appendChild(dropdownComponent1);
      dropdownFiltersContainer.appendChild(dropdownComponent2);
      dropdownFiltersContainer.appendChild(dropdownComponent3);
    }

    // Initialisation des Card Recipes
    const rowCardRecipes = document.querySelector("#row-cardRecipes");
    if (rowCardRecipes) {
      const recipes = api.getAllrecipes(); // Récupération des recettes (tableau statique)
      Recipes.setOriginalRecipes(recipes); // Enregistrement des recettes dans le module Recipes
      recipes.forEach((recipe) => {
        const cardRecipe = CardRecipe(recipe);
        rowCardRecipes.appendChild(cardRecipe);
      });
    }
  });
}

init();
