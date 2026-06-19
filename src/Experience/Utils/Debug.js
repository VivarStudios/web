import GUI from 'lil-gui'

export default class Debug
{
    constructor() {
        if(window.location.hash === '#debug') {
            this.ui = new GUI({ width: 400 });
        }
    }

    addFolder(title) {
        return this.ui?.addFolder(title);
    }

    destroy() {
        this.ui?.destroy();
    }
}