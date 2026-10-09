import './toolbar/vivar-toolbar.js';
import './toolbar/vivar-footbar.js';

import './sections/welcome/welcome-section.js';
import './sections/work/work-section.js';
import './sections/contact/contact-section.js';

document.documentElement.dataset.theme = 'light';

// para ir a la sección correspondiente en función del hash de la url
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
