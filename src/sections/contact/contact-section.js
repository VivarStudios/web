import contactHTML from './contact-section.html?raw';

class ContactSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = contactHTML;
        }
    }
}

customElements.define('contact-section', ContactSection);
