import footerHtml from './footer.html?raw';
import emailjs from '@emailjs/browser';

class Footer extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = footerHtml;
        }

        const form = document.querySelector('#contactForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
                .then(() => alert('¡Enviado!'))
                .catch((err) => alert('Error: ' + err));
        });
    }
}

customElements.define('vivar-footer', Footer);
