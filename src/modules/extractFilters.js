// extractFilters.js

// Fonction pour extraire dynamiquement les filtres en fonction des recettes affichées
export function extractFiltersFromRecipes(recipes) {
  const ingredientsSet = new Set();
  const ustensilsSet = new Set();
  const appliancesSet = new Set();

  recipes.forEach((recipe) => {
    // Extraction des ingrédients
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.ingredient.toLowerCase());
    });

    // Extraction des ustensiles
    recipe.ustensils.forEach((ustensil) => {
      ustensilsSet.add(ustensil.toLowerCase());
    });

    // Extraction de l'appareil
    appliancesSet.add(recipe.appliance.toLowerCase());
  });

  return {
    ingredients: Array.from(ingredientsSet).sort(),
    ustensils: Array.from(ustensilsSet).sort(),
    appliances: Array.from(appliancesSet).sort(),
  };
}
