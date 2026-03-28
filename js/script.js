/* =====================================================
   Import components and data from separate modules
===================================================== */
import { renderProjects } from "./component/projects.js";
import { projectsData } from "./data/projectsData.js";

/* =====================================================
   CACHE COMMON ELEMENTS
===================================================== */
const header = document.querySelector("header");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const themeToggle = document.getElementById("themeToggle");
const filterSelect = document.getElementById("projectFilter");
const noProjectsMessage = document.getElementById("noProjectsMessage");

/* =====================================================
   DYNAMIC FOOTER YEAR
===================================================== */
if (year) {
  year.textContent = new Date().getFullYear();
}

/* =====================================================
   HEADER SHADOW + ACTIVE NAV LINK
===================================================== */
function handleScroll() {
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 50);

  const scrollPosition = window.scrollY + 140;
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSectionId}`;
    link.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

/* =====================================================
   MOBILE MENU TOGGLE
===================================================== */
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =====================================================
   THEME TOGGLE + LOCAL STORAGE
===================================================== */
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light-mode");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    themeToggle.textContent = isLightMode ? "☀️" : "🌙";
  });
}

applySavedTheme();

/* =====================================================
   CONTACT FORM FEEDBACK
===================================================== */
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    // Validation
    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.style.color = "#ff6b6b";
      return;
    }

    // Simple email format check
    if (!email.includes("@") || !email.includes(".")) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.style.color = "#ff6b6b";
      return;
    }

    // Success message
    formStatus.textContent = "Message sent successfully!";
    formStatus.style.color = "var(--accent-color)";
    contactForm.reset();
  });
}

/* =====================================================
   RENDER FILTER OPTIONS FROM DATA
===================================================== */
function renderFilterOptions() {
  if (!filterSelect) return;

  filterSelect.innerHTML = "";

  const categories = ["all"];

  projectsData.forEach((project) => {
    if (!categories.includes(project.category)) {
      categories.push(project.category);
    }
  });

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    filterSelect.appendChild(option);
  });
}

/* =====================================================
   UPDATE "NO PROJECTS FOUND" MESSAGE
===================================================== */
function updateNoProjectsMessage() {
  if (!noProjectsMessage) return;

  const cards = document.querySelectorAll(".card");
  let visibleCount = 0;

  cards.forEach((card) => {
    if (card.style.display !== "none") {
      visibleCount++;
    }
  });

  noProjectsMessage.style.display = visibleCount === 0 ? "block" : "none";
}

/* =====================================================
   INITIAL RENDER
===================================================== */
renderProjects();
renderFilterOptions();
updateNoProjectsMessage();

/* =====================================================
   PROJECT FILTERING + ANIMATION
===================================================== */
if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    const selected = filterSelect.value;
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = selected === "all" || category === selected;

      if (shouldShow) {
        card.style.display = "block";

        requestAnimationFrame(() => {
          card.classList.remove("hide");
          updateNoProjectsMessage();
        });
      } else {
        card.classList.add("hide");

        setTimeout(() => {
          if (card.classList.contains("hide")) {
            card.style.display = "none";
            updateNoProjectsMessage();
          }
        }, 300);
      }
    });
  });
}