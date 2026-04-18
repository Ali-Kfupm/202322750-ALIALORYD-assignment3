# Technical Documentation

## 1. Architecture Overview
The application is a static web-based portfolio built using modular JavaScript.

Structure:
- HTML → layout
- CSS → styling and responsiveness
- JavaScript → interactivity and dynamic rendering

---

## 2. JavaScript Modules

### 2.1 script.js
Handles:
- Navigation behavior (scroll + active links)
- Theme toggle using localStorage
- Contact form validation and EmailJS integration
- GitHub API fetching
- Project filtering
- Project details toggle (localStorage persistence)

---

### 2.2 projects.js
Responsible for:
- Rendering project cards dynamically
- Creating HTML structure for each project
- Handling project images, tags, and links
- Adding expandable details section

---

### 2.3 projectsData.js
Stores project information:
- id
- title
- description
- fullDescription
- tags
- category
- status

---

## 3. GitHub API Integration

Endpoint used:
https://api.github.com/users/{username}/repos


Features:
- Filters out forked repositories
- Sorts by latest update
- Displays:
  - Name
  - Description
  - Language
  - Stars
  - Last update date

---

## 4. Contact Form System

Uses EmailJS:
- Sends user message to site owner
- Sends auto-reply confirmation to user

Validation:
- Required fields
- Email format check
- Minimum message length

Submission states:
- Sending
- Success
- Error

---

## 5. Project Details Toggle

Each project card includes:
- Show/Hide Details button

State is stored using:
localStorage.setItem("project-details-{id}", "open/closed")


Behavior:
- Persists after page refresh
- Independent per project

---

## 6. Performance Optimization

Techniques used:
- Image compression (WebP)
- Lazy loading (`loading="lazy"`)
- Async decoding (`decoding="async"`)
- Fixed image dimensions (reduces layout shift)

---

## 7. Responsiveness

Media queries:
- Adjust layout for tablets and mobile
- Convert grid to single-column
- Mobile navigation menu

---

## 8. Accessibility Considerations
- Semantic HTML structure
- aria-expanded for toggle buttons
- form labels for inputs

---

## 9. Limitations
- EmailJS relies on third-party service
- GitHub API is rate-limited
- No backend (client-side only) 

---

## 10. Future Improvements
- Add backend instead of EmailJS
- Add authentication for admin features
- Improve GitHub section with pagination
- Add animations for smoother transitions