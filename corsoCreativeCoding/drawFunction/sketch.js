let times = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textSize(50);
  frameRate(20);
}

function draw() {
  background(200);

  rect(frameCount, height/8, 100, 100)
  
  text(`frame:    ${frameCount}`, 3*width/8, 7*height/16);
  let time = floor(millis()/10)/100
  text(`secondi: ${time}`, 3/8*width, 9*height/16)

  
}