const start = document.getElementById("start");
const startBtn = document.getElementById("startBtn");

const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const joy = document.getElementById("joy");
const stick = document.getElementById("stick");

let playerX = 80;
let playerY = 300;

let enemyX = 300;
let enemyY = 120;

let moveX = 0;
let moveY = 0;

let hunterStarted = false;
let gameRunning = false;

startBtn.onclick = () => {

    start.style.display = "none";

    gameRunning = true;

    setTimeout(() => {

        hunterStarted = true;

    }, 10000);

    requestAnimationFrame(gameLoop);

};

joy.addEventListener("touchstart", joystickMove);
joy.addEventListener("touchmove", joystickMove);

joy.addEventListener("touchend", () => {

    moveX = 0;
    moveY = 0;

    stick.style.left = "40px";
    stick.style.top = "40px";

});

function joystickMove(e){

    e.preventDefault();

    const touch = e.touches[0];

    const rect = joy.getBoundingClientRect();

    let dx = touch.clientX - (rect.left + 60);
    let dy = touch.clientY - (rect.top + 60);

    const distance = Math.sqrt(dx * dx + dy * dy);

    if(distance > 40){

        dx = dx / distance * 40;
        dy = dy / distance * 40;

    }

    stick.style.left = (40 + dx) + "px";
    stick.style.top = (40 + dy) + "px";

    moveX = dx / 8;
    moveY = dy / 8;

}

function updatePlayer(){

    playerX += moveX;
    playerY += moveY;

    playerX = Math.max(0, Math.min(window.innerWidth - 50, playerX));
    playerY = Math.max(0, Math.min(window.innerHeight - 70, playerY));

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

}

function updateEnemy(){

    if(!hunterStarted) return;

    let dx = playerX - enemyX;
    let dy = playerY - enemyY;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if(distance > 1){

        enemyX += dx / distance * 2;
        enemyY += dy / distance * 2;

    }

    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";

    if(distance < 30){

        gameRunning = false;

        alert("أمسك بك الباحث!");

    }

}

function gameLoop(){

    if(!gameRunning) return;

    updatePlayer();

    updateEnemy();

    requestAnimationFrame(gameLoop);

}