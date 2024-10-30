import { api } from "./src/api/api.js";
import { createDropdownComponent } from "./src/components/DropDown.js";
import "./style.css";

async function init() {
  const app = document.querySelector("#app");
  const recipes = api.getAllrecipes();

  document.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector("#app");
    const dropdownComponent1 = createDropdownComponent("Ingrédients", [
      "About",
      "Contact",
      "Blog",
    ]);
    const dropdownComponent2 = createDropdownComponent("Appareils", [
      "Support",
      "Tools",
      "Custom",
    ]);

    const dropdownComponent3 = createDropdownComponent("Ustensiles", [
      "Support",
      "Tools",
      "Custom",
    ]);
    app.appendChild(dropdownComponent1);
    app.appendChild(dropdownComponent2);
    app.appendChild(dropdownComponent3);
  });
}

init();
