let alpha = 5;
let deltaAlpha = alpha;
let side = Math.min(window.innerWidth, window.innerHeight);
  


function setup() {

  cnv = createCanvas(side, side);
  cnv.parent("sketch")
  background(0,0,0);
  rectMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360);
  
  translate(width/2, height/2);
  applyMatrix(1,0,0,-1,0,0);
  
  noFill();
  rect(0,0, side, side);
  
  
}

function draw() {
  
  if(frameCount % 1 === 0) {
    
  
    translate(width/2, height/2);
    applyMatrix(1,0,0,-1,0,0);
  
    side = sqrt((1 + pow(tan(deltaAlpha), 2))/pow(1 + tan(deltaAlpha),2))*side
  
    console.log(side +"    "+alpha)
    
    strokeWeight(1.5)
    stroke(alpha, 360,360)
    rotate(-alpha);
    rect(0,0, side, side);
    rotate(alpha);
    
    alpha += deltaAlpha;
    
    if(alpha > 360) {
      deltaAlpha--;
      delta = deltaAlpha
    }
    
  }
  
  
}