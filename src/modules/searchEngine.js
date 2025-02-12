// searchEngine.js
import { api } from "../api/api.js";

// Fonction pour filtrer les recettes
export function searchRecipes(query) {
  if (query.length < 3) {
    return api.getAllrecipes();
  }

  const lowerQuery = query.toLowerCase();

  return api.getAllrecipes().filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(lowerQuery) ||
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(lowerQuery)
      )
    );
  });
}
