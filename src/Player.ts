import Input from "./Input";
import Level from "./Level";

interface Vector2d{
    x: number,
    y: number,
}

class Player {
    input: Input;
    level: Level;

    width: number;
    height: number;
    position: Vector2d;
    move: number;
    rotate: number;
    angel: number;
    speedMove: number;
    speedRotate: number;

    color: string;

    constructor(level: Level, x: number, y: number) {
        this.input = new Input();
        this.level = level;
        
        this.position = {x: x, y: y}
        this.move = 0;
        this.rotate = 0;
        this.angel = 0;
        this.speedMove = 3;                     //<- pixels
        this.speedRotate = 3 * (Math.PI / 180); //<- grados

        this.width = 6;
        this.height = 6;

        this.color = '#0f0'
    };

    private angleNormalization(angle: number) {
        angle = angle % (2 * Math.PI);

        if(angle < 0)
            angle = angle + (2 * Math.PI);
        
        return angle;
    };

    public collision(x: number, y: number) {
        let isColliding = false;

        // Averiguamos en que tile esta el jugador
        let tile: Vector2d = {x: 0, y: 0}
        tile.x = Math.floor(x / this.level.tileWidth);
        tile.y = Math.floor(y / this.level.tileHeight);

        if(this.level.collision(tile.x, tile.y))
            isColliding = true;
        
        return isColliding;
    };

    public movement() {
        if(this.input.playerMovement.up) {
            this.move = 1;
        }else if(this.input.playerMovement.down) {
            this.move = -1;
        }else{
            this.move = 0;
        };

        if(this.input.playerMovement.right) {
            this.rotate = 1;
        }else if(this.input.playerMovement.left) {
            this.rotate = -1;
        }else{
            this.rotate = 0;
        };
    };

    public update() {
        this.movement();
        let newPos: Vector2d = {x:0, y:0};
        
        //Avanzamos
        newPos.x = this.position.x + (Math.cos(this.angel) * this.speedMove * this.move);
        newPos.y = this.position.y + (Math.sin(this.angel) * this.speedMove * this.move);

        if(!this.collision(newPos.x, newPos.y)) {
            this.position.x = newPos.x;
            this.position.y = newPos.y;
        }

        //Giramos
        this.angel += this.rotate * this.speedRotate;
        this.angel = this.angleNormalization(this.angel);
    };

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        // Cuadrito
        ctx.fillRect(this.position.x - this.width/2, this.position.y - this.height/2, this.width, this.height);

        // Linea de dirección
        let destiny: Vector2d = {x:0, y:0};
        destiny.x = this.position.x + Math.cos(this.angel) * 40;
        destiny.y = this.position.y + Math.sin(this.angel) * 40;

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(destiny.x, destiny.y);
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

        console.log(this.angel);
    };
};

export default Player;