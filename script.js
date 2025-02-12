document.addEventListener("DOMContentLoaded", function () {
    const gameArena = document.getElementById("game-arena");
    const areaSize = 600;
    const cellSize = 20;
    let gameScore = 0;
    let gameStarted = false;
    let food =  {x:300 ,y:200};//{x:15x20, y:10x20}
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}];

    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id='score-board' ;

        document.body.insertBefore(scoreBoard,gameArena);

        const startButton = document.createElement('button');
        startButton.textContent = "Start Game";
        startButton.classList.add("start-button");

        document.body.appendChild(startButton);

    }

    initiateGame ();

    });