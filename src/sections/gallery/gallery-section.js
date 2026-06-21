import galleryHtml from './gallery-section.html?raw';

class GallerySection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = galleryHtml;
        }
    }
}

customElements.define('gallery-section', GallerySection);
