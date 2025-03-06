let openDropdown = null;

export function createDropdownComponent(
  buttonLabel = "Dropdown",
  links = [],
  onSelect
) {
  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "dropdown";

  // Créer le bouton dropdown
  const button = document.createElement("button");
  button.className = "dropbtn";
  button.style.borderRadius = "11px";
  button.innerHTML = `${buttonLabel} <i class="fa-solid fa-chevron-down"></i>`;

  // Créer le contenu du dropdown
  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";

  // Ajouter un champ de recherche avec son style original
  const containerInput = document.createElement("div");
  containerInput.className = "container-input-search";
  const input = document.createElement("input");
  input.type = "text";
  input.id = "myInput";
  input.className = "dropdown-search";

  // Ajouter un conteneur pour les options
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "dropdown-options";

  containerInput.appendChild(input);
  dropdownContent.appendChild(containerInput);
  dropdownContent.appendChild(optionsContainer);

  // Fonction pour mettre à jour la liste des options
  function updateList(newLinks) {
    optionsContainer.innerHTML = "";
    newLinks.forEach((linkText) => {
      const link = document.createElement("a");
      link.href = `#${linkText.toLowerCase()}`;
      link.innerText = linkText;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        onSelect(linkText, buttonLabel);
        dropdownContent.classList.remove("show");
        openDropdown = null;
      });
      optionsContainer.appendChild(link);
    });
  }

  // Fonction pour gérer l'ouverture/fermeture du dropdown
  function attachDropdownEvent() {
    button.addEventListener("click", () => {
      if (openDropdown && openDropdown !== dropdownContent) {
        openDropdown.classList.remove("show");
      }
      dropdownContent.classList.toggle("show");
      openDropdown = dropdownContent.classList.contains("show")
        ? dropdownContent
        : null;

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
  }

  // Filtrer les options en fonction de l'input
  input.addEventListener("keyup", () => {
    const filter = input.value.toUpperCase();
    const items = optionsContainer.getElementsByTagName("a");

    for (let i = 0; i < items.length; i++) {
      const txtValue = items[i].textContent || items[i].innerText;
      items[i].style.display = txtValue.toUpperCase().includes(filter)
        ? ""
        : "none";
    }
  });

  // Initialisation
  updateList(links);
  attachDropdownEvent();

  // Ajouter le bouton et le menu au container
  dropdownContainer.appendChild(button);
  dropdownContainer.appendChild(dropdownContent);

  // Exposer updateList pour mise à jour dynamique
  dropdownContainer.updateList = updateList;

  return dropdownContainer;
}
