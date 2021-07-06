import Player from "./Player";

class Input {
    public playerMovement = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    constructor() {

        document.addEventListener('keydown', (e) => {
            switch(e.keyCode) {
                case 37:
                    this.playerMovement.left = true;
                break;

                case 38:
                    this.playerMovement.up = true;
                break;
                
                case 39:
                    
                    this.playerMovement.right = true;
                break;
                
                case 40:
                    this.playerMovement.down = true;
                break;
            };
        });

        document.addEventListener('keyup', (e) => {
            switch(e.keyCode) {
                case 37:
                    this.playerMovement.left = false;
                break;

                case 38:
                    this.playerMovement.up = false;
                break;
                
                case 39:
                    
                    this.playerMovement.right = false;
                break;
                
                case 40:
                    this.playerMovement.down = false;
                break;
            };
        });
    };
};

export default Input;