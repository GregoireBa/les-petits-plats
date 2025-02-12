import { api } from "./src/api/api.js";
import { CardRecipe } from "./src/components/CardRecipe.js";
import { createSearchBar } from "./src/components/SearchBar.js";
import { createDropdownComponent } from "./src/components/DropDown.js";
import { Recipes } from "./src/modules/recipes.js";
import "./style.css";

function init() {
  // Ajout de la barre de recherche
  const searchContainer = document.querySelector("#searchBar");
  if (searchContainer) {
    searchContainer.appendChild(createSearchBar());
  }

  // Initialisation des filtres avancés (dropdowns)
  const dropdownFiltersContainer = document.querySelector("#dropdown-filters");
  if (dropdownFiltersContainer) {
    const dropdownComponent1 = createDropdownComponent("Ingrédients", []);
    const dropdownComponent2 = createDropdownComponent("Appareils", []);
    const dropdownComponent3 = createDropdownComponent("Ustensiles", []);

    dropdownFiltersContainer.appendChild(dropdownComponent1);
    dropdownFiltersContainer.appendChild(dropdownComponent2);
    dropdownFiltersContainer.appendChild(dropdownComponent3);
  }

  // Initialisation et affichage des recettes
  const recipes = api.getAllrecipes(); // Récupération des recettes
  Recipes.setOriginalRecipes(recipes); // Stocker les recettes originales
  displayRecipes(recipes);
}

const resultCount = document.querySelector(".result-count-recipes");

export function displayRecipes(recipes) {
  const recipesContainer = document.querySelector("#row-cardRecipes");
  const resultCount = document.querySelector(".result-count-recipes");

  recipesContainer.innerHTML = "";

  // Met à jour le compteur avec le nombre de recettes trouvées
  resultCount.textContent = `${recipes.length} recette${
    recipes.length > 1 ? "s" : ""
  }`;

  if (recipes.length === 0) {
    recipesContainer.innerHTML = `<p class='text-center'>Aucune recette trouvée.</p>`;
    return;
  }

  recipes.forEach((recipe) => {
    recipesContainer.appendChild(CardRecipe(recipe));
  });
}

// Lancer l'initialisation après le chargement du script
init();
