import * as THREE from 'three/webgpu';
import { Experience, gltfLoader } from './experience.js';

export default class MillerExperience extends Experience {
    constructor(_canvasContainerId, _canvasId) {
        super(_canvasContainerId, _canvasId, false, true);
    }

    loadModel() {
        gltfLoader.load('/model/miller-web.glb', (gltf) => {
            //console.log(gltf);
            const model = gltf.scene;
            this.scene.add(model);

            this.camera = gltf.cameras[0];

            this.mixer = new THREE.AnimationMixer(model);
            for (const animation of gltf.animations) {
                this.mixer.clipAction(animation).play();
            }

            model.children.forEach((child) => {
                if (child.isMesh) {
                    //console.log(child.name);
                    //if (['terreno_campo', 'terreno_base_molino'].includes(child.name)) {
                    //    child.receiveShadow = true;
                    //} else {
                    //    child.castShadow = true;
                    //    child.receiveShadow = true;
                    //}
                }
            });

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();
        });

        this.exrLoader.load('/envMaps/forest.exr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            //this.scene.background = texture;
            this.scene.environment = texture;
        });
    }

    onTick() {
        this.mixer?.update(this.delta * 0.001);
        // Update controls
        this.controls?.update();
    }

    onCameraAspectChange() {
        // empty method
    }
}
