class Player {
    constructor({ ctx, level, x, y, playerColor, playerWidth }) {
        this.ctx = ctx;
        this.level = level;

        this.playerColor = playerColor;
        this.playerWidth = playerWidth;

        this.x = x;
        this.y = y;

        this.walk = 0;
        this.rotate = 0;

        this.cameraAngle = 0;

        this.moveSpeed = 3;                         // 3 pixels
        this.rotateSpeed = (Math.PI / 180) * 3;     // 3 degrees

        // this.direction = direction;
        // this.screen = screen;
        // this.color = color;
    }

    setupControls () {
        const keyDowns = {
            'w': () => {
                this.walk++;
            },
            's': () => {
                this.walk--;
            },
            'a': () => {
                this.rotate--;
            },
            'd': () => {
                this.rotate++;
            }

        }

        const keyUps = {
            'w': () => {
                this.walk--;
            },
            's': () => {
                this.walk++;
            },
            'a': () => {
                this.rotate++;
            },
            'd': () => {
                this.rotate--;
            }
        }

        document.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (!keyDowns[event.key]) return;
            keyDowns[event.key]();

            console.log(event.key);
            console.log({moveDirection: this.walk});
            console.log({rotateDirection: this.rotate});
        });
        
        document.addEventListener('keyup', (event) => {
            if (event.repeat) return;
            if (!keyUps[event.key]) return;
            keyUps[event.key]();

            console.log(event.key);
            console.log({moveDirection: this.walk});
            console.log({rotateDirection: this.rotate});
        });
    }


    move () {
        const moveStep = this.walk * this.moveSpeed;
        const rotateStep = this.rotate * this.rotateSpeed;
        this.cameraAngle += rotateStep;

        const newPlayerX = this.x + Math.cos(this.cameraAngle) * moveStep;
        const newPlayerY = this.y + Math.sin(this.cameraAngle) * moveStep;

        this.x = newPlayerX;
        this.y = newPlayerY;

    }


    


    draw() {
        const playerRadius = this.playerWidth / 2;
        
        const xStart = this.x-playerRadius;
        const yStart = this.y-playerRadius;
        const xEnd = this.playerWidth;
        const yEnd = this.playerWidth;

        this.ctx.fillStyle = this.playerColor;
        this.ctx.fillRect(xStart, yStart, xEnd, yEnd);
    }
}

export default Player;