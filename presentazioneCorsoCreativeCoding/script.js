let w = window.innerWidth;
let h = window.innerHeight;
let cnv;
let wordArray = [`C`, `r`, `e`, `a`, `t`, `i`, `v`, `e`, ` `, `C`, `o`, `d`, `i`, `n`, `g`];
let bar = `|`;
let barPosition;

let amt = 0;

let wordWidth = 0;
let padding;

//VARIABILI SECONDA ANIMAZIONE
var stars = [];
var colors = ['#ffffff', '#fff15c', '#ffe800', '#f3f1e2'];
var starsNumber = 25;

//VARIABILI TERZA ANIMAZIONE
let inizio = 0;
let vel = 0.09;
let maxDimen = 12;
let numRighe = 70;
let numColonne = 20;
let numGiri = 2;


function setup() {
    cnv = createCanvas(w, h);
    cnv.parent("sketch");
    frameRate(10);
    background(20);

    textSize(40);
    textFont(`monospace`)

    let wordLenght = textWidth("Creative Coding"); 
    padding = (width - wordLenght)/4;
    console.log(padding)
  }
  
  function draw() {
    
    

    
    

    //ANIMAZIONE SCRITTA INIZIALE
    if(frameCount <= 16) {

        push();

        translate(0, height/10);

        background(20);    

        writeWord(frameCount)
        console.log(wordWidth);


        fill("white");
        text(bar, padding + wordWidth + 2, 0) 

        pop();

    }

    if(frameCount === 16) {

        push();

        translate(0, height/10);

        barPosition = padding + wordWidth - textWidth(wordArray[15]) - textWidth(wordArray[16]);

        pop();
        
    }

    //SCRITTA PERMANENTE E BARRA LAMPEGGIANTE
    if(frameCount > 16 && frameCount <= 40) {

        push();

        translate(0, height/10);
    
        background(20);
    
        writeWord(14);
    
        if(frameCount % 10 >= 0 && frameCount % 10 <= 4) {
            stroke("white");
            fill("white");    
        } else {
            stroke(color(20));
            fill(color(20));
        }

        text(bar, barPosition, 0);

        pop();
    } 

    //CANCELLA LA PAROLA

    if(frameCount > 40 && frameCount <= 55) {
        
        push();

        translate(0, height/10);

        background(20);
        writeWord(14 - (frameCount - 40));
        fill("white");
        text(bar, padding + wordWidth + 2, 0) 

        if(14 - (frameCount - 40) === 0) {
            console.log(frameCount)
        }

        pop();
    }

    if(frameCount === 56) {
        background(20)
    }

    if(frameCount >= 57 && frameCount <= 230) {

        push();

        if(frameCount <= 178) {
            angleMode(DEGREES);
            noFill();
            frameRate(20);

            translate(width/2,height/2);
            rotate((frameCount-57)*3);
            stroke(lerpColor(color('#ea0043'), color('#0fefca'), ((frameCount-57)%120)/120));
            
            ellipse(100,0,150,150);
        }

        pop()
    }

    if(frameCount >= 230 && frameCount <= 300) {

        push();

        /* noStroke();
        frameRate(24);

        fill(20);
        rect(width - 6*(frameCount- 230), 0, 6*(frameCount- 230), height) */

        strokeWeight(random(15, 30));
        stroke(random(30));
        let rnd = random(width)
        line(rnd, 0, rnd, height)

        pop();
        
    }

    if(frameCount === 300) {

        background(20);

    }

    //STELLE
    if(frameCount >= 300 && frameCount <= 850) {

        push();

        frameRate(50);

        
        background('#200e68');
        fill('white');
        textSize(20);
        textFont('helvetica');
        textAlign(CENTER)
        text('Clicca lo schermo', windowWidth/2, height/2);

        
        for (var b = 0; b < stars.length; b++) {
            stars[b].move();
            stars[b].display();
            stars[b].color = color(random(colors));
        }
        
        if (frameCount > 700) {
            starsNumber = 0;
        }
        
        pop();

    }

    if(frameCount >= 850 && frameCount <= 940) {

        push();

        strokeWeight(random(15, 30));
        stroke(random(30));
        let rnd = random(height)
        line(0, rnd, width, rnd)

        pop();
        
    }

    if(frameCount === 940) {
        frameRate(24);
        console.log(`inizio: ${inizio}`)
    }

    if(frameCount >= 940 && frameCount <= 1050) {
        push();

        angleMode(RADIANS)
        noStroke();
        
        inizio = (920 -frameCount) * vel;

        
        background('black');
        
        for(var giri = 0; giri < numGiri; giri += 1) {
            var giriInizio = inizio + map(giri, 0, numGiri, 0, TWO_PI);
        
            for(var col = 0; col < numColonne; col += 1) {
                var colOffset = map(col, 0, numColonne, 0, TWO_PI);
                var x = map(col, 0, numColonne, 50, width - 50);
            
                for(var rig = 0; rig < numRighe; rig += 10) {
                    var y = 90 + rig * 10 + sin(giriInizio + colOffset) * 50;
                    var dimOffset = (cos(giriInizio - (rig / numRighe) + colOffset) + 1.1) * 0.5;
                    var dimen = dimOffset * maxDimen;
                
                    var colorList = ['CornflowerBlue', 'DarkOrchid', 'DarkSeaGreen', 'DeepPink'];
                    var index = Math.round(random() * (colorList.length - 1));
                    fill(color(colorList[index]));
                    ellipse(x, y, dimen, dimen);
                
                }
            }
        }

    }

    if(frameCount >= 1050 && frameCount <= 1140) {

        push();
        frameRate(50);

        strokeWeight(random(15, 50));
        stroke(random(50));
        let rnd = random(height)
        line(0, rnd, width, rnd - 150)

        pop();
        
    }

    if(frameCount >= 1140) {
        push();

        background(20);
        stroke(`rgba(255,255,255, 255 - (1140 - ${frameCount})/(1240*5))`);
        fill(`rgba(255,255,255, 255 -(1140 - ${frameCount})/(1240*5))`);
        textAlign(CENTER);
        text("Vi aspetto!",width/2,height/2)

        pop();
    }
        
}






