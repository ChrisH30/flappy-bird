document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('keydown', function (e) {
        if (e.keyCode === 32 && e.target == document.body) {
            e.preventDefault();
        }
    })

    let speed = 2;
    let top = 200;
    let startGravity;
    let isGameStarted = false;
    let isGameOver;

    const sky = document.querySelector('.sky');
    const leftBorder = document.querySelector('.left-border');
    const btn = document.createElement('button');
    btn.innerHTML = 'START';
    btn.classList.add('btn');
    leftBorder.appendChild(btn);
    const bird = document.createElement('div');
    bird.classList.add('bird');
    bird.style.top = top + 'px';
    sky.appendChild(bird);

    btn.addEventListener('click', startGame);

    function startGame() {
        if (!isGameStarted) {
            isGameStarted = true;
            isGameOver = false;
            startGravity = setInterval(gravity, 15);
            document.addEventListener('keydown', control);
            cloneTubes();
            top = 200;
        }
    };

    function gravity() {
        top += speed;
        bird.style.top = top + 'px';
    };

    function control(e) {
        if (e.keyCode === 71 && !isGameOver) jump()
    };
    function jump() {
        if (top > 30) {
            top -= 40;
            bird.style.top = top + 'px';
        }
    };
    function cloneTubes() {
        if (!isGameOver) {
            let goLeft = 1000;
            let gap = Math.random() * (150 - 100) + 100;
            let bottomTubeHeigth = Math.floor(Math.random() * (350 - 150) + 150);
            let topTubeHeigth = Math.floor(550 - bottomTubeHeigth - gap);

            let bottomTubes = document.createElement('div');
            let topTubes = document.createElement('div');
            bottomTubes.classList.add('bottomTube');
            topTubes.classList.add('topTube');
            bottomTubes.style.height = bottomTubeHeigth + 'px';
            bottomTubes.style.left = goLeft + 'px';
            topTubes.style.height = topTubeHeigth + 'px';
            topTubes.style.left = goLeft + 'px';
            sky.appendChild(bottomTubes);
            sky.appendChild(topTubes);

            setTimeout(cloneTubes, 3000);
            let moveTubes = setInterval(moveLeft, 20)

            function moveLeft() {

                goLeft -= speed;
                bottomTubes.style.left = goLeft + 'px';
                topTubes.style.left = goLeft + 'px';

                if (goLeft < -100) {
                    clearInterval(moveTubes);
                    sky.removeChild(bottomTubes);
                    sky.removeChild(topTubes);
                }

                if (top > 500 ||
                    goLeft < 350 && goLeft > 250 && top >= (topTubeHeigth + gap - 50) ||
                    goLeft < 350 && goLeft > 250 && top <= topTubeHeigth) {
                    gameOver()
                }

            }
        }
    }

    function gameOver() {
        document.removeEventListener('keydown', control);
        clearInterval(startGravity);
        isGameOver = true;
        isGameStarted = false;
        console.log('Game Over');
    };

})