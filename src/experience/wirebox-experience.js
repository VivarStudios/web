import * as THREE from 'three/webgpu';
import { Experience, textureLoader } from './experience.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { checker, positionLocal, sin, time, uv, vec2, vec3 } from 'three/tsl';

export default class WireboxExperience extends Experience {
    constructor(_canvasContainerId, _canvasId) {
        super(_canvasContainerId, _canvasId, false);
    }

    loadModel() {
        /**
         * Camera
         */
        // Base camera
        this.camera = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 6;
        this.scene.add(this.camera);

        // Controls
        //this.controls = new OrbitControls(this.camera, this.canvas);
        //this.controls.target.set(0, 0, 0);
        //this.controls.enableDamping = true;

        // Cornell box
        const wallMaterial = new THREE.MeshStandardNodeMaterial({ color: 0xcccccc });
        const boxSizes = {
            width: 3 * (this.sizes.width / this.sizes.height),
            height: 3,
            depth: 3,
        };

        // Floor
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(boxSizes.width, boxSizes.height),
            wallMaterial
        );
        this.floor.rotation.x = (-1 * Math.PI) / 2;
        this.floor.position.y = -boxSizes.height / 2;
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);

        // Ceiling
        this.ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(boxSizes.width, boxSizes.depth),
            wallMaterial
        );
        this.ceiling.rotation.x = Math.PI / 2;
        this.ceiling.position.y = boxSizes.height / 2;
        this.ceiling.receiveShadow = true;
        this.scene.add(this.ceiling);

        // Back wall
        this.backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(boxSizes.width, boxSizes.height),
            wallMaterial
        );
        this.backWall.position.z = -boxSizes.depth / 2;
        this.backWall.receiveShadow = true;
        this.scene.add(this.backWall);

        // Left wall (red)
        this.leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(boxSizes.depth, boxSizes.height),
            wallMaterial
        );
        this.leftWall.rotation.y = Math.PI / 2;
        this.leftWall.position.set(-boxSizes.width / 2, 0, 0);
        this.leftWall.receiveShadow = true;
        this.scene.add(this.leftWall);

        // Right wall (green)
        this.rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(boxSizes.depth, boxSizes.height),
            wallMaterial
        );
        this.rightWall.rotation.y = -Math.PI / 2;
        this.rightWall.position.set(boxSizes.width / 2, 0, 0);
        this.rightWall.receiveShadow = true;
        this.scene.add(this.rightWall);

        /**
         * Torus Knot
         */
        {
            const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
            const material = new THREE.MeshStandardNodeMaterial({
                metalness: 0.5,
            });

            const pattern = checker(uv().mul(vec2(10, 5)));
            material.colorNode = vec3(pattern, 0, 0);
            material.roughnessNode = pattern;

            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.scene.add(mesh);
        }

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
        //this.controls.update();
    }

    onCameraAspectChange() {
        // empty method
    }
}
