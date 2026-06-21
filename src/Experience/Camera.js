import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor(_sizes, _scene, _canvas, _debug) {
        this.sizes = _sizes;
        this.scene = _scene;
        this.canvas = _canvas;
        this.debug = _debug;

        this.setInstance();
        this.setControls();
        this.setDebug();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.instance.position.set(4, 2, 4);
        this.scene.add(this.instance);
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }

    setDebug() {
        // Debug
        this.debugFolder = this.debug.addFolder('camera');

        // Debug
        if (this.debugFolder) {
            this.debugFolder.add(this.instance.position, 'x').name('positionX').step(1);
            this.debugFolder.add(this.instance.position, 'y').name('positionY').step(1);
            this.debugFolder.add(this.instance.position, 'z').name('positionZ').step(1);
        }
    }
}
