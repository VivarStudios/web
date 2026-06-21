import VivarStudiosText from './VivarStudiosText.js';

export default class World {
    constructor(_scene, _resources, _time, _debug) {
        this.scene = _scene;
        this.resources = _resources;
        this.time = _time;
        this.debug = _debug;

        // Wait for resources
        this.resources.on('ready', () => this.onReady());
    }

    onReady() {
        // Setup
        this.vivarStudiosText = new VivarStudiosText(
            this.scene,
            this.resources,
            this.time,
            this.debug
        );
    }

    update() {
        this.vivarStudiosText?.update();
    }
}
