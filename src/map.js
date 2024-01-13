class Map {
    constructor (blockSize) {
        this.blockSize = blockSize

        this.yellowDot = new Image();
        this.yellowDot.src = "../images/yellowDot.png";
    
        this.pinkDot = new Image();
        this.pinkDot.src = "../images/pinkDot.png";
        this.allDot = 0;
    }
    getWallSpace(){
        return this.blockSize/1.4;
    }

    getWallThickness() {
        return (this.blockSize - this.getWallSpace())/2
    }
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    getAllDot() {
        for (let i = 0; i < this.map.length; i++){
            for (let j = 0; j < this.map[0].length; j++){
                if (this.map[i][j] == 2 || this.map[i][j] == 4){
                    this.allDot++;
                }
            }
        }
        return this.allDot
    }

    drawWall() {
        for (let i = 0; i < this.map.length; i++){
            for (let j = 0; j < this.map[0].length; j++){
                if (this.map[i][j] == 1){
                    canvasContext.fillStyle = "#342DCA";
                    canvasContext.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
                }
                if (j > 0 && this.map[i][j - 1] == 1){
                    canvasContext.fillStyle = "black";
                    canvasContext.fillRect(j * this.blockSize, i * this.blockSize + this.getWallThickness(), this.getWallSpace() + this.getWallThickness(), this.getWallSpace());
                }
                if (j < this.map[0].length - 1 && this.map[i][j + 1] == 1){
                    canvasContext.fillStyle = "black";
                    canvasContext.fillRect(j * this.blockSize + this.getWallThickness(), i * this.blockSize + this.getWallThickness(), this.getWallSpace() + this.getWallThickness(), this.getWallSpace());
                }
                if (i > 0 && this.map[i - 1][j] == 1){
                    canvasContext.fillStyle = "black";
                    canvasContext.fillRect(j * this.blockSize + this.getWallThickness(), i * this.blockSize, this.getWallSpace(), this.getWallSpace() + this.getWallThickness());
                }
                if (i < this.map.length - 1 && this.map[i + 1][j] == 1){
                    canvasContext.fillStyle = "black";
                    canvasContext.fillRect(j * this.blockSize + this.getWallThickness(), i * this.blockSize + this.getWallThickness(), this.getWallSpace(), this.getWallSpace() + this.getWallThickness());
                }
                // if (this.map[i][j] == 2){
                //     canvasContext.drawImage(this.yellowDot, j * this.blockSize, i * this.blockSize);
                // }
                if (this.map[i][j] == 2){
                    canvasContext.fillStyle = '#FEB897';
                    canvasContext.fillRect(j * blockSize + 2/5 * this.blockSize, i * blockSize + 2/5 * this.blockSize, blockSize / 5, blockSize / 5);
                }
                if (this.map[i][j] == 4){
                    canvasContext.drawImage(this.pinkDot, j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    }
}