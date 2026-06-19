import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor(_canvas)
    {
        super();

        this.canvas = _canvas;
        
        // Setup
        if (this.canvas) {
            this.width = this.canvas.clientWidth;
            this.height = this.canvas.clientHeight;
        } else {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        }
        
        

        // Resize event
        window.addEventListener('resize', () => this.onResize());
    }

    onResize() {
        
        if (this.canvas) {
            this.width = this.canvas.clientWidth;
            this.height = this.canvas.clientHeight;
        } else {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        }


        this.trigger('resize');
    }
}