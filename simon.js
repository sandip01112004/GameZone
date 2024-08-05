let simonSequence = [];
let playerSequence = [];
let level = 0;

const colors = ['green', 'red', 'yellow', 'blue'];

function startSimon() {
    level = 0;
    simonSequence = [];
    playerSequence = [];
    nextLevel();
}

function nextLevel() {
    playerSequence = [];
    level++;
    simonSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    playSequence();
}

function playSequence() {
    let delay = 0;
    simonSequence.forEach((color, index) => {
        setTimeout(() => {
            flashColor(color);
        }, delay);
        delay += 1000;
    });
}

function flashColor(color) {
    const colorElement = document.getElementById(color);
    colorElement.style.opacity = '0.5';
    setTimeout(() => {
        colorElement.style.opacity = '1';
    }, 500);
}

function playerClick(color) {
    playerSequence.push(color);
    flashColor(color);

    if (playerSequence[playerSequence.length - 1] !== simonSequence[playerSequence.length - 1]) {
        alert('Game Over! You reached level ' + level);
        startSimon();
        return;
    }

    if (playerSequence.length === simonSequence.length) {
        setTimeout(nextLevel, 1000);
    }
}
