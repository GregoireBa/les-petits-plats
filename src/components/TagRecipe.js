// TagRecipe.js

export function createTag(label, category, onRemove) {
  const tagElement = document.createElement("div");
  tagElement.className = "tag-recipe";
  tagElement.dataset.category = category; // Permet de savoir si c'est un ingrédient, ustensile ou appareil

  const tagLabel = document.createElement("span");
  tagLabel.textContent = label;

  const closeButton = document.createElement("button");
  closeButton.className = "tag-close";
  closeButton.innerHTML = "&times;"; // Symbole de fermeture
  closeButton.addEventListener("click", () => onRemove(label, category));

  tagElement.appendChild(tagLabel);
  tagElement.appendChild(closeButton);

  return tagElement;
}
