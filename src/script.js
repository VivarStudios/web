import './components/header/vivar-header.js';

import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

// =======================================
// Support light mode, dark mode
// =======================================
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document
    .documentElement
    .classList
    .toggle(
        "dark",
        localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
document.documentElement.dataset.theme = localStorage.theme ?? "light";

// Whenever the user explicitly chooses light mode
//localStorage.theme = "light";
// Whenever the user explicitly chooses dark mode
//localStorage.theme = "dark";
// Whenever the user explicitly chooses to respect the OS preference
//localStorage.removeItem("theme");