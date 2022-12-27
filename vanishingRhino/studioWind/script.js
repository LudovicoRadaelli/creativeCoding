//DEFINIZIONE VARIABILI

let cnv; 
let side = 3*Math.min(window.innerWidth, window.innerHeight)/4;

let sand = [];


//DEFINIZIONE CLASSE GRAIN
class Grain {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = width - x;

    //this.wind = createVector(0.1 + (width - x) * random(-0.05, 0.05), random(-0.05, 0.05));
    this.wind = createVector(0.1 + (width - x)/5000,  random(-0.05, 0.05));
    
  }

  show() {
    rect(this.pos.x, this.pos.y, 0.1 , 0.1)
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0); 
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
}


function setup() {
  cnv = createCanvas(side, side);
  cnv.parent(`sketch`);
  //pixelDensity(1); 
  ellipseMode(CENTER);


  for(let i = 0; i < 500; i++) {
    let grain = new Grain(random(width), random(height))
    sand.push(grain);
  }
}


function draw() {

  background(255)

  for(let i = 0; i < sand.length; i++) {

    sand[i].applyForce(sand[i].wind);
    
    sand[i].update();
    sand[i].show();
  }
}



