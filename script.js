// ---------------- Loader com fade-in e tempo extra ----------------
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    // Espera 2 segundos antes de iniciar o fade-out
    setTimeout(() => {
      loader.style.opacity = "0"; // inicia o desaparecimento
      setTimeout(() => (loader.style.display = "none"), 600); // remove do fluxo após fade-out
    }, 2000); // tempo extra de exibição (2 segundos)
  }

  // Animação das barras de habilidades
  document.querySelectorAll(".bar > div").forEach((el) => {
    const w = el.getAttribute("data-width");
    if (w) el.style.width = w;
  });
});

// ---------------- Tema claro/escuro ----------------
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const pressed = themeToggle.getAttribute("aria-pressed") === "true";
    themeToggle.setAttribute("aria-pressed", (!pressed).toString());

    const label = document.querySelector(".toggle-label");
    if (label) {
      label.textContent = document.body.classList.contains("dark-theme")
        ? "Noite"
        : "Dia";
    }
  });
}

// ---------------- Seletor de idioma ----------------
const langSelect = document.getElementById("langSelect");
function applyLang(lang) {
  document.querySelectorAll("[data-pt], [data-es]").forEach((el) => {
    const text = el.getAttribute(lang === "es" ? "data-es" : "data-pt");
    if (text) el.textContent = text;
  });
}
if (langSelect) {
  langSelect.addEventListener("change", (e) => applyLang(e.target.value));
  applyLang(langSelect.value);
}

// ---------------- Botão voltar ao topo ----------------
const backTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

// ---------------- Modal CV ----------------
const openCvBtn = document.getElementById("openCvBtn");
const cvModal = document.getElementById("cvModal");
const cvClose = document.querySelector(".cv-modal__close");

if (openCvBtn && cvModal) {
  openCvBtn.addEventListener("click", () => {
    cvModal.style.display = "block";
  });
}

if (cvClose) {
  cvClose.addEventListener("click", () => {
    cvModal.style.display = "none";
  });
}

// Fechar clicando fora do modal
window.addEventListener("click", (e) => {
  if (e.target === cvModal) {
    cvModal.style.display = "none";
  }
});

// ---------------- Smooth scroll interno com offset do header ----------------
const HEADER_OFFSET = 80; // altura do header fixo

function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;
  const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
  const scrollTo = Math.max(elementTop - HEADER_OFFSET, 0);

  window.scrollTo({ top: scrollTo, behavior: "smooth" });
}

// Intercepta cliques em links internos (#)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    // Permite comportamento normal para "#" vazio
    if (!href || href === "#") return;

    e.preventDefault();
    smoothScrollTo(href);
  });
});



