import welcomeHtml from './welcome-section.html?raw';

class WelcomeSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = welcomeHtml;
        }
    }
}

customElements.define('welcome-section', WelcomeSection);
