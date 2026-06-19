import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super();

        this.sources = sources;

        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders()
    {
        // Draco loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('draco/');

        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new THREE.TextureLoader(),
            cubeTextureLoader: new THREE.CubeTextureLoader()
        };
        
        this.loaders.gltfLoader.setDRACOLoader(dracoLoader);
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            let loader = undefined;
            switch(source.type) {
                case 'gltfModel':
                    loader = this.loaders.gltfLoader;
                    break;
                case 'texture':
                    loader = this.loaders.textureLoader;
                    break;
                case 'cubeTexture':
                    loader = this.loaders.cubeTextureLoader;
                    break;
            }

            if (loader) {
                loader.load(
                    source.path,
                    (file) => this.sourceLoaded(source, file)
                );
            } else {
                console.warn(`not found loader for source.type: ${source.type}`);
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file;

        this.loaded++;

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready');
        }
    }
}