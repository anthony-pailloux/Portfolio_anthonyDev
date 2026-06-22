/**
 * Portfolio Anthony Pailloux — JavaScript vanilla
 */

const FORM_SUCCESS =
  "Votre message a bien été envoyé. Je vous répondrai dès que possible.";
const FORM_ERROR_TECHNICAL =
  "Une erreur technique est survenue. Contactez-moi directement par email.";
const FORM_ERROR_NETWORK =
  "Impossible d'envoyer le message pour le moment. Contactez-moi directement par email.";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollReveal();
  initContactForm();
  initScrollSpy();
  initScrollTop();
});

function initMobileMenu() {
  const burger = document.getElementById("burger-btn");
  const nav = document.getElementById("nav-menu");
  const backdrop = document.getElementById("nav-backdrop");
  if (!burger || !nav) return;

  function setMenu(open) {
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    nav.classList.toggle("is-open", open);
    if (backdrop) backdrop.classList.toggle("is-visible", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  burger.addEventListener("click", () => {
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  if (backdrop) {
    backdrop.addEventListener("click", () => setMenu(false));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

function initScrollSpy() {
  const navLinks = document.querySelectorAll(".nav__link[href^='#']");
  if (!navLinks.length) return;

  const sectionIds = Array.from(navLinks).map((link) =>
    link.getAttribute("href").slice(1)
  );
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateActiveLink() {
    const scrollY = window.scrollY;
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
      10
    ) || 72;

    let currentId = "";

    for (const section of sections) {
      const top = section.offsetTop - headerHeight - 80;
      if (scrollY >= top) {
        currentId = section.id;
      }
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("is-active", isActive);
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
}

function initScrollTop() {
  const btn = document.getElementById("scroll-top-btn");
  if (!btn) return;

  function toggleBtn() {
    btn.classList.toggle("is-visible", window.scrollY > 400);
  }

  window.addEventListener("scroll", toggleBtn, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const feedback = document.getElementById("form-success");
  const submitBtn = form.querySelector('[type="submit"]');
  const defaultBtnText = submitBtn?.textContent ?? "Envoyer le message";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resetFormState(form, feedback);

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const subject = form.querySelector("#subject");
    const message = form.querySelector("#message");
    const honeypot = form.querySelector('[name="_honey"]');

    if (!validateForm(name, email, subject, message)) {
      return;
    }

    if (honeypot && honeypot.value.trim()) {
      form.reset();
      setFeedback(feedback, FORM_SUCCESS, true);
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi en cours…";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        if (data?.errors) {
          applyServerErrors(data.errors);
        }
        setFeedback(feedback, data?.message ?? FORM_ERROR_TECHNICAL, false);
        return;
      }

      form.reset();
      setFeedback(feedback, data.message || FORM_SUCCESS, true);
    } catch {
      setFeedback(feedback, FORM_ERROR_NETWORK, false);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      }
    }
  });

  form.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      const err = document.getElementById(`${input.id}-error`);
      if (err) err.textContent = "";
    });
  });
}

function applyServerErrors(errors) {
  Object.entries(errors).forEach(([fieldId, text]) => {
    const input = document.getElementById(fieldId);
    if (input) setError(input, text);
  });
}

function validateForm(name, email, subject, message) {
  let ok = true;

  if (!name.value.trim()) {
    setError(name, "Le nom est requis.");
    ok = false;
  }

  if (!email.value.trim()) {
    setError(email, "L'email est requis.");
    ok = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setError(email, "Veuillez entrer une adresse email valide.");
    ok = false;
  }

  if (!subject.value.trim()) {
    setError(subject, "Le sujet est requis.");
    ok = false;
  }

  if (!message.value.trim()) {
    setError(message, "Le message est requis.");
    ok = false;
  }

  return ok;
}

function resetFormState(form, feedback) {
  form.querySelectorAll(".form-input").forEach((input) => {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
  });
  form.querySelectorAll(".form-error").forEach((el) => {
    el.textContent = "";
  });
  if (feedback) {
    feedback.hidden = true;
    feedback.textContent = "";
    feedback.classList.remove("form-success", "form-error-message");
  }
}

function setError(input, text) {
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
  const err = document.getElementById(`${input.id}-error`);
  if (err) err.textContent = text;
}

function setFeedback(el, text, success) {
  if (!el) return;
  el.hidden = false;
  el.textContent = text;
  el.setAttribute("role", success ? "status" : "alert");
  el.classList.remove("form-success", "form-error-message");
  el.classList.add(success ? "form-success" : "form-error-message");
}
