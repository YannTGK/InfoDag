class SpaceShip {
    constructor(x, y) {
        //positie van het schip bepalen 
        this.pos = createVector(x, y);

        //richting dat het schip uitwijst
        this.heading = 0;

        //snelheid van het schip tot de muis
        this.speed= 4;

        /*Ik heb gewerkt met vectoren omdat dit de enige mogelijkheid is om het schip in de juiste richting te draaien.
        zelf berekend*/
    }

    //Tonen van het schip
    display(){
        //zorgen dat het schip in de juiste richting wordt weergeven
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        scale(0.5);
        // inspo: https://www.youtube.com/watch?v=cl5FW_zgY_Q
        //flames
        ellipseMode(CENTER)
        noStroke();
        fill(255, 185, 0);
        ellipse(0,random(35,55), 20,60);
        fill(255, 255, 0);
        ellipse(0,  random(35,50), 15, 40);
        //sidefins
        stroke(0, 0, 0)
        fill(0 , 0,0);
        arc(0, 36, 40, 40, 180, 0, CHORD)
        //body
        fill(255,255,255);
        ellipse(0, 0, 30, 80);
        //shield
        noFill();
        strokeWeight(2);
        stroke("blue");
        ellipse(0, 0, 90)
        //windows
        stroke("black")
        fill(0, 0, 0);
        ellipse(0, 0, 15, 15)
        fill(0, 0, 0);
        ellipse(0, 6, 15, 15)
        //front fin
        fill(0 , 0,0);
        ellipse(0, 32, 5, 30);
        pop()
    };
   
    move(){
        //het verschil tussen de beginpositie en eindpositie van het schip bepalen
        let differenceABY = mouseY-this.pos.y;
        let differenceABX = mouseX-this.pos.x;

        //de hoek berekenen dat deze geven om zo een vector te maken van de y- en x- as 
        let a = atan2(differenceABY, differenceABX);
        let thoek = tan(a);

        //resultaat
        let vectorY = (thoek*differenceABX)/this.speed;
        let vectorX = (differenceABY/thoek)/this.speed;

        //hiervan een vector maken
        let vectorDirection = createVector(vectorX, vectorY);

        //deze toevoegen aan de huidige positie om het schip te doen verplaatsen
        this.pos.add(vectorDirection);
      
        // Zelf gerekend. Gezien in mijn voorkennis van Electro Mechanica
       
    }

    turn(){
        //het verschil tussen de beginpositie en eindpositie van het schip bepalen
        let differenceABY = mouseY-this.pos.y;
        let differenceABX = mouseX-this.pos.x;

        //de hoek berekenen tussen de positie van het schip en de positie van de muis
        let a = atan2(differenceABY, differenceABX);

        //deze toevoegen aan de heading om zo het schip te roteren naar de muis toe 
        this.heading = a+90;

        //Zelf gerekend

    }

    // Collition detection, wanneer het schip met het schild tegen een asteroide vliegt. "scratcht"
    scratch(asteroids){
        //afstand tussen het schild en de asteroide berekenen. als deze kleiner is dan de straal van de asteroide + straal van de schild, true weergeven.  
        let d = dist(this.pos.x, this.pos.y, asteroids.pos.x, asteroids.pos.y);
        if (d< (asteroids.r/2) +23){
            return true;
        } else {
            return false;
        }
        //zelf gerekend met hulp van
        //https://www.youtube.com/watch?v=xTTuih7P0c0
        //7 min (collision detection)
    }

    // Collition detection, wanneer het schip met zijn kern tegen een asteroide vlieg
    collide(asteroids) {
        let d = dist(this.pos.x, this.pos.y, asteroids.pos.x, asteroids.pos.y);

        if (d < (asteroids.r/2+9)){
            return true;
        } else {
            return false;
        }
        //zelf gerekend met hulp van
        //https://www.youtube.com/watch?v=xTTuih7P0c0
        //7 min (collision detection)

    }
};