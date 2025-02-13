document.addEventListener("DOMContentLoaded", function () {
    const gameArena = document.getElementById("game-arena");
    const areaSizeW = 600;
    const areaSizeH = 500;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food =  {x:300 ,y:200};//{x:15x20, y:10x20}
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}]; // {head,body,tail}


    //Inital Movement Direction 
    let dx = cellSize;
    let dy = 0;
    let intervalID ;
    let gameSpeed = 200;
    let isPaused = false;

    //Sound effects
    const eatSound = new Audio("music/food.mp3"); // Play when food is eaten
    const moveSound = new Audio("music/move.mp3"); // Play when arrow key is pressed
    const gameOverSound = new Audio("music/gameover.mp3"); // Play when game ends

    function moveFood () {
        let newX, newY ;

        do {
            newX = Math.floor(Math.random() *30) * cellSize;
            newY = Math.floor(Math.random () * 25) * cellSize;

        } while (snake.some(snakeCell => snakeCell.x === newX &&  snakeCell.y === newY));

        food  = {x:newX, y:newY};
    }

    function updateSnake () {
        const newHead = {x: snake[0].x + dx ,y: snake[0].y + dy};
        snake.unshift(newHead); //Adding New Head to Snake

        //check food Collision
        if(newHead.x == food.x && newHead.y == food.y){
            score += 10;
            eatSound.play();
            moveFood (); 

            if(gameSpeed > 50) {
                clearInterval(intervalID);
                gameSpeed -= 10;
                gameLoop();
            }
        } else {
            snake.pop();
        }
    }

    function changeDirection(e) {
        console.log("key pressed", e);
        moveSound.play(); // 🔊 Play keypress sound

        const isGoingDown = dy === cellSize;
        const isGoingUp = dy === -cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;

        if(e.key === 'ArrowUp' && !isGoingDown) {
            dx = 0;
            dy = -cellSize;
        } else if(e.key === 'ArrowDown' && !isGoingUp) {
            dx = 0;
            dy = cellSize;
        } else if(e.key === 'ArrowLeft' && !isGoingRight) {
            dx = -cellSize;
            dy = 0;
        } else if(e.key === 'ArrowRight' && !isGoingLeft) {
            dx = cellSize;
            dy = 0;
        }
    }

    function drawDiv ( x, y, className){
        const divElement = document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top = `${y}px`;
        divElement.style.left = `${x}px`;
        return divElement;
    }

    function drawSnakeAndFood () {
        gameArena.innerHTML = '';//clear arena
        //wipeing ou everything and redraw with new corrdinaties

        //Food
        const foodElement = drawDiv (food.x, food.y, 'food');
        gameArena.appendChild(foodElement);

        //Snake 
        snake.forEach( (snakeCell) => {
            const snakeElement = drawDiv (snakeCell.x, snakeCell.y ,'snake');
            gameArena.appendChild(snakeElement);

        }) 

        

    }

    function isGameOver () {

         //Snake Collision
         for(let i = 1;i<snake.length; i++){
             if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                return true;
             }
         }
        //wall Collision
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > areaSizeW - cellSize;
        const hitTopWall = snake [0].y < 0;
        const hitBottomWall = snake[0].y > areaSizeH - cellSize;

        return hitLeftWall || hitBottomWall || hitTopWall || hitRightWall;
    }

   function gameLoop () {
    intervalID = setInterval (() => {
        updateSnake();
        drawSnakeAndFood();
        drawScoreBoard();
        if(isGameOver()){
            clearInterval(intervalID);
            gameStarted = false;
            gameOverSound.play(); // 🔊 Play game over sound       
            alert("Game Over \n " + `Your Score : ${score}`); 
            location.reload(); // Refresh the page after alert is closed       
            return;
        }
    },gameSpeed);
    }

    function runGame () {
            document.addEventListener("keydown",changeDirection);
            gameLoop ();
        
    }


    function drawScoreBoard () {
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent =`Score : ${score}`;
    }

    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id='score-board' ;

        document.body.insertBefore(scoreBoard,gameArena);
        scoreBoard.textContent =`Score : ${score}`;


        const startButton = document.createElement('button');
        startButton.textContent = "Start Game";
        startButton.classList.add("start-button");

        startButton.addEventListener("click" ,function StartGame () {
            if(!gameStarted){
                gameStarted = true;
                runGame();
                startButton.textContent = "Pause Game";
            } else {
                if(isPaused) {
                    runGame();
                    startButton.textContent = "Pause Game";
                } else {
                    clearInterval(intervalID);
                    startButton.textContent = "Resume Game";
                }
                isPaused = !isPaused;

            }
        })  

        document.body.appendChild(startButton);

    }

    initiateGame ();

    });