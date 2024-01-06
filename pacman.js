class Pacman {
    constructor (x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = 0;
        this.nextDirection = 0;
        this.animationDefault = 4;
        this.currentAnimation = 4;
        this.currentDot = 0
        this.isPower = 1;
        this.makeGhostFlash = 0;
        this.isPowerTimer = null;
        this.ghostFlashTimer = null;
        this.loadPacmanImages();
        document.addEventListener("keydown", this.keyBoard.bind(this))
    }

    loadPacmanImages() {
        const pacmanImage1 = new Image();
        pacmanImage1.src = "./images/pac0.png";
        const pacmanImage2 = new Image();
        pacmanImage2.src = "./images/pac1.png";
        const pacmanImage3 = new Image();
        pacmanImage3.src = "./images/pac2.png";
        const pacmanImage4 = new Image();
        pacmanImage4.src = "./images/pac1.png";

        this.pacmanImages = [
            pacmanImage1,
            pacmanImage2,
            pacmanImage3,
            pacmanImage4,
        ];

        this.pacmanImageIndex = 0;
    }

    keyBoard(event) {
        let k = event.keyCode;
        setTimeout(() => {
            if (k == 37 || k == 65){
                this.nextDirection = movingDirection.left;
            }
            else if (k == 38 || k == 87){
                this.nextDirection = movingDirection.up;
            }
            else if (k == 39 || k == 68){
                this.nextDirection = movingDirection.right; 
            }
            else if (k == 40 || k == 83){
                this.nextDirection = movingDirection.down;
            }
        }, 1);
    }

    draw() {
        this.animate()
        canvasContext.save();                   // luu ngu canh cu~
        canvasContext.translate(                // dich den tam vi tri nhan vat pacman
            this.x + blockSize / 2,
            this.y + blockSize / 2
        );
        canvasContext.rotate((this.direction * 90 * Math.PI) / 180);        //xoay theo huong
        canvasContext.drawImage(
            this.pacmanImages[this.pacmanImageIndex],
            -blockSize/2,
            -blockSize/2,
            this.width,
            this.height,
        );
        canvasContext.restore();                // khoi phuc ngu canh da luu truoc do
    }

    moveCharacter() {
        if (this.getBlockX() == -1 && this.getBlockY() == 10){
            this.x = 20 * blockSize;
        }
        if (this.getBlockX() == 21 && this.getBlockY() == 10){
            this.x = 0 * blockSize;
        }
        this.checkChangeDirection();
        this.moveForward(this.direction);
        if (this.checkCollision()) {
            this.stopMoveForward(this.direction);
        }
    }
    moveForward(direction) {
        switch(direction) {
            case movingDirection.right:
                this.x += this.speed;
                break;
            case movingDirection.left:
                this.x -= this.speed;
                break;
            case movingDirection.up:
                this.y -= this.speed;
                break;
            case movingDirection.down:
                this.y += this.speed;
                break;
        }
    }

    stopMoveForward(direction) {
        switch(direction) {
            case movingDirection.right:
                this.x -= this.speed;
                break;
            case movingDirection.left:
                this.x += this.speed;
                break;
            case movingDirection.up:
                this.y += this.speed;
                break;
            case movingDirection.down:
                this.y -= this.speed;
                break;
        }            
    }

    checkCollision() {
        if (tileMap.map[Math.floor(this.y / blockSize)][Math.floor(this.x / blockSize)] == 1 ||
            tileMap.map[Math.ceil(this.y / blockSize)][Math.floor(this.x / blockSize)] == 1 ||
            tileMap.map[Math.floor(this.y / blockSize)][Math.ceil(this.x / blockSize)] == 1 ||
            tileMap.map[Math.ceil(this.y / blockSize)][Math.ceil(this.x / blockSize)]  == 1){
                return true;
        }
        else {
            return false;
        }
    }

    checkGhostCollision() {
        let flag = -1;
        for (let i = 1; i <= ghosts.length; i++){
            if (!ghosts[i - 1].isDeath){
                if (ghosts[i - 1].getBlockX() == this.getBlockX() && ghosts[i - 1].getBlockY() == this.getBlockY()){
                    flag = i - 1;
                }
            }
        }
        return flag;
    }

    checkChangeDirection() {
        if (this.direction != this.nextDirection){
            this.moveForward(this.nextDirection);
            if (this.checkCollision()){
                this.stopMoveForward(this.nextDirection);
            }
            else {
                this.direction = this.nextDirection;
                this.stopMoveForward(this.nextDirection);
                
            }
        }
    }

    animate() {
        // if (this.currentAnimation == null) {
        //     return;
        // }
        this.currentAnimation--;
        if (this.currentAnimation == 0){
            this.currentAnimation = this.animationDefault;
            this.pacmanImageIndex++;
            if (this.pacmanImageIndex == this.pacmanImages.length){
                this.pacmanImageIndex = 0;
            }
        }
    }

    getBlockX() {
        return Math.floor(this.x / blockSize);
    }

    getBlockY() {
        return Math.floor(this.y / blockSize);
    }
    getBlockX2() {
        return Math.floor((this.x + blockSize - 1) / blockSize);
    }
    getBlockY2() {
        return Math.floor((this.y + blockSize - 1) / blockSize);
    }
    // eatDot() {
    //     let row = this.y / blockSize;
    //     let column = this.x / blockSize;
    //     if (Number.isInteger(row) && Number.isInteger(column)){
    //         if (tileMap.map[row][column] == 2){
    //             tileMap.map[row][column] = 3;
    //             score += 10;
    //         }
    //     }
    // }

    eatDot() {
        let row = Math.floor(this.y / blockSize + 0.5);
        let column = Math.floor(this.x / blockSize + 0.5);
        if (tileMap.map[row][column] == 2){
            tileMap.map[row][column] = 3;
            this.currentDot++;
            score += 10;
        }
    }

    eatPowerDot() {
        let row = Math.floor(this.y / blockSize + 0.5);
        let column = Math.floor(this.x / blockSize + 0.5);
        if (tileMap.map[row][column] == 4){
            tileMap.map[row][column] = 3;
            this.isPower = 1;
            this.makeGhostFlash = 0;
            clearTimeout(this.isPowerTimer);
            clearTimeout(this.ghostFlashTimer);
            this.isPowerTimer = setTimeout(() => {
                this.isPower = 0;
                this.makeGhostFlash = 0;
            }, 10000);
            this.ghostFlashTimer = setTimeout(() => {
                this.makeGhostFlash = 1;
            }, 3000);
            this.currentDot++;
            score += 100;
        }
    }

    eatCharacter() {                // eat Pacman or is eaten by pacman
        let flag = this.checkGhostCollision()
        if (flag != -1){
            if (this.isPower == 0){
                if (lives == 1){
                    lives--;
                }
                else {
                    lives--;
                    restartGame();
                }
            }
            else {
                ghosts[flag].processWhenDeath();
            }
        }
    }
    
}