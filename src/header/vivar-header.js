import vivarheaderHtml from './vivar-header.html?raw';

class VivarHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = vivarheaderHtml;
    }
}

customElements.define('vivar-header', VivarHeader);
