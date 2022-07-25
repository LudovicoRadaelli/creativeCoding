let xoff = 0;
let yoff = 0;
let zoff = 0;

let u = 20;

function setup() {
  createCanvas(400, 400);
  background(0);
  colorMode(HSB, 100);
  frameRate(20);
}

function draw() {
  
  //aggiorno gli off
  xoff += 0.1
  yoff += 0.1
  zoff += 0.1
  
  //traslo gli assi cartesiani
  translate(width/2, height/2);
  applyMatrix(1,0,0,1, 0, 0)
  
  //definisco l'unità di misura: 1u = 20px  
  let u = 20;
  

  //definisco il centro della prima retta
  centerX = -width/2/u + noise(xoff, 0, 0)*width/u
  centerY = -height/2/u  + noise(0, yoff, 0)*height/u;
  
  //definisco il coefficiente angolare della prima retta
  m = -10 + noise(0,0,zoff)*20;
  

  //disegno la prima retta (colorata)
  noFill();
  //stroke(noise(xoff, 0, 0)*255, noise(0, yoff, 0)*255, noise(0, 0, yoff)*255);
  
  stroke((noise(xoff, yoff, zoff)*100)%100, 100, 100)
  beginShape()
  for(i = -width/2/u; i <width/2/u ; i += 0.1) {    
    vertex(i*u, (centerY + m*(i - centerX))*u);
  }
  endShape()
  
  
  //definisco il centro della seconda retta
  centerX = -width/2/u + noise(xoff+500, 0, 0)*width/u
  centerY = -height/2/u  + noise(0, yoff+500, 0)*height/u;
  
  //definisco il coefficiente angolare della seconda retta
  m = -10 + noise(0,0,zoff+500)*20;
  
  //disegno la seconda retta (nera)
  stroke(0, 0, 0)
  beginShape()
  for(i = -width/2/u; i <width/2/u ; i += 0.1) {    
    vertex(i*u, (centerY + m*(i - centerX))*u);
  }
  endShape()
  
  
  fill(0,0,0);
  beginShape();
  // Exterior part of shape, clockwise winding
    vertex(-width, -height);
    vertex(-width, height);
    vertex(width, height);
    vertex(width, -height);
  // Interior part of shape, counter-clockwise winding
  beginContour();
  for(let i = 0; i < 2*PI; i += 0.1) {
    vertex(cos(i)*3*width/10, sin(i)*3*height/10)
  }
  
  endContour();
  endShape(CLOSE);
  
  
  print(`
centerX: ${centerX},
centerY: ${centerY},
m: ${m}`)
}

