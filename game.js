const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");


const blockSize = 30;
const movingDirection = {
    right : 0,
    up: 3,
    left: 2,
    down: 1,
}

let isEventListenerAdded = false;
let currentDot;
let ghosts;
let score;
let lives;
let tileMap;
let pacman;
let gameInterval;

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
    clearInterval(gameInterval)
    canvasContext.font = "30px Emulogic";
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('GAME OVER!', 175, 225)
    canvasContext.font = "15px Emulogic";
    canvasContext.fillText('Click everywhere to restart!', 115, 325);
}

function processWin() {
    clearInterval(gameInterval)
    canvasContext.font = "30px Emulogic";
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('YOU WIN!', 175, 225)
    canvasContext.font = "15px Emulogic";
    canvasContext.fillText('Click everywhere to restart!', 115, 325);
}
function drawEnd() {
    console.log(currentDot)
    if (!isEventListenerAdded) {
        if (currentDot == tileMap.allDot){
            processWin();
            // document.removeEventListener('click', handleNewGame);
            document.addEventListener('click', handleNewGame);
            isEventListenerAdded = true;
        }
        if (lives == 0){
            processLose();
            // document.removeEventListener('click', handleNewGame);
            document.addEventListener('click', handleNewGame);
            isEventListenerAdded = true;
        }
    }
}

function handleNewGame() {
    document.removeEventListener('click', handleNewGame);
    isEventListenerAdded = false;
    newGame();
}

function newGame() {
    currentDot = 0;
    score = 0;
    lives = 3;
    ghosts = [];
    tileMap = new Map(blockSize);
    pacman = new Pacman(blockSize, blockSize, blockSize, blockSize, blockSize / 6);         // blockSize % speed == 0. if no there will have some bug
    tileMap.getAllDot()
    console.log(tileMap.allDot);
    createGhost();
    gameInterval = setInterval(gameLoop, 1000/30);          //fps = 30
}

function becomeHardMode() {
    if (currentDot >= 120 && ghosts[0] != 6) {
        // for (let i = 0; i < ghosts.length; i++) {
        //     ghosts[i].range = 8;
        // }
        ghosts[0].range = 6;
        ghosts[1].range = 8;
        ghosts[2].range = 10;
        ghosts[3].range = 12;
    }
}

function gameLoop() {
    draw();
    update();
}

function update() {
    becomeHardMode();
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

newGame();