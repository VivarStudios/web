import * as THREE from 'three'

export default class VivarStudiosText {

    constructor(_scene, _resources, _time, _debug)
    {
        this.scene = _scene
        this.resources = _resources
        this.time = _time
        this.debug = _debug

        // Debug
        //this.debugFolder = this.debug.addFolder('Text')

        // Resource
        this.resource = this.resources.items.vivarStudiosText

        this.setModel()
        //this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.scene.add(this.model)

        // Baked material
        const bakedMaterial = new THREE.MeshMatcapMaterial({ color: 0xffffff })

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material = bakedMaterial
            }
        })
    }

    update() {
        
    }
}