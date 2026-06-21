import footerHtml from "./footer.html?raw";

class Footer extends HTMLElement {
  connectedCallback() {
    if (!this.innerHTML) {
      this.innerHTML = footerHtml;
    }
  }
}

customElements.define("vivar-footer", Footer);