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
    let filteredRecipes = [];

    // Étape 1 : boucle sur originalRecipes
    for (let i = 0; i < this.originalRecipes.length; i++) {
      const recipe = this.originalRecipes[i];
      let matchesSearch = true;

      // Appliquer la recherche texte
      if (this.searchQuery && this.searchQuery.trim().length >= 3) {
        const lowerQuery = this.searchQuery.toLowerCase();

        matchesSearch =
          recipe.name.toLowerCase().includes(lowerQuery) ||
          recipe.description.toLowerCase().includes(lowerQuery);

        if (!matchesSearch) {
          // Vérifier les ingrédients à la main
          for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredientName =
              recipe.ingredients[j].ingredient.toLowerCase();
            if (ingredientName.includes(lowerQuery)) {
              matchesSearch = true;
              break;
            }
          }
        }
      }

      // Si la recherche n’est pas validée, on saute cette recette
      if (!matchesSearch) continue;

      // Étape 2 : vérifier les tags actifs
      let matchesTags = true;

      if (this.activeTags.length > 0) {
        for (let t = 0; t < this.activeTags.length; t++) {
          const tag = this.activeTags[t];
          if (!this.filterByTagNative(recipe, tag)) {
            matchesTags = false;
            break;
          }
        }
      }

      // Ajouter la recette si elle passe toutes les conditions
      if (matchesTags) {
        filteredRecipes.push(recipe);
      }
    }

    this.filtedRecipes = filteredRecipes;
    return this.filtedRecipes;
  },

  filterByTag: function (recipe, tag) {
    switch (tag.category) {
      case "Ingrédients":
        for (let i = 0; i < recipe.ingredients.length; i++) {
          if (
            recipe.ingredients[i].ingredient.toLowerCase() ===
            tag.label.toLowerCase()
          ) {
            return true;
          }
        }
        return false;

      case "Appareils":
        return recipe.appliance.toLowerCase() === tag.label.toLowerCase();

      case "Ustensiles":
        for (let i = 0; i < recipe.ustensils.length; i++) {
          if (recipe.ustensils[i].toLowerCase() === tag.label.toLowerCase()) {
            return true;
          }
        }
        return false;

      default:
        return true;
    }
  },
};

// simplifier et centraliser les données au meme endroit
