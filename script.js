// Receptes (g d'espècia per kg de massa)
// Ajusta els valors segons el teu full de càlcul original
const recipes = {
  "sobrasada-dolca": {
    name: "Sobrassada dolça",
    spices: {
      "Pebre vermell dolç": 50,  // g/kg
      "Pebre coent": 3,
      "Sal": 25,
      "Conservant": 2
    },
    cookTime: null
  },
  "sobrasada-coenta": {
    name: "Sobrassada coenta",
    spices: {
      "Pebre vermell dolç": 30,
      "Pebre coent": 20,
      "Sal": 25,
      "Conservant": 2
    },
    cookTime: null
  },
  "botifarrons": {
    name: "Botifarrons",
    spices: {
      "Pebre coent": 4,
      "Sal": 25,
      "Pebre bo": 7
    },
    cookTime: 20  // minuts, si ho vols indicar
  },
  "camaiot": {
    name: "Camaiot",
    spices: {
      "Pebre coent": 4,
      "Sal": 25,
      "Pebre bo": 7
    },
    cookTime: 180 // 3 hores
  }
};

let currentRecipeKey = null;

// Elements del DOM
const homeScreen = document.getElementById("home-screen");
const calculatorScreen = document.getElementById("calculator-screen");
const recipeTitle = document.getElementById("recipe-title");
const kgInput = document.getElementById("kgInput");
const resultsTitle = document.getElementById("results-title");
const resultsTableBody = document.querySelector("#results-table tbody");
const cookTimeP = document.getElementById("cook-time");
const backButton = document.getElementById("back-button");

// Mostrar pantalla calculadora
function openCalculator(recipeKey) {
  currentRecipeKey = recipeKey;
  const recipe = recipes[recipeKey];

  recipeTitle.textContent = recipe.name;
  resultsTitle.textContent = `Quantitats d'espècies`;

  // Valor per defecte (p. ex. 10 kg)
  kgInput.value = 10;

  updateResults();

  homeScreen.classList.add("hidden");
  calculatorScreen.classList.remove("hidden");
}

// Tornar a l'inici
function goHome() {
  calculatorScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  currentRecipeKey = null;
}

// Recalcular resultats
function updateResults() {
  if (!currentRecipeKey) return;

  const recipe = recipes[currentRecipeKey];
  const kg = parseFloat(String(kgInput.value).replace(",", "."));

  resultsTableBody.innerHTML = "";

  if (isNaN(kg) || kg <= 0) {
    cookTimeP.textContent = "";
    return;
  }

  // Crear files de la taula
  Object.entries(recipe.spices).forEach(([name, gramsPerKg]) => {
    const totalGrams = gramsPerKg * kg;
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = name;

    const amountCell = document.createElement("td");
    amountCell.textContent = totalGrams.toFixed(1).replace(".", ",");

    row.appendChild(nameCell);
    row.appendChild(amountCell);
    resultsTableBody.appendChild(row);
  });

  // Temps de cocció, si existeix
  if (recipe.cookTime && recipe.cookTime > 0) {
    cookTimeP.textContent =
      `Temps de cocció recomanat: ${recipe.cookTime} minuts aproximadament.`;
  } else {
    cookTimeP.textContent = "";
  }
}

// Events
document.querySelectorAll(".recipe-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const recipeKey = btn.getAttribute("data-recipe");
    openCalculator(recipeKey);
  });
});

backButton.addEventListener("click", goHome);
kgInput.addEventListener("input", updateResults);
