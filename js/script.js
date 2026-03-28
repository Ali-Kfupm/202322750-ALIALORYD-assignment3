/* =====================================================
   import components and data from separate modules
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

/* =====================================================
   DYNAMIC FOOTER YEAR
===================================================== */
if (year) {
  year.textContent = new Date().getFullYear();
}

/* =====================================================
   HEADER SHADOW + ACTIVE NAV LINK
   One optimized scroll listener instead of two
===================================================== */
function handleScroll() {
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
   CONTACT FORM FEEDBACK
===================================================== */
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "Thank you. Your message has been prepared successfully.";
    contactForm.reset();
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
    // Save the user's preference in localStorage
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    themeToggle.textContent = isLightMode ? "☀️" : "🌙";
  });
}

applySavedTheme();

/* =====================================================
   RENDER PROJECTS cards
===================================================== */
function renderFilterOptions() {
  const filterSelect = document.getElementById("projectFilter");
  if (!filterSelect) return;

  filterSelect.innerHTML = "";

  // always include "all"
  const categories = ["all"];

  // extract unique categories from data
  projectsData.forEach(project => {
    if (!categories.includes(project.category)) {
      categories.push(project.category);
    }
  });

  // generate options
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;

    // capitalize first letter
    option.textContent =
      cat.charAt(0).toUpperCase() + cat.slice(1);

    filterSelect.appendChild(option);
  });
}

renderProjects();
renderFilterOptions();

const filterSelect = document.getElementById("projectFilter");

if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    const selected = filterSelect.value;
    const cards = document.querySelectorAll(".card");

    const noProjectsMessage = document.getElementById("noProjectsMessage");

let visibleCount = 0;

cards.forEach(card => {
  const category = card.dataset.category;

  if (selected === "all" || category === selected) {
    card.style.display = "block";
    visibleCount++;
  } else {
    card.style.display = "none";
  }
});

// show message if no results
if (noProjectsMessage) {
  if (visibleCount === 0) {
    noProjectsMessage.style.display = "block";
  } else {
    noProjectsMessage.style.display = "none";
  }
}
  });
}