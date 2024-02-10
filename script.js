const body = document.body;
const player = document.getElementById('player');
const obstacleContainer = document.getElementById('obstacles')
const audio = document.getElementById('audio');
const death = document.getElementById('death');
let obstacleInterval;
const pointCount = document.getElementById('points');
let points = 0;
const turorial = document.getElementById('tutorial');

function jump() {
    audio.currentTime = 0;
    audio.play()
    player.style.bottom = 'calc(20vh + 120px)';
    setTimeout(function () {
        player.style.bottom = 'calc(20vh)';
    }, 300);
    turorial.textContent = ''
}

body.addEventListener('click', () => {
    jump();
});
document.addEventListener('keydown', (event)=>{
    if (event.code = 'space'){
        jump()
    }
})


function create_obstacle(){
    const obstacle = document.createElement('img');
    obstacle.classList.add('obstacle');
    obstacle.src = 'crow.gif';
    obstacleContainer.appendChild(obstacle);
}

// Function to check collision between two elements
function isColliding(elem1, elem2) {
    let rect1 = elem1.getBoundingClientRect();
    let rect2 = elem2.getBoundingClientRect();
    return !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
    );
}

function obstacle() {
    let obstacles = document.getElementsByClassName('obstacle');
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].style.right = '100%';

        // Check for collision between player and obstacle
        if (isColliding(player, obstacles[i])) {
            // Remove obstacle
            obstacles[i].remove();
            points = points + 1
            death.currentTime = 0;
            death.play()
        }
    }
    create_obstacle();

    // Generate a new random interval for the next obstacle
    let newInterval = Math.random() * 1000 + 200;

    // Set the interval for the next obstacle with the new interval
    setTimeout(() => {
        obstacleInterval = setInterval(obstacle, newInterval);
    }, newInterval);
    clearInterval(obstacleInterval)
    pointCount.textContent = points
}

obstacle()