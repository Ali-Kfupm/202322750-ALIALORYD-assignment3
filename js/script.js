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
const githubReposContainer = document.getElementById("githubReposContainer");
const githubStatus = document.getElementById("githubStatus");
const submitBtn = document.getElementById("submitBtn");
const nameInput = document.getElementById("contactName");
const emailInput = document.getElementById("contactEmail");
const subjectInput = document.getElementById("contactSubject");
const messageInput = document.getElementById("contactMessage");

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
   EMAILJS CONTACT FORM
===================================================== */
const EMAILJS_PUBLIC_KEY = "L9nrvbDTjT5sMYjM6";
const EMAILJS_SERVICE_ID = "service_4eojnpk";
const EMAILJS_TEMPLATE_ID = "template_vo3ra85";

if (typeof emailjs !== "undefined") {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

function setFormStatus(message, type = "") {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.classList.remove("success", "error", "sending");

  if (type) {
    formStatus.classList.add(type);
  }
}

function setSubmitState(isSending) {
  if (!submitBtn) return;

  submitBtn.disabled = isSending;
  submitBtn.textContent = isSending ? "Sending..." : "Send Message";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactForm() {
  if (!nameInput || !emailInput || !subjectInput || !messageInput) return false;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !subject || !message) {
    setFormStatus("Please fill in all fields.", "error");
    return false;
  }

  if (!isValidEmail(email)) {
    setFormStatus("Please enter a valid email address.", "error");
    return false;
  }

  if (message.length < 10) {
    setFormStatus("Message must be at least 10 characters long.", "error");
    return false;
  }

  return true;
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateContactForm()) return;

    if (typeof emailjs === "undefined") {
      setFormStatus("Email service is not available right now.", "error");
      return;
    }

    try {
      setSubmitState(true);
      setFormStatus("Sending your message...", "sending");

      const response = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );

      console.log("Email sent:", response.status, response.text);

      setFormStatus("Your message was sent successfully!", "success");
      contactForm.reset();
    } catch (error) {
      console.error("Email send failed:", error);
      setFormStatus(
        "Sorry, your message could not be sent. Please try again later.",
        "error"
      );
    } finally {
      setSubmitState(false);
    }
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

  const cards = document.querySelectorAll("#projectsContainer .card");
  let visibleCount = 0;

  cards.forEach((card) => {
    if (card.style.display !== "none") {
      visibleCount++;
    }
  });

  noProjectsMessage.style.display = visibleCount === 0 ? "block" : "none";
}

/* =====================================================
   GITHUB REPOSITORIES
===================================================== */
const GITHUB_USERNAME = "Ali-Kfupm";

async function loadGitHubRepositories() {
  if (!githubReposContainer || !githubStatus) return;

  githubStatus.textContent = "Loading repositories...";
  githubStatus.style.color = "var(--text-muted, #8892b0)";
  githubReposContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const repos = await response.json();

    const visibleRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    if (visibleRepos.length === 0) {
      githubStatus.textContent = "No public repositories found.";
      return;
    }

    githubStatus.textContent = "";

    visibleRepos.forEach((repo) => {
      const repoCard = document.createElement("article");
      repoCard.className = "card github-card";

      repoCard.innerHTML = `
        <div class="card-image">GitHub Repo</div>
        <h3 class="card-title">${repo.name}</h3>
        <p class="card-text">
          ${repo.description ? repo.description : "No description provided."}
        </p>
        <div class="tags">
          <span class="tag">${repo.language ? repo.language : "No language"}</span>
          <span class="tag">★ ${repo.stargazers_count}</span>
          <span class="tag">Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
        <div class="card-actions">
          <a class="link" href="${repo.html_url}" target="_blank" rel="noopener">
            View Repository
          </a>
        </div>
      `;

      githubReposContainer.appendChild(repoCard);
    });
  } catch (error) {
    githubStatus.textContent =
      "Unable to load repositories right now. Please try again later.";
    githubStatus.style.color = "#ff6b6b";
    console.error("GitHub repositories error:", error);
  }
}

/* =====================================================
   PROJECT DETAILS TOGGLE + LOCAL STORAGE
===================================================== */
function setupProjectDetailsToggles() {
  const toggleButtons = document.querySelectorAll(".details-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const details = card.querySelector(".project-details");
      const projectId = card.dataset.projectId;

      if (!details || !projectId) return;

      const isOpen = details.classList.toggle("open");

      button.textContent = isOpen ? "Hide Details" : "Show Details";
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");

      localStorage.setItem(
        `project-details-${projectId}`,
        isOpen ? "open" : "closed"
      );
    });
  });
}

/* =====================================================
   INITIAL RENDER
===================================================== */
renderProjects();
setupProjectDetailsToggles();
renderFilterOptions();
updateNoProjectsMessage();
loadGitHubRepositories();

/* =====================================================
   PROJECT FILTERING + ANIMATION
===================================================== */
if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    const selected = filterSelect.value;
    const cards = document.querySelectorAll("#projectsContainer .card");

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