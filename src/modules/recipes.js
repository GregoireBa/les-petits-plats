export const Recipes = {
  originalRecipes: [],
  filtedRecipes: [],
  getfilteredRecipes: function () {
    return this.filtedRecipes;
  },
  setOriginalRecipes: function (recipes) {
    this.originalRecipes = recipes;
  },
};

// simplifier et centraliser les données au meme endroit (dans un tableau)
