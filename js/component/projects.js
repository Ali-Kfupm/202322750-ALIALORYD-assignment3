/* =====================================================
   PROJECT RENDERING MODULE
   - Displays project cards dynamically
   - Supports expand/collapse functionality
   - Saves state using localStorage
===================================================== */

import { projectsData } from "../data/projectsData.js";

function isProjectOpen(projectId) {
  return localStorage.getItem(`project-details-${projectId}`) === "open";
}

export function renderProjects() {
  const container = document.getElementById("projectsContainer");

  if (!container) return;

  container.innerHTML = "";

  projectsData.forEach((project) => {
    const isOpen = isProjectOpen(project.id);

    const tagsHTML = project.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");

    const imageHTML = project.image
      ? `<img
           src="${project.image}"
           alt="${project.title} preview"
           loading="lazy"
           decoding="async"
           width="800"
           height="450"
           class="project-preview-image"
         >`
      : `<div class="placeholder-text">Project Preview</div>`;

    const linkHTML =
      project.link && project.link !== "#"
        ? `<a class="link" href="${project.link}" target="_blank" rel="noopener">${project.linkText}</a>`
        : `<span class="link disabled-link">${project.linkText}</span>`;

    const card = `
      <article
        class="card"
        data-category="${project.category}"
        data-project-id="${project.id}"
      >
        <div class="card-image">${imageHTML}</div>

        <h3 class="card-title">${project.title}</h3>
        <p class="card-text">${project.description}</p>

        <button
          class="btn ghost details-toggle"
          type="button"
          aria-expanded="${isOpen ? "true" : "false"}"
        >
          ${isOpen ? "Hide Details" : "Show Details"}
        </button>

        <div class="project-details ${isOpen ? "open" : ""}">
          <p class="card-text">${project.fullDescription}</p>
          <div class="tags">
            ${tagsHTML}
            <span class="tag">${project.status}</span>
          </div>
          <div class="card-actions">
            ${linkHTML}
          </div>
        </div>
      </article>
    `;

    container.insertAdjacentHTML("beforeend", card);
  });
}