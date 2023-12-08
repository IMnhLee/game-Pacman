class Ghost {
    constructor(x, y, width, height, speed, range, index){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.range = range;
        this.index = index;
        this.direction = 0;
        this.nextDirection = 0;
        this.time = 0;
        this.scaredAboutToExpireTimerDefault = 10;
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
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

    setImageWhenPowerDotIsActive() {
        if (pacman.makeGhostFlash) {
          this.scaredAboutToExpireTimer--;
          if (this.scaredAboutToExpireTimer === 0) {
            this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
            if (this.ghostImage === this.scaredGhost) {
              this.ghostImage = this.scaredGhost2;
            } else {
              this.ghostImage = this.scaredGhost;
            }
          }
        } else {
          this.ghostImage = this.scaredGhost;
        }
      }

    draw() {
        if (pacman.isPower) {
            this.setImageWhenPowerDotIsActive();
          } else {
            this.ghostImage = this.defaultGhost;
          }
        canvasContext.drawImage(this.ghostImage, this.x, this.y, this.width, this.height);
    }

    moveProcess() {
        if (this.getX() == -1 && this.getY() == 10){
            this.x = 20 * blockSize;
        }
        if (this.getX() == 21 && this.getY() == 10){
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
            tileMap.map[Math.floor(this.y / blockSize + 0.999)][Math.floor(this.x / blockSize)] == 1 ||
            tileMap.map[Math.floor(this.y / blockSize)][Math.floor(this.x / blockSize + 0.999)] == 1 ||
            tileMap.map[Math.floor(this.y / blockSize + 0.999)][Math.floor(this.x / blockSize + 0.999)]  == 1){
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

    update() {
        if (this.getDistance() > this.range){
            this.randomChangeDirection();
        }
        this.moveProcess();
    }

    getDistance() {
        return Math.sqrt(Math.pow(pacman.getX() - this.getX(), 2) + Math.pow(pacman.getY() - this.getY(), 2));
    }

    getX() {
        return Math.floor(this.x / blockSize);
    }

    getY() {
        return Math.floor(this.y / blockSize);
    }
} 