import Ray from "./ray.model";

class Player {
    constructor({ ctx, level, x, y, playerColor, playerWidth }) {
        this.ctx = ctx;
        this.level = level;

        this.playerColor = playerColor;
        this.playerWidth = playerWidth;

        this.x = x;
        this.y = y;

        this.walk = 0;
        this.spin = 0;

        this.facingAngle = 0;

        this.moveSpeed = 3;                         // 3 pixels
        this.rotateSpeed = (Math.PI / 180) * 3;     // 3 degrees


        this.rays = [];
        this.FOV = 60;
        this.rayAmount = level.screenWidth;

        this.angleIncrement = (this.FOV / this.rayAmount) * (Math.PI / 180);
        this.initialAngle = this.facingAngle - (this.FOV / 2) * (Math.PI / 180);

        for (let i = 0; i < this.rayAmount; i++) {
            this.rays[i] = new Ray({
                ctx,
                level,
                column: i,
                x: this.x,
                y: this.y,
                FOV: this.FOV,
                facingAngle: this.initialAngle + (i * this.angleIncrement),
            });
        }

    }

    setupControls() {
        const keyDowns = {
            'w': () => {
                this.walk++;
            },
            's': () => {
                this.walk--;
            },
            'a': () => {
                this.spin--;
            },
            'd': () => {
                this.spin++;
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
                this.spin++;
            },
            'd': () => {
                this.spin--;
            }
        }

        document.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (!keyDowns[event.key]) return;
            keyDowns[event.key]();
        });
        
        document.addEventListener('keyup', (event) => {
            if (event.repeat) return;
            if (!keyUps[event.key]) return;
            keyUps[event.key]();
        });
    }


    collision(x, y) {
        let collision = false;

        const tileX = Math.floor(x / this.level.tileWidth);
        const tileY = Math.floor(y / this.level.tileHeight);

        if (this.level.isWall(tileX, tileY)) collision = true;

        return collision;
    }


    move() {
        const moveStep = this.walk * this.moveSpeed;
        const rotateStep = this.spin * this.rotateSpeed;
        this.facingAngle += rotateStep;

        const newPlayerX = this.x + Math.cos(this.facingAngle) * moveStep;
        const newPlayerY = this.y + Math.sin(this.facingAngle) * moveStep;

        if (!this.collision(newPlayerX, this.y)) this.x = newPlayerX;
        if (!this.collision(this.x, newPlayerY)) this.y = newPlayerY;

        if (this.facingAngle > Math.PI * 2) this.facingAngle -= Math.PI * 2;
        if (this.facingAngle < 0) this.facingAngle += Math.PI * 2;

        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].setOrigin(this.x, this.y);
            this.rays[i].setAngle(this.facingAngle + this.initialAngle + (i * this.angleIncrement));
        }
    }


    render() {
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(0, 0, this.level.screenWidth, this.level.screenHeight);

        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].renderWall();            
        }
    }


    draw() {        

        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].draw();            
        }
        
        const playerRadius = this.playerWidth / 2;
        
        const xStart = this.x-playerRadius;
        const yStart = this.y-playerRadius;
        const xEnd = this.playerWidth;
        const yEnd = this.playerWidth;

        this.ctx.fillStyle = this.playerColor;
        this.ctx.fillRect(xStart, yStart, xEnd, yEnd);


        // FACING ANGLE LINE
        // const lineLength = 80;
        // const lineColor = 'red';
        // const lineX = this.x + Math.cos(this.facingAngle) * lineLength;
        // const lineY = this.y + Math.sin(this.facingAngle) * lineLength;

        // this.ctx.beginPath();
        // this.ctx.moveTo(this.x, this.y);
        // this.ctx.lineTo(lineX, lineY);
        // this.ctx.strokeStyle = lineColor;
        // this.ctx.stroke();

    }
}

export default Player;