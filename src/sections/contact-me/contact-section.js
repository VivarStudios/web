import contactHtml from './contact-section.html?raw';
import emailjs from '@emailjs/browser';

class ContactSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = contactHtml;

            const form = this.querySelector('#contactForm');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                emailjs
                    .sendForm('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
                    .then(() => alert('¡Enviado!'))
                    .catch((err) => alert('Error: ' + err));
            });
        }
    }
}

customElements.define('contact-section', ContactSection);
