// DropdownComponent.js
// src : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter
// Temporairement juste pour l'intégration en argument de fonction je passe un tableau avec des items dedans.
// barre de recherche filtre des tags peut rester ici

export function createDropdownComponent(buttonLabel = "Dropdown", links = []) {
  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "dropdown";

  // Créer le bouton dropdown
  const button = document.createElement("button");
  button.className = "dropbtn";
  button.style.borderRadius = "11px";
  button.innerHTML = `${buttonLabel} <i class="fa-solid fa-chevron-down"></i>`;
  button.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
    const icon = button.querySelector("i");
    if (dropdownContent.classList.contains("show")) {
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
      button.style.borderRadius = "11px 11px 0 0";
    } else {
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
      button.style.borderRadius = "11px";
    }
  });

  // Créer le contenu du dropdown
  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";

  // Crée un champ de recherche
  const input = document.createElement("input");
  input.type = "text";
  input.id = "myInput";

  // Ajoute un événement pour filtrer les liens à chaque frappe
  input.addEventListener("keyup", () => {
    const filter = input.value.toUpperCase(); // Récupère la saisie en majuscules
    const a = dropdownContent.getElementsByTagName("a"); // Sélectionne tous les liens du menu déroulant

    // Parcourt chaque lien pour vérifier s'il contient le texte recherché
    for (let i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      a[i].style.display =
        txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none"; // Affiche ou masque le lien
    }
  });

  // Ajout de l'input de recherche au contenu
  dropdownContent.appendChild(input);

  // Créer la liste du dropdown
  links.forEach((linkText) => {
    const link = document.createElement("a");
    link.href = `#${linkText.toLowerCase()}`;
    link.innerText = linkText;
    dropdownContent.appendChild(link);
  });

  // Ajouter le bouton et le contenu au conteneur déroulant
  dropdownContainer.appendChild(button);
  dropdownContainer.appendChild(dropdownContent);

  return dropdownContainer;
}
