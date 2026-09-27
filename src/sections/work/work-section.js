import workHTML from './work-section.html?raw';

class WorkSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = workHTML;
        }
    }
}

customElements.define('work-section', WorkSection);
