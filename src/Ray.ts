import Level from "./Level";

interface coordinates {
    x: number,
    y: number,
}

class Ray {
    level: Level;
    position: coordinates;
    playerAngle: number;
    angleIncrement: number;
    column: number;

    wallHitx: number;
    wallHity: number;

    wallHitYHorizontal: number;
    wallHitXHorizontal: number;

    wallHitYVertical: number;
    wallHitXVertical: number;

    constructor(level: Level, x: number, y: number, playerAngle: number, angleIncrement: number, column: number) {
        this.position = {x: x, y: y}
        this.level = level;
        this.playerAngle = playerAngle;
        this.angleIncrement = angleIncrement;
        this.column = column;

        this.wallHitx = 0;
        this.wallHity = 0;

        this.wallHitXHorizontal = 0;
        this.wallHitYHorizontal = 0;

        this.wallHitXVertical = 0;
        this.wallHitYVertical = 0;
    };

    private angleNormalization(angle: number) {
        angle = angle % (2 * Math.PI);

        if(angle < 0)
            angle = angle + (2 * Math.PI);
        
        return angle;
    };

    setAngulo(angulo: number) {
        this.playerAngle = this.angleNormalization(angulo + this.angleIncrement);
    };

    private distanceBetweenPoints(x1: number,y1: number, x2: number,y2: number): number {
        return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
    };

    public cast() {
        let xIntercept = 0;
        let yIntercept = 0;

        let xStep = 0;
        let yStep = 0;

        // Averiguamos la dirección en la que se mueve el rayo
        let down = false;
        let left = false;

        if(this.playerAngle < Math.PI)
            down = true;
        if(this.playerAngle > Math.PI / 2 && this.playerAngle < 3 * Math.PI / 2)
            left = true;
        
        //============================================================
        // Collision horizontal
        let choqueHorizontal = false;

        // Buscamos la primera intersección
        yIntercept = Math.floor(this.position.y / this.level.tamTile) * this.level.tamTile;

        // Si apunta hacia abajo, incrementamos un tile
        if(down)
            yIntercept += this.level.tamTile;
        
        let adyacente = (yIntercept - this.position.y) / Math.tan(this.playerAngle);
        xIntercept = this.position.x + adyacente;

        // Calculamos la distancia de cada paso
        yStep = this.level.tamTile;
        xStep = yStep / Math.tan(this.playerAngle);

        // Si vamos hacia arriba, invertimos el paso y
        if(!down)
            yStep = -yStep;
        
        // Comprovamos que el paso x es coherente
        if((left && xStep > 0) || (!left && xStep < 0))
            xStep = - xStep;
        
        let nextXHorizontal = xIntercept;
        let nextYHorizontal = yIntercept;

        // Si apunta hacia arriba, se resta un pixel para forzar la colision
        if(!down)
            nextYHorizontal--;
        
        // Bucle para buscar punto de colisión
        while(!choqueHorizontal){

            // Obtenemos la casilla redondeando por abajo
            let casillax = Math.floor(nextXHorizontal / this.level.tamTile);
            let casillay = Math.floor(nextYHorizontal / this.level.tamTile);

            if(this.level.collision(casillax, casillay)) {
                choqueHorizontal = true;
                this.wallHitXHorizontal = nextXHorizontal;
                this.wallHitYHorizontal = nextYHorizontal;
            } else {
                nextXHorizontal += xStep;
                nextYHorizontal += yStep;
            }
        }



        //============================================================
        // Collision horizontal


        let choqueVertical = false;

        // Buscamos la primera intersección
        xIntercept = Math.floor(this.position.x / this.level.tamTile) * this.level.tamTile;

        // Si apunta a la derecha, incrementamos 1 tile
        if(!left)
            xIntercept += this.level.tamTile;
        
        // Se le suma el cateto opuesto
        let opuesto = (xIntercept - this.position.x) * Math.tan(this.playerAngle);
        yIntercept = this.position.y + opuesto;


        //----------------------------------------
        // Calculamos la distancia de cada paso
        xStep = this.level.tamTile;

        // Si val a la izquierda, invertimos
        if(left) 
            xStep = - xStep;
        
        yStep = this.level.tamTile * Math.tan(this.playerAngle);

        if((!down && yStep > 0) || (down && yStep < 0))
            yStep = -yStep;

        let nextXVertical = xIntercept;
        let nextYVertical = yIntercept;

        if(left)
            nextXVertical--;
        
        // Bucle con saltos para detectar colisioón
        while(!choqueVertical && (nextXVertical >= 0 && nextYVertical >= 0 && nextXVertical < this.level.canvas.width && nextYVertical < this.level.canvas.height)) {
            // Obtenemos la casilla redondeando por abajo
            let casillaX = Math.floor(nextXVertical / this.level.tamTile);
            let casillaY = Math.floor(nextYVertical / this.level.tamTile);

            if(this.level.collision(casillaX, casillaY)) {
                choqueVertical = true;
                this.wallHitXVertical = nextXVertical;
                this.wallHitYVertical = nextYVertical;
            } else {
                nextXVertical += xStep;
                nextYVertical += yStep;
            }
        };

        let distanciaHorizontal = 9999;
        let distanciaVertical = 9999;

        if(choqueHorizontal) {
            distanciaHorizontal = this.distanceBetweenPoints(this.position.x, this.position.y, this.wallHitXHorizontal, this.wallHitYHorizontal);
        };

        if(choqueVertical) {
            distanciaVertical = this.distanceBetweenPoints(this.position.x, this.position.y, this.wallHitXVertical, this.wallHitYVertical);
        };

        if(distanciaHorizontal < distanciaVertical) {
            this.wallHitx = this.wallHitXHorizontal;
            this.wallHity = this.wallHitYHorizontal;
        } else {
            this.wallHitx = this.wallHitXVertical;
            this.wallHity = this.wallHitYVertical;
        };

        //-----------------------------------------
        // this.wallHitx = this.wallHitXHorizontal;
        // this.wallHity = this.wallHitYHorizontal;

        // this.wallHitx = this.wallHitXVertical;
        // this.wallHity = this.wallHitYVertical;
    };

    public draw(ctx: CanvasRenderingContext2D) {
        this.cast();

        // Mostrar linea rayo
        let xDestino = this.wallHitx;
        let yDestino = this.wallHity;

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(xDestino, yDestino);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    };
};

export default Ray;