//DEFINIZIONE VARIABILI

let cnv; 
let side = 3*Math.min(window.innerWidth, window.innerHeight)/4;
let isDrawing = false;
let button;
let projectionRequired = false;

//distanza focale (cm)
let f = 300; 

//altezza dell'osservatore (cm)
let h = 150; 

//distanza dell'osservatore dal centro del disegno (cm)
let d = 400;


//DEFINIZIONE CLASSE FloorDrawing

class FloorDrawing { 
  constructor(pointsArray) {
    this.pointsArray = pointsArray; 
  }


  show() {  

    stroke("black");
    strokeWeight(4);
    for(let i = 0; i < this.pointsArray.length; i++) {
      point(this.pointsArray[i].x, this.pointsArray[i].y)
    }

  }

  project() {

    let proj = []; 

    for(let i = 0; i < this.pointsArray.length; i++) {

      let u = this.pointsArray[i].x;
      let v = this.pointsArray[i].y;

      //il segno meno iniziale è per raddrizzare l'immagine
      proj[i] = {        
        x: -f*u/(-v - d),
        y: -f*(-h)/(-v - d),
      }

    }

    return proj

  }

  showProjection() {

    let projection = this.project();

    stroke("black");
    strokeWeight(4);
    for(let i = 0; i < projection.length; i++) {
      point(projection[i].x, projection[i].y)
    }

  }
}


//  let pointIndex = 0;
let pointsArray = [];
let drawing;

/* //inserisco i punti della circonferenza
for(let i = 0; i < 2*Math.PI; i += 0.01) {
  pointsArray[pointIndex] = {
    x: 100*Math.cos(i),
    y: 100*Math.sin(i)
  };
  pointIndex++
}

//inserisco segementi verticali
for(let i = -200; i < 200; i += 50) {
  for(let j = -200; j < 200; j += 0.1) {
    pointsArray[pointIndex] = {
      x: i,
      y: j
    }
  pointIndex++
  }
}

//GENERO L'OGGETTO DISEGNO 

//inserisco segementi orizzontali
for(let i = -200; i < 200; i += 50) {
  for(let j = -200; j < 200; j += 0.1) {
    pointsArray[pointIndex] = {
      x: j,
      y: i
    }
    pointIndex++
  }
}

console.log(pointsArray)
  
let drawing = new FloorDrawing(pointsArray); */



function setup() {
  cnv = createCanvas(side, side);
  cnv.parent(`sketch`)
  pixelDensity(1); 
}


function draw() {

  //cambio le coordinate
  translate(width/2, height/2);
  applyMatrix(1, 0, 0, -1, 0, 0); 

  if(isDrawing) {

    //acquisisco i punti dell'immagine disegnata e li registro in drawing
    //il filtro del frameCount serve a contenere la lunghezza dell'array
    if(frameCount % 2 === 0) {

      background(255);
      
      let newPoint = {
        x: mouseX - width/2,
        y: -mouseY + height/2
      }
      
      pointsArray.push(newPoint);
      
      stroke(0);
      strokeWeight(4)
      
      for (let i = 0; i < pointsArray.length; i++) {
        point(pointsArray[i].x, pointsArray[i].y);
      }
      
    }
  } else if(projectionRequired) {

    drawing = new FloorDrawing(pointsArray)

    for(let i = 0; i < pointsArray.length; i++) {
      console.log(`
      [${i}] ${drawing.pointsArray[i].x}, ${drawing.pointsArray[i].y}}`)  
    }

    background(255);

    drawing.showProjection();

    noLoop()

  } else {
    
    if(frameCount === 1) {
      push()
      applyMatrix(1, 0, 0, -1, 0, 0);
      textSize(30)
      textAlign(CENTER)
      text("Disegna qualcosa", 0, 0)
      pop()

      noLoop()  
    }
    
  }

}



function changeProjecitionRequired() {
  projectionRequired = !projectionRequired;
}



function mousePressed() {
  if(!isDrawing) {
    isDrawing = true;
    loop()
  }
}



function mouseReleased() {
  isDrawing = false;
}
