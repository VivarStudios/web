import contactHTML from './contact-section.html?raw';

class ContactSection extends HTMLElement {
    timeOut3Seconds;

    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = contactHTML;
        }
        if (!this.modalLoading) {
            this.modalLoading = this.querySelector('#contact-modalLoading');
        }
        if (!this.modalSuccess) {
            this.modalSuccess = this.querySelector('#contact-modalSuccess');
        }
        if (!this.modalError) {
            this.modalError = this.querySelector('#contact-modalError');
        }

        const form = this.querySelector('#contactForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendEmail({
                name: form.name.value,
                email: form.email.value,
                message: form.message.value,
            });
        });
    }

    async sendEmail(data) {
        clearTimeout(this.timeOut3Seconds);

        this.modalLoading.showModal();

        const controller = new AbortController();
        const requestTimeout = setTimeout(() => {
            controller.abort();
            this.closeModal(this.modalLoading);
            this.showErrorModal();
        }, 10000);

        try {
            const response = await fetch('/send-mail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                signal: controller.signal,
            });

            if (response.ok) {
                this.showModal(this.modalSuccess);
            } else {
                this.showModal(this.modalError);
            }
        } catch (error) {
            console.error('Error:', error);
            this.showModal(this.modalError);
        } finally {
            clearTimeout(requestTimeout);
            this.closeModal(this.modalLoading);
        }
    }

    closeModal(modal) {
        modal?.close();
    }

    showModal(modal) {
        if (!modal) {
            return;
        }

        clearTimeout(this.timeOut3Seconds);
        modal.showModal();
        this.timeOut3Seconds = setTimeout(() => {
            modal.close();
        }, 3000);
    }
}

customElements.define('contact-section', ContactSection);
