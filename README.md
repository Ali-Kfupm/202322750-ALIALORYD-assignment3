# 202322750-ALIALORYD-assignment1
# Personal Portfolio Website

## Project Description
This project is a responsive personal portfolio website built using **HTML, CSS, and JavaScript**.

The website includes:
- Hero section with introduction
- About Me
- Projects (project cards + technologies used)
- Skills
- Contact form (frontend only, no backend)
- Footer with LinkedIn link

The design follows a clean dark theme and is fully responsive across **desktop, tablet, and mobile** devices.

---

## Technologies Used
- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript (Vanilla JS)
- Responsive design using Media Queries

---

## Features
- Fixed navigation bar with scroll shadow effect
- Active navigation highlighting while scrolling
- Smooth scrolling between sections
- Responsive layout for desktop, tablet, and phone
- Contact form (frontend interaction only)
- Dynamic footer year
- Clean and organized code structure

---

### Dynamic Content

A dynamic filtering system was implemented for the Projects section.

Users can select a category from a dropdown menu, and the displayed projects update instantly based on the selection. The filtering logic is data-driven, using project categories defined in a separate data file.

If no projects match the selected category, a message is displayed to inform the user.

---

### Data Handling

A dark/light theme toggle was implemented using JavaScript and localStorage.

When the user changes the theme, the selected preference is saved in localStorage. On future visits or page refreshes, the website reads the saved value and automatically applies the user’s preferred theme.

---

## Setup Instructions (Run Locally)
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/202322750-ALIALORYD-assignment1.git

