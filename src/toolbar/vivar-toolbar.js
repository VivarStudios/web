import vivarToolbarHtml from './vivar-toolbar.html?raw';

class vivarToolbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = vivarToolbarHtml;
    }
}

customElements.define('vivar-toolbar', vivarToolbar);
