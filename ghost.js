class Ghost {
    constructor(x, y, width, height, speed, range, index){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.range = range;
        this.index = index;
        this.direction = movingDirection.up;
        this.nextDirection = movingDirection.up;
        this.time = 0;
        this.changeScareTimerDefault = 10;
        this.changeScareTimer = this.changeScareTimerDefault;
        this.isDeath = 0;
        this.isStart = 1;
        this.loadImage()
    }

    loadImage() {
        this.defaultGhost = new Image();
        this.defaultGhost.src = `./images/ghost${this.index}.png`;
        this.scaredGhost = new Image();
        this.scaredGhost.src = './images/scaredGhost.png'
        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = './images/scaredGhost2.png'
        this.ghostImage = this.defaultGhost;
    }

    setImageWhenScared() {
        if (pacman.makeGhostFlash) {
          this.changeScareTimer--;
          if (this.changeScareTimer === 0) {
            this.ghostImage = this.ghostImage === this.scaredGhost ? this.scaredGhost2 : this.scaredGhost
            this.changeScareTimer = this.changeScareTimerDefault;
          }
        } else {
          this.ghostImage = this.scaredGhost;
        }
      }

    draw() {
        if (pacman.isPower) {
            this.setImageWhenScared();
          } else {
            this.ghostImage = this.defaultGhost;
          }
        canvasContext.drawImage(this.ghostImage, this.x, this.y, this.width, this.height);
    }

    processWhenDeath() {
        this.isDeath = 1;
        setTimeout(() => {
            this.x = 10 * blockSize;
            this.y = 11 * blockSize;
            this.isDeath = 0;
            this.isStart = 1;
        }, 10000);
    }

    moveProcess() {
        if (this.getBlockX() == -1 && this.getBlockY() == 10){
            this.x = 20 * blockSize;
        }
        if (this.getBlockX() == 21 && this.getBlockY() == 10){
            this.x = 0;
        }
        this.checkChangeDirection();
        this.moveForward();
        if (this.checkCollision()) {
            this.stopMoveForward();
        }
    }
    moveForward() {
        switch(this.direction) {
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

    stopMoveForward() {
        switch(this.direction) {
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
            tileMap.map[Math.ceil(this.y / blockSize )][Math.floor(this.x / blockSize)] == 1 ||
            tileMap.map[Math.floor(this.y / blockSize)][Math.ceil(this.x / blockSize) ] == 1 ||
            tileMap.map[Math.ceil(this.y / blockSize )][Math.ceil(this.x / blockSize) ] == 1){
                return true;
        }
        else {
            return false;
        }
    }

    checkChangeDirection() {
        if (this.direction != this.nextDirection){
            let tempDirection = this.direction;
            this.direction = this.nextDirection;
            this.moveForward();
            if (this.checkCollision()){
                this.stopMoveForward();
                this.direction = tempDirection;
            }
            else {
                this.stopMoveForward();
                
            }
        }
    }

    randomChangeDirection() {
        if (this.time >= 4){
            let tempDirection = Math.floor(Math.random()*4)
            if (Math.abs(tempDirection - this.direction) != 2){
                this.nextDirection = tempDirection;
            }
            this.time = 0
        }
        else {
            this.time++;
        }
    }

    changeDirectionWhenBeChased(curDirection) {
        if (curDirection == movingDirection.right || curDirection == movingDirection.left){
            if (Math.floor(Math.random()*2) == 0) {
                this.nextDirection = movingDirection.up;
            }
            else {
                this.nextDirection = movingDirection.down;
            }
        }
        else {
            if (Math.floor(Math.random()*2) == 0) {
                this.nextDirection = movingDirection.right;
            }
            else {
                this.nextDirection = movingDirection.left;
            }
        }
    }

    isSameLine() {
        let flag = -1;      //false
        if (this.getBlockX() == pacman.getBlockX() || this.getBlockX() == pacman.getBlockX2() || this.getBlockX2() == pacman.getBlockX() ||this.getBlockX2() == pacman.getBlockX2()){        //same col
            for (let i = Math.min(this.getBlockY(), pacman.getBlockY()); i <= Math.max(pacman.getBlockY(), this.getBlockY()); i++){
                if (tileMap.map[i][this.getBlockX()] == 1) {
                    return -1;                  //false
                }
                else flag = 1;                  //true
            }
        }
        else if (this.getBlockY() == pacman.getBlockY() || this.getBlockY2() == pacman.getBlockY() || this.getBlockY() == pacman.getBlockY2() || this.getBlockY2() == pacman.getBlockY2()){    //same row
            for (let i = Math.min(this.getBlockX(), pacman.getBlockX()); i <= Math.max(pacman.getBlockX(), this.getBlockX()); i++){
                if (tileMap.map[this.getBlockY()][i] == 1){
                    return -1;                  //false
                }
                else flag = 2;                  //true
            }
        }
        return flag;
    }
    calculateWhenBeChased() {
        if (this.isSameLine() == 2){            //same row
            if (this.getBlockY2() == pacman.getBlockY()){               // check if ghost turn down
                if (this.x > pacman.x){
                    this.direction = movingDirection.right;
                }
                else {
                    this.direction = movingDirection.left
                }
                this.changeDirectionWhenBeChased(this.direction);
            }
        }
        else if (this.isSameLine() == 1){       //same col
            if (this.getBlockX2() == pacman.getBlockX()){               // check if ghost turn right
                if (this.y > pacman.y){
                    this.direction = movingDirection.down;
                }
                else {
                    this.direction = movingDirection.up
                }
                this.changeDirectionWhenBeChased(this.direction);
            }
        }
    }


    update() {
        if (this.isStart == 1) {
            this.direction = movingDirection.up;
            this.nextDirection = movingDirection.up;
            if (this.getBlockX() < 9 || this.getBlockX() > 11 || this.getBlockY() < 10 || this.getBlockY() > 11){               // ra ngoai
                this.isStart = 0;
            }
        }
        else {
            if (pacman.isPower){
                this.calculateWhenBeChased();
            }
            this.randomChangeDirection();
        }
        this.moveProcess();
    }

    getDistance(pacmanX, pacmanY, ghostX, ghostY) {
        return Math.sqrt(Math.pow(pacmanX - ghostX, 2) + Math.pow(pacmanY - ghostY, 2));
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
    getBlockDistance() {
        return Math.sqrt(Math.pow(pacman.getBlockX() - this.getBlockX(), 2) + Math.pow(pacman.getBlockY() - this.getBlockY(), 2));
    }
    
} 