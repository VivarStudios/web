import * as THREE from 'three/webgpu';
import { Experience, gltfLoader } from './experience.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class MillerExperience extends Experience {
    constructor(_canvasContainerId, _canvasId) {
        super(_canvasContainerId, _canvasId, false, true);
    }

    loadModel() {
        gltfLoader.load('/model/miller-web.glb', (gltf) => {
            this.scene.add(gltf.scene);

            this.camera = gltf.cameras[0];

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            // Controls
            const controls = new OrbitControls(this.camera, this.canvas);
            controls.target.set(
                gltf.scene.position.x,
                gltf.scene.position.y,
                gltf.scene.position.z
            );
            controls.enableDamping = true;
        });

        /**
         * Lights
         */
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5);
        directionalLight.castShadow = true;
        directionalLight.position.set(2, 0.75, -1).normalize().multiplyScalar(10);
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.bottom = -10;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.near = 0.01;
        directionalLight.shadow.camera.far = 20;
        directionalLight.shadow.radius = 3;
        directionalLight.shadow.normalBias = 0.1;
        this.scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x859dff, 1);
        this.scene.add(ambientLight);
    }

    onTick() {
        // Update controls
        this.controls?.update();
    }

    onCameraAspectChange() {
        // empty method
    }
}
