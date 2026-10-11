import * as THREE from 'three/webgpu';
import { Experience, gltfLoader } from './experience.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class MillerExperience extends Experience {
    constructor(_canvasContainerId, _canvasId) {
        super(_canvasContainerId, _canvasId, true, true);
    }

    loadModel() {
        gltfLoader.load('/model/miller-web.glb', (gltf) => {
            this.scene.add(gltf.scene);

            this.camera = gltf.cameras[0];

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            // 2. Inicializar la GUI
            const gui = this.renderer.inspector.createParameters('Control de Cámara');

            // Crear carpetas para organizar los datos
            const posFolder = gui.addFolder('Posición');
            const rotFolder = gui.addFolder('Rotación (Radianes)');

            // Añadir los controladores y usar .listen() para que se actualicen en vivo
            posFolder.add(this.camera.position, 'x').listen();
            posFolder.add(this.camera.position, 'y').listen();
            posFolder.add(this.camera.position, 'z').listen();

            rotFolder.add(this.camera.rotation, 'x').name('Rotar X').listen();
            rotFolder.add(this.camera.rotation, 'y').name('Rotar Y').listen();
            rotFolder.add(this.camera.rotation, 'z').name('Rotar Z').listen();
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
