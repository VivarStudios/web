import welcomeHtml from './welcome-section.html?raw';
import MillerExperience from '../../experience/miller-experience';

class WelcomeSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = welcomeHtml;
            this.experience = new MillerExperience('welcome-canvas-container', 'welcome-canvas');
        }
    }
}

customElements.define('welcome-section', WelcomeSection);
