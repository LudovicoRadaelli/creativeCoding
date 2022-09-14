let p = [
  { x: 0,
    y: 0 },
  { x: 40,
    y: 0 },
  { x: 0,
    y: 40 },
];

let k = 0;
let initialDistance;
let actualDistance;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  
  translate(width/2, height/2);
  applyMatrix(1, 0, 0, -1, 0, 0);

  triangle(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y)  

  if(touches.length === 2) {

  }
}

function touchStarted() {

  if(touches.length === 2) {
    initialDistance = distance(touches[0], touches[1]);
  }

}

function toucheMoved() {

  actualDistance = distance(touches[0], touches[1]);
  k = abs((actualDistance - initialDistance)/initialDistance);
  k = map(k, 0, 2, 0, 1);

  p[0].x = k*p[0].x; 
  p[0].y = k*p[0].y;

  p[1].x = k*p[1].x; 
  p[1].y = k*p[1].y;
  
  p[2].x = k*p[2].x; 
  p[2].y = k*p[2].y;
}

function distance(a, b) {
  return sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y))
}

let code = `
let p = [
  { x: 0,
    y: 0 },
  { x: 40,
    y: 0 },
  { x: 0,
    y: 40 },
];

let k = 0;
let initialDistance;
let actualDistance;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  
  translate(width/2, height/2);
  applyMatrix(1, 0, 0, -1, 0, 0);

  triangle(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y)  

  if(touches.length === 2) {

  }
}

function touchStarted() {

  if(touches.length === 2) {
    initialDistance = distance(touches[0], touches[1]);
  }

}

function toucheMoved() {

  actualDistance = distance(touches[0], touches[1]);
  k = abs((actualDistance - initialDistance)/initialDistance);
  k = map(k, 0, 2, 0, 1);

  p[0].x = k*p[0].x; 
  p[0].y = k*p[0].y;

  p[1].x = k*p[1].x; 
  p[1].y = k*p[1].y;
  
  p[2].x = k*p[2].x; 
  p[2].y = k*p[2].y;
}

function distance(a, b) {
  return sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y))
}`

document.getElementById("demo").innerHTML = code;