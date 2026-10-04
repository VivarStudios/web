import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { SkyMesh } from 'three/addons/objects/SkyMesh.js';
import * as THREE from 'three/webgpu';

export default class MillerExperience {
    constructor(_canvasContainerId, _canvasId) {
        this.canvas = document.getElementById(_canvasId);
        this.canvasContainer = document.getElementById(_canvasContainerId);

        /**
         * Loaders
         */
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.setDRACOLoader(dracoLoader);

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
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x111111);

        /**
         * Models
         */
        const sky = new SkyMesh();
        //sky.scale.set(100, 100, 100);
        sky.scale.setScalar(450000);
        this.scene.add(sky);

        this.gltfLoader.load('/model/miller-web.glb', (gltf) => {
            console.log(gltf.scene);
            this.scene.add(gltf.scene);

            this.camera = gltf.cameras[0];
            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            // Controls
            //const controls = new OrbitControls(this.camera, this.canvas);
            //controls.target.set(0, 1, 0);
            //controls.enableDamping = true;
            this.initSky();
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

        /**
         * Animate
         */
        const tick = () => {
            // Update controls
            //controls.update();

            // Render
            if (this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        };

        this.renderer.setAnimationLoop(tick);
    }

    refreshSize() {
        this.sizes.width = this.canvasContainer.offsetWidth;
        this.sizes.height = this.canvasContainer.offsetHeight;
    }

    initSky() {
        // Add Sky
        const sky = new SkyMesh();
        sky.scale.setScalar( 450000 );
        this.scene.add(sky);

		const sun = new THREE.Vector3();

				/// GUI

				const effectController = {
					turbidity: 10,
					rayleigh: 3,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.7,
					elevation: 65,
					azimuth: 0,
					exposure: 0.05,
					cloudCoverage: 0.4,
					cloudDensity: 0.4,
					cloudElevation: 0.5,
					showSunDisc: true
				};

				function guiChanged() {

					sky.turbidity.value = effectController.turbidity;
					sky.rayleigh.value = effectController.rayleigh;
					sky.mieCoefficient.value = effectController.mieCoefficient;
					sky.mieDirectionalG.value = effectController.mieDirectionalG;
					sky.cloudCoverage.value = effectController.cloudCoverage;
					sky.cloudDensity.value = effectController.cloudDensity;
					sky.cloudElevation.value = effectController.cloudElevation;
					sky.showSunDisc.value = effectController.showSunDisc;

					const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
					const theta = THREE.MathUtils.degToRad( effectController.azimuth );

					sun.setFromSphericalCoords( 1, phi, theta );

					sky.sunPosition.value.copy( sun );

					//this.renderer.toneMappingExposure = effectController.exposure;

				}

				//const gui = this.renderer.inspector.createParameters( 'Settings' );
//
				//gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
				//gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
				//gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
				//gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
				//gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
				//gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
				//gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );
				//gui.add( effectController, 'showSunDisc' ).onChange( guiChanged );

				//const folderClouds = gui.addFolder( 'Clouds' );
				//folderClouds.add( effectController, 'cloudCoverage', 0, 1, 0.01 ).name( 'coverage' ).onChange( guiChanged );
				//folderClouds.add( effectController, 'cloudDensity', 0, 1, 0.01 ).name( 'density' ).onChange( guiChanged );
				//folderClouds.add( effectController, 'cloudElevation', 0, 1, 0.01 ).name( 'elevation' ).onChange( guiChanged );

				guiChanged();

			}
}
