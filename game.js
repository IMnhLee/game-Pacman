const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");


const blockSize = 30;
const movingDirection = {
    right : 0,
    up: 3,
    left: 2,
    down: 1,
}

let currentDot = 0;
let ghosts = [];
let score = 0;
let lives = 3;
let tileMap = new Map(blockSize);
let pacman = new Pacman(blockSize, blockSize, blockSize, blockSize, blockSize / 6);     //blockSize % speed = 0 if you don't want to see some bug

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
        let newGhost = new Ghost(10 * blockSize,11 * blockSize, blockSize, blockSize, 3, 5, i);
        ghosts.push(newGhost);
    }
}


function drawGhosts() {
    for (let i = 0; i < ghosts.length; i++) {
        if (ghosts[i].isDeath == 0){
            ghosts[i].draw();
        }
    }
};

function updateGhosts() {
    for (let i = 0; i < ghosts.length; i++){
        if (ghosts[i].isDeath == 0){
            ghosts[i].update();
        }
    }
}


function processLose() {
    canvasContext.font = "30px Emulogic";
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('GAME OVER!', 175, 225)
    clearInterval(gameInterval)
}

function processWin() {
    canvasContext.font = "30px Emulogic";
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('YOU WIN!', 175, 225)
    clearInterval(gameInterval)
}
function drawEnd() {
    if (currentDot == tileMap.allDot){
        processWin();
    }
    if (lives == 0){
        processLose();
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
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    tileMap.drawWall();
    drawScore();
    pacman.draw();
    drawGhosts();
    drawLive();
    drawEnd();
}

tileMap.getAllDot()
createGhost();
let gameInterval = setInterval(gameLoop, 1000/30);      //fps = 30
