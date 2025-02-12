document.addEventListener("DOMContentLoaded", function () {
    const gameArena = document.getElementById("game-arena");
    const areaSize = 600;
    const cellSize = 20;
    let gameScore = 0;
    let gameStarted = false;
    let food =  {x:300 ,y:200};//{x:15x20, y:10x20}
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}]; // {head,body,tail}


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

    function runGame () {
        if(!gameStarted){
            gameStarted = true;
            drawSnakeAndFood();

            //gameLoop ();
        }
    }

    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id='score-board' ;

        document.body.insertBefore(scoreBoard,gameArena);

        const startButton = document.createElement('button');
        startButton.textContent = "Start Game";
        startButton.classList.add("start-button");

        startButton.addEventListener("click" ,function StartGame () {
            startButton.style.display = 'none';

            runGame();
        })  

        document.body.appendChild(startButton);

    }

    initiateGame ();

    });