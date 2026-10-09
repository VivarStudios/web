import * as THREE from 'three/webgpu';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { Inspector } from 'three/addons/inspector/Inspector.js';

/**
 * Loaders
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
export const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
// Loaders
export const textureLoader = new THREE.TextureLoader();

export class Experience {
    constructor(_canvasContainerId, _canvasId, _showInspector = false, _rendererAlpha = false) {
        this.canvas = document.getElementById(_canvasId);
        this.canvasContainer = document.getElementById(_canvasContainerId);

        this.scene = new THREE.Scene();

        /**
         * Sizes
         */
        this.sizes = {
            width: 0,
            height: 0,
        };

        this.refreshSize();

        window.addEventListener('resize', () => {
            // Update sizes
            this.refreshSize();

            // Update camera
            if (this.camera) {
                this.camera.aspect = this.sizes.width / this.sizes.height;
                this.onCameraAspectChange();
                this.camera.updateProjectionMatrix();
            }

            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        /**
         * Renderer
         */
        this.renderer = new THREE.WebGPURenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: _rendererAlpha,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (_rendererAlpha) {
            this.renderer.setClearColor(0x000000, 0);
        } else {
            this.renderer.setClearColor(0x111111);
        }

        if (_showInspector) {
            this.renderer.inspector = new Inspector();
        }

        this.loadModel();

        /**
         * Animate
         */
        const tick = () => {
            this.onTick();

            // Renders
            if (this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        };

        this.renderer.setAnimationLoop(tick);
    }

    loadModel() {
        throw new Error('El método loadModel() debe ser implementado en la clase hija.');
    }

    onTick() {
        throw new Error('El método onTick() debe ser implementado en la clase hija.');
    }

    onCameraAspectChange() {
        throw new Error('El método onCameraAspectChange() debe ser implementado en la clase hija.');
    }

    refreshSize() {
        this.sizes.width = this.canvasContainer.offsetWidth;
        this.sizes.height = this.canvasContainer.offsetHeight;
    }
}
