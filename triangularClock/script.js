let n = 3;
let clockArray = [];
/* let r = 100;
rnd = Math.floor(Math.random()*3600);
time = [10 + rnd, 20*60 + 30 + rnd, 40*60 + 50 + rnd]
clock[1] = new Clock(-r, -r*Math.sqrt((3))/3, r, r, time[0], "#ffe200");
clock[2] = new Clock(r, -r*Math.sqrt((3))/3, r, r, time[1], "#5c77fd");
clock[3] = new Clock(0, 2*r*Math.sqrt((3))/3, r, r, time[2], "#ffffff"); */

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    rectMode(RADIUS)
    
    for(i = 0; i <  pow(4, n); i++) {
        r = (7 / 8) * (width/pow(2, n + 2))
        let squareCX = - width/2 + width/pow(2, n + 1) + (i % pow(2, n)) * width/pow(2, n)
        let squareCY = height/2 - height/pow(2, n + 1) - floor(i/pow(2, n)) * height/pow(2, n)
        rnd = Math.floor(Math.random()*3600);
        time = [10 + rnd, 20*60 + 30 + rnd, 40*60 + 50 + rnd]
        clockArray[i] = [
            new Clock(squareCX - r, squareCY - r * Math.sqrt((3)) / 3, r, r, time[0], "#ffe200"),
            new Clock(squareCX + r, squareCY - r * Math.sqrt((3)) / 3, r, r, time[1], "#5c77fd"),
            new Clock(squareCX + 0, squareCY + 2 * r * Math.sqrt((3)) / 3, r, r, time[2], "#ffffff")
        ]
    }

  }
  
  function draw() {
    background(0);
    translate(width/2, height/2);
    applyMatrix(1,0,0,-1,0,0);


    strokeWeight(1);    
    noFill()
    stroke("white")
    for(i = 0; i < pow(4, n); i++) {
        
        rect(- width/2 + width/pow(2, n + 1) + (i % pow(2, n)) * width/pow(2, n), 
        height/2 - height/pow(2, n + 1) - floor(i/pow(2, n)) * height/pow(2, n), 
        width/pow(2, n + 1)
        )
        
        
    }

    clockArray.forEach(a => {
        a[0].update();
        a[1].update();
        a[2].update();
        a[0].show();
        a[1].show();
        a[2].show();
    })
  }