export const Recipes = {
  originalRecipes: [],
  filtedRecipes: [],
  activeTags: [],
  searchQuery: "", // Stocker la requête actuelle

  getfilteredRecipes: function () {
    return this.filtedRecipes;
  },

  setOriginalRecipes: function (recipes) {
    this.originalRecipes = recipes;
    this.filtedRecipes = recipes;
  },

  reset: function () {
    this.filtedRecipes = this.originalRecipes;
    return this.filtedRecipes;
  },

  searchRecipes: function (query) {
    this.searchQuery = query; // Stocke la requête actuelle
    return this.applyFilters();
  },

  addTag: function (label, category) {
    if (
      this.activeTags.some(
        (tag) => tag.label === label && tag.category === category
      )
    ) {
      return; // Éviter les doublons
    }
    this.activeTags.push({ label, category });
    return this.applyFilters();
  },

  removeTag: function (label, category) {
    this.activeTags = this.activeTags.filter(
      (tag) => !(tag.label === label && tag.category === category)
    );
    return this.applyFilters();
  },

  applyFilters: function () {
    let filteredRecipes = this.originalRecipes;

    // Appliquer la recherche texte
    if (this.searchQuery && this.searchQuery.trim().length >= 3) {
      const lowerQuery = this.searchQuery.toLowerCase();
      filteredRecipes = filteredRecipes.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(lowerQuery) ||
          recipe.description.toLowerCase().includes(lowerQuery) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(lowerQuery)
          )
        );
      });
    }

    // Appliquer les tags actifs
    if (this.activeTags.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) => {
        return this.activeTags.every((tag) => this.filterByTag(recipe, tag));
      });
    }

    this.filtedRecipes = filteredRecipes;
    return this.filtedRecipes;
  },

  filterByTag: function (recipe, tag) {
    switch (tag.category) {
      case "Ingrédients":
        return recipe.ingredients.some(
          (ingredient) =>
            ingredient.ingredient.toLowerCase() === tag.label.toLowerCase()
        );
      case "Appareils":
        return recipe.appliance.toLowerCase() === tag.label.toLowerCase();
      case "Ustensiles":
        return recipe.ustensils.some(
          (ustensil) => ustensil.toLowerCase() === tag.label.toLowerCase()
        );
      default:
        return true;
    }
  },
};

// simplifier et centraliser les données au meme endroit
