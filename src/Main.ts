import Level from "./Level";

class Main {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private FPS: number    = 50;
    
    // Canvas dimensions
    private WIDTH: number  = 500;
    private HEIGHT: number = 500;

    private level: Level;

    constructor() {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext("2d");
        
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;

        this.level = new Level(this.canvas, this.ctx);
    }

    public gameloop = () => {
        setInterval(()=>{
            this.level.draw(this.ctx);
        }, 1000/this.FPS);
    };
};

window.addEventListener('DOMContentLoaded', () => {
    const main: Main = new Main();  
    main.gameloop();         
});