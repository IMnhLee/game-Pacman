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
        if (this.getBlockX1() == -1 && this.getBlockY1() == 10){
            this.x = 20 * blockSize;
        }
        if (this.getBlockX1() == 21 && this.getBlockY1() == 10){
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
        if (this.getBlockX1() == pacman.getBlockX1() ||
            this.getBlockX1() == pacman.getBlockX2() ||
            this.getBlockX2() == pacman.getBlockX1() ||
            this.getBlockX2() == pacman.getBlockX2()){        //same col
            for (let i = Math.min(this.getBlockY1(), pacman.getBlockY1()); i <= Math.max(pacman.getBlockY1(), this.getBlockY1()); i++){
                if (tileMap.map[i][this.getBlockX1()] == 1) {
                    return -1;                  //false
                }
                else flag = 1;                  //true
            }
        }
        if (this.getBlockY1() == pacman.getBlockY1() ||
            this.getBlockY2() == pacman.getBlockY1() ||
            this.getBlockY1() == pacman.getBlockY2() ||
            this.getBlockY2() == pacman.getBlockY2()){        //same row
            for (let i = Math.min(this.getBlockX1(), pacman.getBlockX1()); i <= Math.max(pacman.getBlockX1(), this.getBlockX1()); i++){
                if (tileMap.map[this.getBlockY1()][i] == 1){
                    return -1;                  //false
                }
                else flag = 2;                  //true
            }
        }
        return flag;
    }
    calculateWhenBeChased() {
        let isSame = this.isSameLine()
        if (isSame == 2){            //same row
            if (this.getBlockY2() == pacman.getBlockY1()){               // check if ghost turn down
                if (this.x > pacman.x){
                    this.direction = movingDirection.right;
                    // this.nextDirection = movingDirection.right;
                }
                else {
                    this.direction = movingDirection.left
                    // this.nextDirection = movingDirection.left;
                }
                this.changeDirectionWhenBeChased(this.direction);
            }
        }
        else if (isSame == 1){       //same col
            if (this.getBlockX2() == pacman.getBlockX1()){               // check if ghost turn right
                if (this.y > pacman.y){
                    this.direction = movingDirection.down;
                    // this.nextDirection = movingDirection.down;
                }
                else {
                    this.direction = movingDirection.up
                    // this.nextDirection = movingDirection.up;
                }
                this.changeDirectionWhenBeChased(this.direction);
            }
        }
        else {
            this.randomChangeDirection();
        }
    }

    calculateHeuristic (node, pacmanX, pacmanY) {
        return this.getDistance(pacmanX, pacmanY, node.x, node.y);
        // const distance =  Math.abs(pacmanX - node.x) + Math.abs(pacmanY - node.y);
        // return distance
    }

    getNeighbors (node, map) {
        let neighborList = [];
        if (node.x + 1 < map[0].length && node.x + 1 >= 0 && map[node.y][node.x + 1] != 1) {
            let newMoves = node.moves.slice();
            newMoves.push(movingDirection.right);
            const newNode = new Node(node.x + 1, node.y, 0, 0);
            newNode.moves = newMoves.slice();
            neighborList.push(newNode);
        }
        if (node.x >= 1 && node.x - 1 < map[0].length && map[node.y][node.x - 1] != 1) {
            let newMoves = node.moves.slice();
            newMoves.push(movingDirection.left);
            const newNode = new Node(node.x - 1, node.y, 0, 0);
            newNode.moves = newMoves.slice();
            neighborList.push(newNode);
        }
        if (node.y >= 1 && node.y - 1 < map.length && map[node.y - 1][node.x] != 1) {
            // console.log('up')
            let newMoves = node.moves.slice();
            newMoves.push(movingDirection.up);
            const newNode = new Node(node.x, node.y - 1, 0, 0);
            newNode.moves = newMoves.slice();
            neighborList.push(newNode);
        }
        if (node.y + 1 < map.length && node.y + 1 >= 0 && map[node.y + 1][node.x] != 1) {
            let newMoves = node.moves.slice();
            newMoves.push(movingDirection.down);
            const newNode = new Node(node.x, node.y + 1, 0, 0);
            newNode.moves = newMoves.slice();
            neighborList.push(newNode);
        }
        return neighborList;
    }

    aStar(map, ghostX, ghostY, pacmanX, pacmanY) {
        let tempMap = [];
        for (let i = 0; i < map.length; i++){
            tempMap[i] = map[i].slice();
        }
        const openSet = [];
        const closedSet = [];
        const startNode = new Node(ghostX, ghostY);
        startNode.h = this.calculateHeuristic(startNode, pacman.getBlockX1(), pacman.getBlockY1());
        startNode.g = 0;
        openSet.push(startNode);
        while(openSet.length > 0) {
            openSet.sort((a, b) => a.aGrade - b.aGrade);
            const curNode = openSet.shift();
            if (curNode.x == pacmanX && curNode.y == pacmanY) {
                // console.log(curNode.moves);
                return curNode.moves[0];
            }
            closedSet.push(curNode);
            const neighborList = this.getNeighbors(curNode, tempMap);
            for (let neighbor of neighborList) {
                if (!closedSet.find((node) => {
                    return node.x == neighbor.x && node.y == neighbor.y
                })) {
                    const gScore = curNode.g + 1;
                    const hScore = this.calculateHeuristic(neighbor, pacman.getBlockX1(), pacman.getBlockY1());
                    const aGrade = gScore + hScore;
                    const existNode = openSet.find((node) => { return node.x == neighbor.x && node.y == neighbor.y});
                    if (existNode) {
                        if (aGrade < neighbor.aGrade) {
                            existNode.g = gScore;
                            existNode.h = hScore;
                            existNode.moves = neighbor.moves.slice();
                        }
                    }
                    else {
                        neighbor.g = gScore;
                        neighbor.h = hScore;
                        openSet.push(neighbor);
                    }
                }
            }
        }
    }

    update() {
        if (this.isStart == 1) {
            this.direction = movingDirection.up;
            this.nextDirection = movingDirection.up;
            if (this.getBlockX1() < 9 || this.getBlockX1() > 11 || this.getBlockY1() < 10 || this.getBlockY1() > 11){               // ra ngoai
                this.isStart = 0;
            }
        }
        else {
            if (pacman.isPower){
                this.calculateWhenBeChased();
            }
            else {
                if (this.getBlockDistance() <= this.range){
                    let temp = this.aStar(tileMap.map, this.getBlockX1(), this.getBlockY1(), pacman.getBlockX1(), pacman.getBlockY1());
                    if (typeof temp != "undefined") {
                        this.nextDirection = temp;
                        // console.log('direction',this.direction)
                        // console.log('next direction',this.nextDirection)
                    }
                }
                else this.randomChangeDirection();
            }
        }
        this.moveProcess();
    }

    getDistance(pacmanX, pacmanY, ghostX, ghostY) {
        return Math.sqrt(Math.pow(pacmanX - ghostX, 2) + Math.pow(pacmanY - ghostY, 2));
    }

    getBlockX1() {
        return Math.floor(this.x / blockSize);
    }

    getBlockY1() {
        return Math.floor(this.y / blockSize);
    }

    getBlockX2() {
        return Math.floor((this.x + blockSize - 1) / blockSize);
    }
    getBlockY2() {
        return Math.floor((this.y + blockSize - 1) / blockSize);
    }
    getBlockDistance() {
        return Math.sqrt(Math.pow(pacman.getBlockX1() - this.getBlockX1(), 2) + Math.pow(pacman.getBlockY1() - this.getBlockY1(), 2));
    }
    
} 