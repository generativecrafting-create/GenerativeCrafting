(function () {
  "use strict";

  const THEME_STORAGE_KEY = "gc-theme";
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_STORAGE_KEY, next);
    });
  }

  const STORAGE_KEY = "gc-lang";
  const supported = ["de", "en"];
  const stored = localStorage.getItem(STORAGE_KEY);
  let currentLang = supported.includes(stored) ? stored : "de";

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.de;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });
    document.documentElement.lang = lang;

    const current = document.querySelector(".lang-current");
    const other = document.querySelector(".lang-other");
    if (current && other) {
      current.textContent = lang.toUpperCase();
      other.textContent = lang === "de" ? "EN" : "DE";
    }
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
  }

  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      setLang(currentLang === "de" ? "en" : "de");
    });
  }

  applyTranslations(currentLang);

  // Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Order form: AJAX submit to Formspree (falls back to normal POST if JS fails)
  const form = document.getElementById("order-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      const actionUrl = form.getAttribute("action") || "";
      if (actionUrl.includes("YOUR_FORM_ID")) {
        // Formspree not configured yet — let the note explain, don't attempt a request.
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const dict = translations[currentLang] || translations.de;
      status.textContent = dict["order.form.sending"];
      status.className = "form-status";

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          status.textContent = dict["order.form.success"];
          status.className = "form-status success";
          form.reset();
        } else {
          status.textContent = dict["order.form.error"];
          status.className = "form-status error";
        }
      } catch (err) {
        status.textContent = dict["order.form.error"];
        status.className = "form-status error";
      }
    });
  }
})();
