import { api } from "./src/api/api.js";
import { CardRecipe } from "./src/components/CardRecipe.js";
import { createSearchBar } from "./src/components/SearchBar.js";
import { createDropdownComponent } from "./src/components/DropDown.js";
import { extractFiltersFromRecipes } from "./src/modules/extractFilters.js";
import { Recipes } from "./src/modules/recipes.js";
import { createTag } from "./src/components/TagRecipe.js";
import "./style.css";

let dropdownComponents = {}; // Stocker les dropdowns pour les mettre à jour
const tagContainer = document.querySelector("#tag-container"); // Conteneur des tags
const resultCount = document.querySelector(".result-count-recipes");

function init() {
  // Ajout de la barre de recherche
  const searchContainer = document.querySelector("#searchBar");
  if (searchContainer) {
    searchContainer.appendChild(createSearchBar(handleSearch));
  }

  // Initialisation et affichage des recettes
  const recipes = api.getAllrecipes(); // Récupération des recettes
  Recipes.setOriginalRecipes(recipes); // Stocker les recettes originales
  displayRecipes(Recipes.getfilteredRecipes());

  // Initialisation des filtres avancés (dropdowns)
  updateDropdowns(Recipes.getfilteredRecipes());
}

function handleSearch(query) {
  Recipes.searchRecipes(query);
  displayRecipes(Recipes.getfilteredRecipes());
  updateDropdowns(Recipes.getfilteredRecipes());
}

export function displayRecipes(recipes) {
  const recipesContainer = document.querySelector("#row-cardRecipes");
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

function addTag(label, category) {
  Recipes.addTag(label, category);
  updateTags();
  displayRecipes(Recipes.getfilteredRecipes());
  updateDropdowns(Recipes.getfilteredRecipes());
}

function removeTag(label, category) {
  Recipes.removeTag(label, category);
  updateTags();
  displayRecipes(Recipes.getfilteredRecipes());
  updateDropdowns(Recipes.getfilteredRecipes());
}

function updateTags() {
  tagContainer.innerHTML = "";
  Recipes.activeTags.forEach((tag) => {
    tagContainer.appendChild(createTag(tag.label, tag.category, removeTag));
  });
}

function updateDropdowns(recipes) {
  const dropdownFiltersContainer = document.querySelector("#dropdown-filters");
  if (!dropdownFiltersContainer) return;

  // Extraire les nouvelles valeurs des filtres
  const filters = extractFiltersFromRecipes(recipes);

  if (!dropdownComponents.ingredients) {
    dropdownComponents.ingredients = createDropdownComponent(
      "Ingrédients",
      filters.ingredients,
      addTag // Passe directement `addTag` au composant
    );
    dropdownComponents.appliances = createDropdownComponent(
      "Appareils",
      filters.appliances,
      addTag
    );
    dropdownComponents.ustensils = createDropdownComponent(
      "Ustensiles",
      filters.ustensils,
      addTag
    );

    dropdownFiltersContainer.appendChild(dropdownComponents.ingredients);
    dropdownFiltersContainer.appendChild(dropdownComponents.appliances);
    dropdownFiltersContainer.appendChild(dropdownComponents.ustensils);
  } else {
    dropdownComponents.ingredients.updateList(filters.ingredients);
    dropdownComponents.appliances.updateList(filters.appliances);
    dropdownComponents.ustensils.updateList(filters.ustensils);
  }
}

// Lancer l'initialisation après le chargement du script
init();
