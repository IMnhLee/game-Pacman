const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");


const blockSize = 30;
const movingDirection = {
    right : 0,
    up: 3,
    left: 2,
    down: 1,
}

let ghosts = [];
let score = 0;
let lives = 3;
let tileMap = new Map(blockSize);
let pacman = new Pacman(blockSize, blockSize, blockSize, blockSize, blockSize / 6);     //blockSize % speed = 0 if you don't want to see some bug


function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function drawScore() {
    canvasContext.font = '20px Emulogic'
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Score: ' + score, 0, blockSize*(tileMap.map.length + 0.7))
}

function drawLive() {
    canvasContext.font = 'Emulogic'
    for (let i = 0 ; i < lives; i++){
        canvasContext.drawImage(pacman.pacmanImages[1], blockSize * (tileMap.map[0].length - 3 + i), blockSize*tileMap.map.length, blockSize, blockSize)
    }
}

function restartGame() {
    createGhost();
    pacman = new Pacman(blockSize, blockSize, blockSize, blockSize, blockSize / 6);
}

function createGhost() {
    ghosts = [];
    for (let i = 1; i <= 4; i++){
        let newGhost = new Ghost(9 * blockSize,10 * blockSize, blockSize, blockSize, 3, 0, i);
        ghosts.push(newGhost);
    }
}

function drawGhosts() {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
};

function updateGhosts() {
    for (let i = 0; i < ghosts.length; i++){
        ghosts[i].update();
    }
}


function drawGameOver() {
    canvasContext.font = "30px Emulogic";
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('GAME OVER!', 175, 225)
    clearInterval(gameInterval)
}

function drawWinGame() {
    canvasContext.font = "30px Emulogic";
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('YOU WIN!', 175, 225)
    clearInterval(gameInterval)
}

function drawEndGame() {
    if (pacman.currentDot == tileMap.allDot){
        drawWinGame();
    }
    if (lives == 0){
        drawGameOver();
    }
}

function gameLoop() {
    draw();
    update();
}

function update() {
    pacman.eatCharacter();
    pacman.moveCharacter();
    pacman.eatDot();
    pacman.eatPowerDot();
    updateGhosts();
}

function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black")
    tileMap.drawWall();
    drawScore();
    pacman.draw();
    drawGhosts();
    drawLive();
    drawEndGame();
}

tileMap.getAllDot()
createGhost();
let gameInterval = setInterval(gameLoop, 1000/30);      //fps = 30
