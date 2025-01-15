// tronquer le texte de la description

export function CardRecipe(recipe) {
  const cardRecipe = document.createElement("div");
  cardRecipe.classList.add("col-sm-12");
  cardRecipe.classList.add("col-lg-4");

  // Limite de caractères pour la description
  const maxChars = 200;

  // Fonction pour tronquer sans couper au milieu d'un mot
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
  };

  const truncatedDescription = truncateText(recipe.description, maxChars);

  // Je parcours le tableau dans la data et je structure mes données que je veux afficher.
  const ingredientsHTML = recipe.ingredients
    .map((ingredient) => {
      const quantity = ingredient.quantity ? `${ingredient.quantity}` : "";
      const unit = ingredient.unit ? ` ${ingredient.unit}` : "";
      return `<div class="col-sm-6 col-lg-6">
      <p>
      ${ingredient.ingredient}<br>
      <span class="quantity-unit">${quantity}${unit}</span>
      </p>
      </div>`;
    })
    .join("");

  cardRecipe.innerHTML = `
  <div class="container-card-recipe">
    <div class="header-bg-card-recipe"><img src="/public/img-recipes/${recipe.image}" alt=""></div>

    <div class="content-card-recipe">
      <h2>${recipe.name}</h2>

      <span class="title-card">recette</span>
      <p title="${recipe.description}">${truncatedDescription}</p>

      <span class="title-card">Ingrédients</span>
      <div class="row">
        ${ingredientsHTML}
      </div>
    </div>

    <div class="time-recipe"><p>${recipe.time}min</p></div>
  </div>
`;

  return cardRecipe;
}
