import vivarFootbarHtml from './vivar-footbar.html?raw';

class vivarFootbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = vivarFootbarHtml;
    }
}

customElements.define('vivar-footbar', vivarFootbar);
