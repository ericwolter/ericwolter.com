const THEME_KEY = "theme";
const root = document.documentElement;
const buttons = document.querySelectorAll(".theme-button");

const applyTheme = (value) => {
  if (value === "light" || value === "dark") {
    root.setAttribute("data-theme", value);
  } else {
    root.removeAttribute("data-theme");
  }
  buttons.forEach((button) => {
    const active = button.dataset.theme === value;
    button.setAttribute("data-active", active ? "true" : "false");
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
};

const saved = localStorage.getItem(THEME_KEY) || "system";
applyTheme(saved);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.theme;
    localStorage.setItem(THEME_KEY, value);
    applyTheme(value);
  });
});

const media = window.matchMedia("(prefers-color-scheme: dark)");
media.addEventListener("change", () => {
  const current = localStorage.getItem(THEME_KEY) || "system";
  if (current === "system") {
    applyTheme("system");
  }
});
