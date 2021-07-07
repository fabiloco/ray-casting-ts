class Level {
    private ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    public roomWidth: number;
    public roomHeight: number;
    public room: number[][]  = [
        [1,1,1,1,1,4,1,1,1,1],
        [4,0,0,0,0,0,0,0,0,1],
        [1,0,4,0,0,0,0,0,0,4],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,1,1,0,1],
        [1,0,0,3,0,0,0,1,0,1],
        [4,0,0,1,0,0,0,4,0,1],
        [1,0,0,0,0,0,1,1,0,1],
        [1,0,0,0,0,0,0,1,0,1],
        [1,1,4,1,1,1,1,1,2,1]
    ];
    // Tiles dimensions
    public tileWidth: number;
    public tileHeight: number;
    public tamTile: number = 50;

    public wallColor = '#000000';
    public floorColor = '#666666';

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.roomWidth = this.room.length;
        this.roomHeight = this.room[0].length;

        this.tileWidth = Math.floor(this.canvas.width / this.roomWidth);
        this.tileHeight = Math.floor(this.canvas.height / this.roomHeight);
    }

    public collision(x: number, y: number) {
        let isColliding = false;
        if(this.room[y][x] !== 0) 
            isColliding = true;
        
        return isColliding;
    };

    public tile(x: number, y: number) {
        let casillaX = Math.floor(x / this.tileWidth);
        let casillaY = Math.floor(y / this.tileHeight);
        return(this.room[casillaY][casillaX]);
    };

    public draw(ctx: CanvasRenderingContext2D){
        let color;
        for(let i = 0; i < this.roomWidth; i++) {
            for(let j = 0; j < this.roomHeight; j++) {
                if(this.room[j][i] === 1) {
                    color = this.wallColor;
                } else {
                    color = this.floorColor;
                }
                ctx.fillStyle = color;
                ctx.fillRect(i * this.tileWidth, j * this.tileHeight, this.tileWidth, this.tileHeight);
            };
        }
    };
};

export default Level;