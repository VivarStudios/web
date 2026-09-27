import './toolbar/vivar-toolbar.js';
import './toolbar/vivar-footbar.js';

import './sections/welcome/welcome-section.js';
import './sections/about-me/about-section.js';
import './sections/work/work-section.js';
import './sections/contact/contact-section.js';

//import Experience from './Experience/Experience.js';

//const experience = new Experience(document.querySelector('canvas.webgl'))

document.documentElement.dataset.theme = 'light';

// Colocar esto antes de cualquier otra cosa en tu script
history.scrollRestoration = 'manual';
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
