//DEFINIZIONE VARIABILI

let cnv; 
let side = 7*Math.min(window.innerWidth, window.innerHeight)/8 ;
let isDrawing = false;
let projectionRequired = false;

//distanza focale (cm)
let f = 300; 

//altezza dell'osservatore (cm)
let h = 150; 

//distanza dell'osservatore dal centro del disegno (cm)
let d = 400;


//DEFINIZIONE CLASSE ScreenDrawing

class ScreenDrawing { 
  constructor(pointsArray) {
    this.pointsArray = pointsArray; 
  }


  show() {  

    stroke("black");
    strokeWeight(3);
    for(let i = 0; i < this.pointsArray.length; i++) {
      point(this.pointsArray[i].x, this.pointsArray[i].y)
    }

  }

  backProject() {

    let backProj = []; 

    for(let i = 0; i < this.pointsArray.length; i++) {

      let x = -this.pointsArray[i].x;
      let y = -this.pointsArray[i].y;

      //il segno meno iniziale è per raddrizzare l'immagine
      backProj[i] = {        
        x: -h*x/y,
        y: (f*h -y*d)/y,
      }

    }

    return backProj

  }

  showProjection() {

    let backProjection = this.backProject();

    stroke("black");
    strokeWeight(3);
    for(let i = 0; i < backProjection.length; i++) {
      point(backProjection[i].x, backProjection[i].y)
    }

  }
}



let pointsArray = [];
let drawing;


let pointIndex = 0;

//inserisco i punti della circonferenza
for(let i = 0; i < 2*Math.PI; i += 0.01) {
  pointsArray[pointIndex] = {
    x: side/8*Math.cos(i),
    y: side/8*Math.sin(i) - 3*side/8
  };
  pointIndex++
}

//inserisco segementi verticali
for(let i = -side/2; i < side/2; i += 50) {
  for(let j = -side/2; j < 0; j += 0.1) {
    pointsArray[pointIndex] = {
      x: i,
      y: j
    }
  pointIndex++
  }
}

//GENERO L'OGGETTO DISEGNO 

//inserisco segementi orizzontali
for(let i = -side/2; i < 0; i += 50) {
  for(let j = -side/2; j < side/2; j += 0.1) {
    pointsArray[pointIndex] = {
      x: j,
      y: i
    }
    pointIndex++
  }
}

console.log(pointsArray)
  




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
      

      //disegno la linea dell'orizzonte
      strokeWeight(1)
      line(-width/2, 0, width/2, 0);


      //disegno l'array aggiornato
      stroke(0);
      strokeWeight(4)
      
      for (let i = 0; i < pointsArray.length; i++) {
        point(pointsArray[i].x, pointsArray[i].y);
      }
      
    }
  } else if(projectionRequired) {

    drawing = new ScreenDrawing(pointsArray)

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
