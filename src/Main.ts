import Level from "./Level";
import Player from "./Player";

class Main {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private FPS: number    = 50;
    
    // Canvas dimensions
    private WIDTH: number  = 500;
    private HEIGHT: number = 500;

    private level: Level;
    private player: Player;

    private lastTime: number = 0;

    constructor() {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext("2d");
        
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;

        this.level = new Level(this.canvas, this.ctx);
        this.player = new Player(this.level, 100, 100);
    }

    private clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    };

    private update = () => {
        this.player.update();
    };

    private draw = () => {
        this.clearCanvas();
        // this.level.draw(this.ctx);
        this.player.draw(this.ctx);
    };

    public gameloop = (timeStamp) => {
        let deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        this.update();
        this.draw();

        requestAnimationFrame(this.gameloop);
    };
};

window.addEventListener('DOMContentLoaded', () => {
    const main: Main = new Main();  
    requestAnimationFrame(main.gameloop);
    //main.gameloop();         
});