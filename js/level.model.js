class Level {

    constructor({ screen, ctx, terrain, wallColor, floorColor }) {
        this.screen = screen;
        this.ctx = ctx;
        this.terrain = terrain;
        this.wallColor = wallColor;
        this.floorColor = floorColor;


        this.terrainWidth = terrain[0].length;
        this.terrainHeight = terrain.length;


        this.screenWidth = screen.width;
        this.screenHeight = screen.height;

        this.tileWidth = parseInt(this.screenWidth / this.terrainWidth);
        this.tileHeight = parseInt(this.screenHeight / this.terrainHeight);

    }


    isWall(x, y) {
        if (x < 0 || x >= this.terrain.length) return true;
        if (y < 0 || y >= this.terrain[0].length) return true;
        if (this.terrain[y] === undefined) return true;
        if (this.terrain[y][x] === undefined) return true;
        return this.terrain[y][x] === 1;
    }


    draw() {
        let color;

        for (let i = 0; i < this.terrainHeight; i++) {
            for (let j = 0; j < this.terrainWidth; j++) {
                if (this.terrain[i][j] === 1) {
                    color = this.wallColor;
                } else {
                    color = this.floorColor;
                }

                this.ctx.fillStyle = color;
                this.ctx.fillRect(j * this.tileWidth, i * this.tileHeight, this.tileWidth, this.tileHeight);
            }
        }

    }

}

export default Level;