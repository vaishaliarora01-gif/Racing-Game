var gameState = 0, playerCount = 0;
var database, form,game,player;
var allPlayers;
var distanceX = 0;
var distanceY = 0;
var players, player1, player2, player3, player4;
var obstaclesGroup;
// creating new branch

function preload()
{
    player1Image = loadImage("images/Player1.png");
    player2Image = loadImage("images/Player2.png");
    player3Image = loadImage("images/Player3.png");
    player4Image = loadImage("images/Player4.png");
    trackImage = loadImage("images/Background.jpg");
    spaceRace = loadImage("images/Spceracer.jpg");
    obsImage = loadImage("images/obs.gif");
}

function setup(){
    createCanvas(displayWidth-30,displayHeight-130);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    
    if (gameState === 0)
    {
        image(spaceRace,0,-70,displayWidth,displayHeight);
    }

    if(playerCount === 4)
    {
        game.update(1);
    }

    if(gameState === 1)
    {
        clear();
        game.play();
    }

    if(gameState === 2)
    {
        game.end();
    }

  
}


