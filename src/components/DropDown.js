// DropdownComponent.js
// src : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter
// Temporairement j'ai un tableau avec des items dedans.

export function createDropdownComponent(buttonLabel = "Dropdown", links = []) {
  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "dropdown";

  // Create dropdown button
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

  // Create dropdown content
  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";

  // Create search input
  const input = document.createElement("input");
  input.type = "text";
  input.id = "myInput";
  input.addEventListener("keyup", () => {
    const filter = input.value.toUpperCase();
    const a = dropdownContent.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  });

  // Append input to dropdown content
  dropdownContent.appendChild(input);

  // Create dropdown links
  links.forEach((linkText) => {
    const link = document.createElement("a");
    link.href = `#${linkText.toLowerCase()}`;
    link.innerText = linkText;
    dropdownContent.appendChild(link);
  });

  // Append button and content to dropdown container
  dropdownContainer.appendChild(button);
  dropdownContainer.appendChild(dropdownContent);

  return dropdownContainer;
}
