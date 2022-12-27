let cnv;
let g = 0.5;

function setup() {

  cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent(`sketch`);
  
  colorMode(RGB, 1);
  rectMode(CENTER);

}

function draw() {

  let c = {
    x: 5*width/8,
    y: height/2
  }

  let side = 5;
  
  stroke(0);
  console.log(g);
  fill(g);
  rect(3*width/8, height/2, side, side);

  noFill();
  rect(c.x, c.y, side, side);

  push();
    for(let i = 0; i < (1-g)*side*side; i++) {
      strokeWeight(1);
      stroke(0);

      point(c.x + random(-side/2, side/2), c.y + random(-side/2, side/2))
    }
  pop();

  noLoop();

}

function mouseClicked() {
  g = random(101)/100;
  background(1);
  loop();
}

