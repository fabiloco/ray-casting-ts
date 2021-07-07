class Sprite {

    x: number;
    y: number;
    image: HTMLImageElement;

    distance: number;
    angel: number;

    visible: boolean;

    constructor(x: number, y: number, image: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.image = image;

        this.distance = 0;
        this.angel = 0;

        this.visible = false;
    };
};

export default Sprite;