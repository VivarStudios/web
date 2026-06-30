import stackHTML from './stack-section.html?raw';


class StackSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = stackHTML;
        }
    }
}

customElements.define('stack-section', StackSection);