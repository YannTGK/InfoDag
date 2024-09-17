//mode van het spel bepalen, 0 is beginscherm, 1 is gamescherm
let mode;

//variabele voor spaceship
let spaceship;

//array voor de asteroides
let asteroids = [];

//variabele voor het schild
let health = 200;
let maxHealth =200;

//game over scherm image 
let img;

//background sterrrenstelsen voor de game zelf
let imgbg;

//variabelen voor puntentelling
let timer = 1;
let points;

function preload() {
    img = loadImage("../images/GameOver.jpg");
    imgbg = loadImage("../images/Space.jpg");
    //p5 reference
}

function setup() {
    createCanvas(1250, 550);
    //startscherm weergeven
    mode = 0;

    //settings over de volledige sketch instellen
    angleMode(DEGREES);
    imageMode(CENTER);
    ellipseMode(CENTER);
    frameRate(40);

    //spaceship tekenen
    spaceship = new SpaceShip(width/2, height/2 );

    //begin asteroides instellen
    for (let i= 0; i< 20; i++){
        asteroids.push(new Asteroid(120))
    } ;

    //toevoegen van een nieuwe asteroide om de 10 seconden voorbereiden 
    setInterval(() => {
        asteroids.push(new Asteroid(120));
    }, 10000);
}

//functie voor het tellen en weergeven van de punten
function pointsCounter(){
    textSize(20);
    fill("blue");
    text("You reached "+points+" points", width/2-200,490);
    
    //punten toevoegen zolang het schild leeft (game actief is), anders stopzetten
    if (health >=1) { 
        timer ++;
        points = round(timer/20);
    } else {
        timer= timer+0;
    };
}

//aantal schild weergeven als healthbar
function shieldbar(health, maxHealth){
    push();
    stroke(0);
    strokeWeight(4);
    noFill();
    fill("blue");
    rect(width/2-200, 500, map(health, 0, maxHealth,0,400), 15);
    pop();
    // https://www.youtube.com/watch?v=d21jNGfeNOU
}

//starten van de game instellen als er op enter wordt gedrukt
function keyPressed() {
    if (keyCode===ENTER){
        mode = 1;
    } else {
        mode =0;
    }
}

function draw() {
   
    if (mode == 0){
        //beginscherm weergave
        push();
        textSize(32);
        stroke("blue");
        fill("blue");
        text("Press enter to start", width/2-150, height/2);
        textSize(20);
        stroke(255);
        fill("white")
        text("Use your mouse to dodge all the moving asteroids", width/2-240, height/2+50)
        text("You do have a shield but flying straight into an asteroid will destroy you instantly", width/2-375, height/2+ 75)
        text("Goodluck astronaut! Fly the longest time possible!", width/2-240,height/2+100);
        keyPressed();
        pop();
        
    }   
    
    else {
        //background image (sterrenstelsel) instellen
        image(imgbg, 0,0);
        imgbg.resize(2500,1100); 
        
        //asteroiden weergeven en doen verplaatsen
        for (let i = 0; i < asteroids.length; i++){
            asteroids[i].display();
            asteroids[i].frame();
            asteroids[i].move();
        }
       
        //schip tonen, verplaatsen als op de muis wordt gedrukt 
        if (mouseIsPressed==true){
            spaceship.move();
        }
        spaceship.turn();
        spaceship.display();

        //puntentelling uitoefenen 
        pointsCounter();

        //schild weergeven
        shieldbar(health, maxHealth);
       
        //nakijken of het schip of het schild een asteroide raakt
        for (let i = 0; i < asteroids.length; i++){
            if(spaceship.collide(asteroids[i])){
                //direct verliezen als de kern een asteroide raakt 
                health = 0;
            } else if (spaceship.scratch(asteroids[i])){
                //schild verliezen als een asteroide het schild raakt 
                health -= 6;
            } else {
                health = health;
            }
        };

        if (health <= 1) {
            // als geen schild meer aanwezig is gameover scherm tonen
            image(img, width/2, height/2, 1250, 550);
            timer += 0;
            text("You have "+points+" points", width/2-90,490);
        } else {
            health= health;
        };
    };
};
