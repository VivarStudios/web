import aboutMeHTML from './about-section.html?raw';


class AboutSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = aboutMeHTML;
        }
    }
}

customElements.define('about-section', AboutSection);