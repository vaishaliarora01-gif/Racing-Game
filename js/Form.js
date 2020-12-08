class Form{
    constructor()
    {
         this.input = createInput("Name");
         this.button = createButton("Play");
         this.greeting = createElement("h3");
         this.reset = createButton("Reset");
    }

    hide()
    {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
    }

    display()
    {
        var title = createElement("h1");
        title.html("Space Race");
        title.position(displayWidth/2-70 ,0);

        this.input.position(displayWidth/2 - 550,displayHeight/2-300);
        this.button.position(displayWidth/2 -500,displayHeight/2-250);
        this.reset.position(displayWidth-100,20);
        

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();

            playerCount = playerCount + 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);

            this.greeting.html("Hello! " + player.name)
            this.greeting.position(displayWidth/2 - 70,displayHeight/4);
        })

        this.reset.mousePressed(()=>{
           player.updateCount(0);
           game.update(0);
           player.updateCarsAtEnd(0);

        })
        
    }
}