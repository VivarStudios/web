import workHTML from './work-section.html?raw';
import WireboxExperience from '../../experience/wirebox-experience';

class WorkSection extends HTMLElement {
    connectedCallback() {
        if (!this.innerHTML) {
            this.innerHTML = workHTML;
            this.experience = new WireboxExperience('work-canvas-container', 'work-canvas');
        }
    }
}

customElements.define('work-section', WorkSection);
