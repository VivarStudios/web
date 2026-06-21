import welcomeHtml from './welcome-section.html?raw';
import Experience from '/Experience/Experience.js'


class WelcomeSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = welcomeHtml;
        }

        const experience = new Experience(this.querySelector('canvas.webgl'))
    }
}

customElements.define('welcome-section', WelcomeSection);
