import contactHTML from './contact-section.html?raw';

class ContactSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = contactHTML;
        }

        const form = document.querySelector('#contactForm');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendEmail({
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            });
        });
    }

    sendEmail(data) {
        fetch('/send-mail.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then((response) => response?.json())
        .then((data) => {
            console.log('Success:', data);
            alert('¡Enviado!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Mi Error: ' + error);
        });
    }
}

customElements.define('contact-section', ContactSection);
