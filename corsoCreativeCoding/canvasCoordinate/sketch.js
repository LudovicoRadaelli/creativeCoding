function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textSize(20)
}

function draw() {
  background(200);
  
  
  line(0, 0, mouseX, mouseY);
  
  push();
  strokeWeight(7);
  stroke("blue");
  line(0, 0, 0, mouseY);
  stroke("red");
  line(0, 0, mouseX, 0);
  pop();

  point(mouseX, mouseY);
  let xPos;
  let yPos;

  if(mouseX > width - 100) {
    xPos = mouseX - 100;
  } else {
    xPos = mouseX + 20;
  }

  if(mouseY > height - 50) {
    yPos = mouseY - 20;
  } else {
    yPos = mouseY + 30;
  }

  text(`(${mouseX}, ${mouseY})`, xPos, yPos);
}