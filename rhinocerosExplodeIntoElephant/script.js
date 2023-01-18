let cnv;
let sand1 = [];
let sand2 = [];
let pixelsCopy1 = [];
let pixelsCopy2 = [];

let capturer = new CCapture({
  format: 'png',
  name: 'frames'
});


function preload() {
  img1 = loadImage('img/rhino4.jpg');
  img2 = loadImage('img/elephant1.jpg');
}


function setup() {

  let w = max(img1.width, img2.width)
  let h = max(img1.height, img2.height)
  cnv = createCanvas(w, h);
  cnv.parent(`sketch`);
  
  pixelDensity(1);
  displayDensity(1);
  
  //visualizzo la prima immagine sul canvas
  image(img1, 0, 0);
  filter(GRAY);
  loadPixels();

  //creo il primo array, copia della prima immagine
  for(let i = 0; i < pixels.length/4; i ++) {
    pixelsCopy1[i] = pixels[i * 4]
  }

  //applico l'algoritmo di dithering
  pixelsCopy1 = dithering(pixelsCopy1);

  updatePixels();
  
  //visualizzo la seconda immagine sul canvas
  image(img2, 0, 0);
  filter(GRAY);
  loadPixels();

  //creo il secondo array, copia della seconda immagine
  for(let i = 0; i < pixels.length/4; i ++) {
    pixelsCopy2[i] = pixels[i * 4]
  }

  //applico l'algoritmo di dithering
  pixelsCopy2 = dithering(pixelsCopy2);

  updatePixels();

  background(255);
  
  //Definisco sand1 (rinoceronte)
  for(let i = 0; i < pixelsCopy1.length; i++) {
    if(pixelsCopy1[i] === 0) {
      let grain = new Grain(i % width, floor(i / width));
      sand1.push(grain);
    }
  }


  //Definisco sand2 (elefante)
  for(let i = 0; i < pixelsCopy2.length; i++) {
    if(pixelsCopy2[i] === 0) {
      let grain = new Grain(i % width, floor(i / width));
      sand2.push(grain);
    }
  }
  
}

function draw() {

  if(frameCount === 1) {
    console.log("Starting recording...");
    capturer.start();
  }

  background(255)

  

  if(frameCount < 20) {
    for(let i = 0; i < sand1.length; i++) {
      sand1[i].show()
    } 
  } else if(frameCount < 55) {
    for(let i = 0; i < sand1.length; i++) {
      sand1[i].applyForce(sand1[i].wind);
      sand1[i].update();
      sand1[i].show();
    } 
  } else {
    for(let i = 0; i < sand1.length; i++) {
      if(sand1[i].pos.dist(sand2[i].pos) > 2) {
        sand1[i].applyForce(sand1[i].attractionBy(sand2[sand1.length - i -1]));
        sand1[i].update();
      }
      
      sand1[i].show();
    }
  }

  if(frameCount % 10 === 0) {
    console.log(frameCount)
  }
  

  capturer.capture(cnv.canvas);
  if(frameCount === 900 + 1) {
    console.log('done!');
    capturer.stop();
    capturer.save();
    noLoop(); 
  }
}

function dithering(pixelsCopy) {
  // DITHERING ON pixelsCopy
  background(255);
  for(let y = 1; y < height - 1; y++) {
    for(let x = 1; x < width - 1; x ++) {
    
      let oldR = pixelsCopy[index(x, y)];
      
      let step = 1;
      let newR = round(step * oldR /255) * floor(255 / step);

      let errR = oldR - newR;

      
      //pixel ispezionato
      pixelsCopy[index(x, y)] = newR;


      //pixel destro
      pixelsCopy[index(x + 1 , y   )] = pixelsCopy[index(x + 1 , y   )] + errR * 7/16;
      
      //pixel diagonale sinistra
      pixelsCopy[index(x - 1 , y + 1)] = pixelsCopy[index(x - 1 , y + 1)] + errR * 3/16;

      //pixel sotto
      pixelsCopy[index(x     , y + 1)] = pixelsCopy[index(x     , y + 1)] + errR * 5/16;

      //pixel diagonale destra
      pixelsCopy[index(x + 1 , y + 1)] = pixelsCopy[index(x + 1 , y + 1)] + errR * 1/16;
      
      if(floor(random(20)) === 0) {
        
        pixelsCopy[index(x, y)] = 255;
        pixelsCopy[index(x, y) + 1] = 255;
        pixelsCopy[index(x, y) + 2] = 255;
        
      }

    }

  }

  return pixelsCopy;
}



function index(x,y) {
  return (x + y*width)
}

function displayArray(pixArray) {
  
  for(let i = 0; i < pixArray.lenght; i++) {

    stroke("black");
    rect(i % width, floor(i / width), 0.1, 0.1)

  }
}



