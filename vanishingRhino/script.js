let cnv;
let sand = [];
let pixelsCopy = [];

let capturer = new CCapture({
  format: 'png',
  name: 'frames'
});

function preload() {
  img = loadImage('img/rhino4.jpg');
}

function setup() {
  cnv = createCanvas(img.width, img.height);
  cnv.parent(`sketch`);
  
  pixelDensity(1);
  displayDensity(1);
  
  ellipseMode(CENTER);
  
  image(img, 0, 0);
  filter(GRAY);

  loadPixels();


 
  //CREO L'ARRAY COPIA DELL'ARRAY pixels
  for(let i = 0; i < pixels.length/4; i ++) {
    pixelsCopy[i] = pixels[i * 4]
  }
 
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


  //DEFINISCO OGGETTI DELLA CLASSE Grain IN CORRISPONDENZE DEI PIXEL NERI
  for(let i = 0; i < pixelsCopy.length; i++) {
    if(pixelsCopy[i] === 0) {
      let grain = new Grain(i % width, floor(i / width));
      sand.push(grain);
    }
  }

}

function draw() {

  if(frameCount === 1) {
    console.log("Starting recording...");
    capturer.start();
  }

  background(255)

  for(let i = 0; i < sand.length; i++) {

    if(frameCount >= 60){
      sand[i].applyForce(sand[i].wind);
      sand[i].update();
    }
    sand[i].show();
  }

  capturer.capture(cnv.canvas);
  if(frameCount === 60*30 + 1) {
    console.log('done!');
    capturer.stop();
    capturer.save();
    noLoop(); 
  }
}



function index(x,y) {
  return (x + y*width)
}