function Star (_x, _y,) {
    this.size = random(3, 15);
    this.x = _x;
    this.y = _y;
    this.color = 'white';
    this.speed1 = 10;
    this.speed2 = -20;
  
    var xInc = 1;
    var yInc = 1;
  
    this.move = function() {
      this.x += this.speed1 * xInc;
      this.y += this.speed2 * yInc;
      if (this.y > height || this.y < 0) {
        yInc = yInc * -1;
      }
      if (this.x > width || this.x < 0) {
        xInc = xInc * -1;
      }
      if (frameCount > 700) {
        xInc = xInc * 0;
        yInc = yInc * 0;
        this.x = this.x + random(-0.25, 0.25);
        this.y = this.y + random(-0.25, 0.25);
      }
    }
  
    this.display = function() {
      fill(this.color);
      noStroke();
      ellipse(this.x, this.y, this.size);
    }
  }

function writeWord(k) {

    wordWidth = 0;
    for(let i = 0; i <= k; i++) {
            
        let letterColor = lerpColor(color(`#0fefca`), color(`#ea0043`), i/15);
        noStroke()
        fill(letterColor)
        text(wordArray[i], padding + wordWidth, 0);    
        wordWidth += textWidth(wordArray[i]);

    }
}
            
        
    
function mouseClicked() {

    if(frameCount >= 351 && frameCount <= 800) {
        for (var a = 0; a < starsNumber; a++) {
            var myStar = new Star(mouseX, mouseY, 10);
            myStar.speed1 = random(-5, 5);
            myStar.speed2 = random(-5, 5);
            myStar.color = color(random(colors));
            stars.push(myStar);
        }
        console.log(frameCount)
    }
}
