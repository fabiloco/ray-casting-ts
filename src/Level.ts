class Level {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public roomWidth: number;
    public roomHeight: number;
    public room: number[][]  = [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,1,1,0,1],
        [1,0,0,1,0,0,0,1,0,1],
        [1,0,0,1,0,0,0,1,0,1],
        [1,0,0,0,0,0,1,1,0,1],
        [1,0,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ];
    // Tiles dimensions
    public tileWidth: number;
    public tileHeight: number;
    public wallColor = '#000000';
    public floorColor = '#666666';

    constructor(canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.roomWidth = this.room.length;
        this.roomHeight = this.room[0].length;

        this.tileWidth = this.canvas.width / this.roomWidth;
        this.tileHeight = this.canvas.height / this.roomHeight;
    }

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