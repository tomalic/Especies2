const CONFIG_KEY = "matances_config";

// Relació: clau guardada -> id de l'input
const fields = [
  ["pebreVermell", "cfg-pebre-vermell"],
  ["pebreCoent", "cfg-pebre-coent"],
  ["sal", "cfg-sal"],
  ["conservant", "cfg-conservant"],
  ["pebroBo", "cfg-pebro-bo"],
  ["llavors", "cfg-llavors"],
  ["coccio", "cfg-coccio"]
];

// Carregar configuració guardada (si n'hi ha)
const stored = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");

fields.forEach(([key, id]) => {
  const el = document.getElementById(id);
  if (el && stored[key] != null) {
    el.value = stored[key];
  }
});

// Botó DESAR
document.getElementById("saveConfig").addEventListener("click", () => {
  const cfg = {};

  fields.forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (!el) return;

    const v = el.value;
    if (v !== "") {
      cfg[key] = Number(v);
    }
  });

  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  alert("Configuració desada");
  history.back();
});

// Botó ESBORRAR
document.getElementById("clearConfig").addEventListener("click", () => {
  localStorage.removeItem(CONFIG_KEY);
  alert("Configuració esborrada");
  history.back();
});

// Botó TORNAR
document.getElementById("backConfig").addEventListener("click", () => {
  history.back();
});
