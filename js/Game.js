class Game {
    constructor()
    {

    }

    getState()
    {
        var gameStateRef = database.ref("gameState") 
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    update(state)
    {
        database.ref("/").update({
            gameState: state
        })
    }

    
     async start()
    {

        if(gameState === 0)
        {
            player = new Player();
            var playerCountRef = await database.ref("playerCount").once("value");
            if(playerCountRef.exists())
            {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            
           
            
            form = new Form();
            form.display();
            
        }

        player1 = createSprite(150,60);
        player1.addImage("car1", player1Image);
        player1.scale = 0.1;
        player2 = createSprite(150,170);
        player2.addImage("car2",player2Image);
        player2.scale = 0.1;
        player3 = createSprite(150,280);
        player3.addImage("car3", player3Image);
        player3.scale = 0.1;
        player4 = createSprite(150,390);
        player4.addImage("car4", player4Image);
        player4.scale = 0.1;
        players = [player1,player2,player3,player4];
        
    }

    play()
    {
        form.hide();
        Player.getPlayerInfo();
        player.getCarsAtEnd();

        if(allPlayers !== undefined)
        {
            background("#a5a390");
            image(trackImage,0,-60,displayWidth*8,displayHeight);
            var index = 0;
            var x= 150;
            var y = 60;
            
            for(var plr in allPlayers)
            {
                
                index = index + 1;
                y = allPlayers[plr].distanceY + 60 + 110*(index);
                //console.log("distanceX "+ allPlayers[plr].distanceX);
                x = allPlayers[plr].distanceX + 150;
                //console.log(players[0].x, players[0].y);
                //console.log("Hi"+ players[index-1].x);
                players[index-1].x = x;
                players[index-1].y = y;
                textSize(16);
                strokeWeight(4);
                stroke("Black");
                text(allPlayers[plr].name, x-20,y+50)
               
                if(World.frameCount % 180 === 0) 
                {
                    var obstacle = createSprite(camera.position.x + displayWidth/2,y,10,40);
                    obstacle.velocityX = -3;
                    
                    //generate random obstacles
                    obstacle.addImage("obstacle" , obsImage);
                    
                    //assign scale and lifetime to the obstacle           
                    obstacle.scale = 0.5; 
                    obstaclesGroup.add(obstacle);
                }

               if(obstaclesGroup.isTouching(players[index-1]))
                {
                     players[index-1].x = 150;
                }

                if(index === player.index)
                {
                    players[index-1].shapecolor = "red";
                    camera.position.y = displayHeight/2;
                    camera.position.x = players[index-1].x + 475;
                    stroke("Red");
                    ellipse(x,y,60,60);
                }
                
            }
        }
            if(keyDown (RIGHT_ARROW) && player.index !== null)
            {
                player.distanceX = player.distanceX + 50;
                player.update();
            }
            if(keyDown (LEFT_ARROW) && player.index !== null)
            {
                player.distanceX = player.distanceX - 50;
                player.update();
            }
            
            if(keyDown (UP_ARROW) && player.index !== null)
            {
                player.distanceY = player.distanceY - 5;
                player.update();
            }

            if(keyDown (DOWN_ARROW) && player.index !== null)
            {
                player.distanceY = player.distanceY + 5;
                player.update();
            }

            if(player.distanceX > 20000)
              {
                 gameState = 2;
                 player.rank = player.rank+1;
                 Player.updateCarsAtEnd(player.rank);
              }
            drawSprites();
    }
      end()
      {
         //alert("Game Ended");
          console.log("Player Rank" + player.rank);
          //alert("Player Rank" + player.rank);
      }
    
}
