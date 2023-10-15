class Ray {
    constructor({ ctx, level, x, y, facingAngle }) {
        this.ctx = ctx;
        this.level = level;

        this.x = x;
        this.y = y;

        this.facingAngle = facingAngle;

        this.wallHitX = 0;
        this.wallHitY = 0;

        this.wallHitXHorizontal = 0;
        this.wallHitYHorizontal = 0;

        this.wallHitXVertical = 0;
        this.wallHitYVertical = 0;

    }


    setOrigin(x, y) {
        this.x = x;
        this.y = y;
    }


    setAngle(angle) {
        if (angle < 0) angle += Math.PI * 2;
        if (angle > Math.PI * 2) angle -= Math.PI * 2;
        this.facingAngle = angle;
    }


    cast() {
        this.xIntercept = 0;
        this.yIntercept = 0;


        this.faceDown = 0 < this.facingAngle && this.facingAngle < Math.PI;
        this.faceLeft = Math.PI * 0.5 < this.facingAngle && this.facingAngle < Math.PI * 1.5;


        // Horizontal wall hit

        let horizontalWallHit = false;        

        this.yIntercept = Math.floor(this.y / this.level.tileHeight) * this.level.tileHeight;
        if (this.faceDown) this.yIntercept += this.level.tileHeight;
        this.xIntercept = this.x + (this.yIntercept - this.y) / Math.tan(this.facingAngle);
    

        this.yStep = this.level.tileHeight;
        this.xStep = this.yStep / Math.tan(this.facingAngle);


        if (!this.faceDown) this.yStep = -this.yStep;
        if ((this.faceLeft && this.xStep > 0) || (!this.faceLeft && this.xStep < 0)) this.xStep = -this.xStep;


        let nextHorizontalTouchX = this.xIntercept;
        let nextHorizontalTouchY = this.yIntercept;


        if (!this.faceDown) nextHorizontalTouchY--;


        while (!horizontalWallHit) {
            const tileX = parseInt(nextHorizontalTouchX / this.level.tileWidth);
            const tileY = parseInt(nextHorizontalTouchY / this.level.tileHeight);


            if (this.level.isWall(tileX, tileY)) {
                horizontalWallHit = true;
                this.wallHitXHorizontal = nextHorizontalTouchX;
                this.wallHitYHorizontal = nextHorizontalTouchY;
                console.log({x: this.wallHitXHorizontal, y: this.wallHitYHorizontal})
            } else {
                nextHorizontalTouchX += this.xStep;
                nextHorizontalTouchY += this.yStep;
            }
        }


        // Vertical wall hit

        let verticalWallHit = false;

        this.xIntercept = Math.floor(this.x / this.level.tileWidth) * this.level.tileWidth;
        if (!this.faceLeft) this.xIntercept += this.level.tileWidth;
        this.yIntercept = this.y + (this.xIntercept - this.x) * Math.tan(this.facingAngle);


        this.xStep = this.level.tileWidth;
        this.yStep = this.xStep * Math.tan(this.facingAngle);


        if (this.faceLeft) this.xStep = -this.xStep;
        if ((this.faceDown && this.yStep < 0) || (!this.faceDown && this.yStep > 0)) this.yStep = -this.yStep;
        
        
        let nextVerticalTouchX = this.xIntercept;
        let nextVerticalTouchY = this.yIntercept;


        if (this.faceLeft) nextVerticalTouchX--;


        while (!verticalWallHit) {
            const tileX = parseInt(nextVerticalTouchX / this.level.tileWidth);
            const tileY = parseInt(nextVerticalTouchY / this.level.tileHeight);


            if (this.level.isWall(tileX, tileY)) {
                verticalWallHit = true;
                this.wallHitXVertical = nextVerticalTouchX;
                this.wallHitYVertical = nextVerticalTouchY;
                console.log({x: this.wallHitXVertical, y: this.wallHitYVertical})
            } else {
                nextVerticalTouchX += this.xStep;
                nextVerticalTouchY += this.yStep;
            }
        }


        // Distance

        let HDistance = 0;
        let VDistance = 0;

        if (horizontalWallHit) HDistance = Math.sqrt((this.wallHitXHorizontal - this.x) * (this.wallHitXHorizontal - this.x) + (this.wallHitYHorizontal - this.y) * (this.wallHitYHorizontal - this.y));
        if (verticalWallHit) VDistance = Math.sqrt((this.wallHitXVertical - this.x) * (this.wallHitXVertical - this.x) + (this.wallHitYVertical - this.y) * (this.wallHitYVertical - this.y));

        if (HDistance < VDistance) {
            this.wallHitX = this.wallHitXHorizontal;
            this.wallHitY = this.wallHitYHorizontal;
        } else {
            this.wallHitX = this.wallHitXVertical;
            this.wallHitY = this.wallHitYVertical;
        }

    }   

    draw() {
        this.cast();

        const xEnd = this.wallHitX;
        const yEnd = this.wallHitY;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(xEnd, yEnd);
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.stroke();


    }
}

export default Ray;