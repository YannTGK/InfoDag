class Asteroid {
    constructor(size) {
        //groote van de asteroide
        this.r = size;

        // beginpositie van de asteroide
        this.pos = createVector(random(width/2-100), random(height/2-100));

        // snelheid van de asteroides bepalen
        this.vel = p5.Vector.random2D();
        this.speed = 4
        this.vel.mult(this.speed);
        /*Ik heb gewerkt met vectoren omdat dit de enige mogelijkheid is om asteroiden echt ramdom een richting te geven over de x- en y- as 
        zelf berekend*/
    }

    display(){
        fill("brown")
        ellipse(this.pos.x, this.pos.y, this.r);
        fill("black");
        ellipse(this.pos.x+15, this.pos.y+25, 25)
        ellipse(this.pos.x-30, this.pos.y, 125-75)
        ellipse(this.pos.x+30, this.pos.y-20, 125-100)
        ellipse(this.pos.x, this.pos.y-40, 125-115)
        ellipse(this.pos.x-20, this.pos.y+40, 125-115)
    }

    //toevoegen random vector om verplaatsing naar een richting mogelijk te maken
    move(){
       this.pos.add(this.vel);
       //https://www.youtube.com/watch?v=hacZU523FyM 
       //30 min 
    }

    //asteroiden terug laten verschijnen aan de overkant als deze de canvas verlaat
    frame(){
        if (this.pos.x > width +this.r){
            this.pos.x = -this.r;
        } 
        else if (this.pos.x < -this.r){
            this.pos.x = width + this.r;
        }

        else if (this.pos.y > height +this.r){
            this.pos.y = -this.r;
        } 
        else if (this.pos.y < -this.r){
            this.pos.y = height + this.r;
        }
        //https://www.youtube.com/watch?v=hacZU523FyM
        //17 min
    };

};