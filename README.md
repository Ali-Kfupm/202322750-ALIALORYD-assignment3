# 202322750-ALIALORYD-assignment3

## 📌 Overview
This project is a personal portfolio website developed as part of SWE363. It showcases my background, projects, skills, and contact functionality through a structured and interactive web interface.

The website is designed with a focus on:
- Clean UI design
- Interactive JavaScript features
- Real-world integration (APIs and email services)
- Performance optimization

---

## 🚀 Live Demo
https://ali-kfupm.github.io/202322750-ALIALORYD-assignment3/

---

## 📂 Project Structure
project-root/
│── index.html
│── css/
│ └── styles.css
│── js/
│ ├── script.js
│ ├── component/
│ │ └── projects.js
│ └── data/
│ └── projectsData.js
│── assets/
│ └── images/
│── docs/
│ ├── technical-documentation.md
│ └── ai-usage-report.md

---

## ✨ Features

### 1. Navigation & UI
- Fixed navigation bar with active section highlighting
- Smooth scrolling between sections
- Responsive layout (desktop + mobile)
- Dark/Light mode toggle with localStorage

---

### 2. Projects Section
- Dynamic rendering using JavaScript
- Category filtering (All / Web / System / Mobile)
- “Show Details / Hide Details” toggle for each project
- Project state is saved using `localStorage`

---

### 3. GitHub Integration (NEW)
- Fetches repositories dynamically using GitHub API
- Displays latest repositories sorted by update date
- Shows language, stars, and last updated time

---

### 4. Contact Form (Enhanced)
- Form validation (required fields, email format, message length)
- Real email sending using EmailJS
- Auto-reply email sent to user
- Submission states:
  - Sending...
  - Success
  - Error handling

---

### 5. Performance Optimization (NEW)
- Images resized and compressed (WebP)
- Lazy loading for project images
- Added `width` and `height` attributes
- Optimized rendering behavior

---

## 🌐 Compatibility
- Tested on Chrome, Edge, and mobile browsers
- Responsive design supports desktop, tablet, and mobile devices

---

## 🧭 How to Use the Website (Improved UX)

1. **Start at the Home (Hero) section**
   - Read a brief introduction

2. **Navigate using the top navbar**
   - About → background and goals
   - Projects → view all work
   - GitHub → latest repositories
   - Skills → technical abilities
   - Contact → send a message

3. **Projects Section**
   - Use the filter dropdown to select a category
   - Click **“Show Details”** to expand a project
   - Details will remain open even after refresh

4. **Contact Section**
   - Fill all fields (Name, Email, Subject, Message)
   - Click “Send Message”
   - You will receive a confirmation email

---

## 🛠 Technologies Used
- HTML5
- CSS3 (Responsive Design + Variables)
- JavaScript (ES Modules)
- GitHub REST API
- EmailJS

---

## 📥 Installation

Clone the repository:
git clone https://github.com/Ali-Kfupm/202322750-ALIALORYD-assignment3.git

Open `index.html` in a browser.

---

## 📌 Notes
- This project uses EmailJS (no backend required)
- GitHub API is used for dynamic content
- LocalStorage is used for UI state persistence

---

## 👤 Author
Ali Aloryd