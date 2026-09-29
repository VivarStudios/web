import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { checker, positionLocal, sin, time, uv, vec2, vec3 } from 'three/tsl';
import * as THREE from 'three/webgpu';

export default class MillerExperience {
    constructor(_canvasContainerId, _canvasId) {
        this.canvas = document.getElementById(_canvasId);
        this.canvasContainer = document.getElementById(_canvasContainerId);

        this.scene = new THREE.Scene();
        const textureLoader = new THREE.TextureLoader();

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
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

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
        this.camera.position.x = 5;
        this.camera.position.y = 4.5;
        this.camera.position.z = 2.5;
        this.scene.add(this.camera);

        // Controls
        const controls = new OrbitControls(this.camera, this.canvas);
        controls.target.set(0, 1, 0);
        controls.enableDamping = true;

        /**
         * Renderer
         */
        this.renderer = new THREE.WebGPURenderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x111111);

        /**
         * Floor
         */
        {
            const textureColor = textureLoader.load('./floor-color.jpg');
            textureColor.colorSpace = THREE.SRGBColorSpace;

            const geometry = new THREE.PlaneGeometry(10, 10, 10, 10);

            const material = new THREE.MeshStandardMaterial({ map: textureColor });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = 0 - Math.PI * 0.5;
            mesh.receiveShadow = true;
            this.scene.add(mesh);
        }

        /**
         * Torus Knot
         */
        {
            const geometry = new THREE.TorusKnotGeometry(0.5, 0.24, 128, 32);
            const material = new THREE.MeshStandardNodeMaterial({
                metalness: 0.5,
            });

            // prettier-ignore
            const pattern = checker(
                uv()
                    .add(time.mul(0.02))
                    .mul(vec2(40, 5))
            );

            material.colorNode = vec3(pattern, 0, 0);
            material.roughnessNode = pattern;
            const zOffset = sin(time);
            material.positionNode = positionLocal.add(vec3(0, 0, zOffset));

            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.position.y = 1;
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

        /**
         * Animate
         */
        const tick = () => {
            // Update controls
            controls.update();

            // Render
            this.renderer.render(this.scene, this.camera);
        };

        this.renderer.setAnimationLoop(tick);
    }

    refreshSize() {
        this.sizes.width = this.canvasContainer.offsetWidth;
        this.sizes.height = this.canvasContainer.offsetHeight;
    }
}
