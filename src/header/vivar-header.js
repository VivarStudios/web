import vivarheaderHtml from './vivar-header.html?raw';

class VivarHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = vivarheaderHtml;

    const switchEl = this.querySelector('#theme-switch');

    switchEl.checked = localStorage.theme === 'dark';

    switchEl.addEventListener('change', (e) => {
      localStorage.theme = e.target.checked ? "dark" : "light";
      document.documentElement.dataset.theme = localStorage.theme;
    });
  }
}

customElements.define('vivar-header', VivarHeader);