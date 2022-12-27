let cnv;
let pixelsCopy = [];
let brightShift = 0;
let c = 1;
let gamma = 1;
mode = "";
let extr = 0;
let long = 0;

function preload() {
  img = loadImage('img/original.png');
}

function setup() {
  cnv = createCanvas(img.width, img.height);
  cnv.parent(`sketch`);
  pixelDensity(1);
  background(0);
  
  image(img, 0, 0);

  //TRASFORMA L'IMMAGINE IN BIANCO E NERO
  loadPixels();

  for(let i = 0; i < pixels.length; i += 4) {  
  
    let mean = (pixels[i] + pixels[i+1] + pixels[i+2])/3;
    //pixels[i + 3] = 100;
    pixels[i] = mean;
    pixels[i + 1] = mean;
    pixels[i + 2] = mean;
    
  }

  updatePixels();

  //COPIA L'ARRAY PIXELS IN UN ARRAY CHE NON VIENE MODIFICATO
  for(let i = 0; i < pixels.length; i++) {
    pixelsCopy[i] = pixels[i]
  }


  console.log(pixels);
}


function draw() { 
  

  if(keyIsPressed) {
    if(keyCode === 65) {  //premi il tasto "a"
      mode = "linearTransform";
    } else if(keyCode === 66) { //il tasto "b" è stato premuto
      mode = "logarithmicTransform"
    } if(keyCode === 67) { //il tasto "c" è stato premuto
      mode = "gammaCorrection"
    } else if(keyCode === 68) { //il tasto "d" è stato premuto
      mode = "dithering"
    }
    console.log(`mode: ${mode}`)
  }
  

  

  if(mode === "linearTransform") {
    //TRASFORMAZIONE LINEARE 
    //Modifica la luminosità di un valore brightShift usando l'array pixel copia
    if(keyIsPressed) {
      if(keyCode === UP_ARROW) {
        brightShift += 5;
      } else if(keyCode === DOWN_ARROW) {
        brightShift -= 5;
      }
    
      loadPixels();
  
      for(let i = 0; i < pixels.length; i += 4) {  
        pixels[i] = pixelsCopy[i] + brightShift;
        pixels[i + 1] = pixelsCopy[i + 1] +  brightShift;
        pixels[i + 2] = pixelsCopy[i + 2] +  brightShift;
      }
  
      updatePixels();      
    }
  } else if(mode === "logarithmicTransform") {
    //TRASFORMAZIONE LOGARITMICA
    //Modifica la luminosità di un valore brightShift usando l'array pixel copia
    if(keyIsPressed) {
      if(keyCode === UP_ARROW) {
        c += 2;
      } else if(keyCode === DOWN_ARROW) {
        c -= 2;
      }
  
      loadPixels();
  
      for(let i = 0; i < pixels.length; i += 4) {  
        pixels[i] = c*log(1 + pixelsCopy[i]);
        pixels[i + 1] = c*log(1 + pixelsCopy[i + 1]);
        pixels[i + 2] = c*log(1 + pixelsCopy[i + 2]);
      }
  
      updatePixels();      
    }
  } else if(mode === "gammaCorrection") {
    //GAMMA CORRECTION - TRASFORMAZIONE ESPONENZIALE
    //Modifica la luminosità di un valore brightShift usando l'array pixel copia
    if(keyIsPressed) {
      if(keyCode === UP_ARROW) {
        gamma += 0.01;
      } else if(keyCode === DOWN_ARROW) {
        gamma -= 0.01;
        if(gamma < 0) {
          gamma = 0;
        }
      }
    
      loadPixels();
  
      for(let i = 0; i < pixels.length; i += 4) {  
        pixels[i] = pow(pixelsCopy[i], gamma);
        pixels[i + 1] = pow(pixelsCopy[i + 1], gamma);
        pixels[i + 2] = pow(pixelsCopy[i + 2], gamma);
      }
  
      updatePixels();   
    }
   } if(mode === "dithering") {
    
      loadPixels();

      for(let y = 1; y < height - 1; y++) {
        for(let x = 1; x < width - 1; x++) {
          
          let oldR = pixelsCopy[index(x, y) + 0];
          let oldG = pixelsCopy[index(x, y) + 1];
          let oldB = pixelsCopy[index(x, y) + 2];
          
          let newR = round(oldR /255) * 255;
          let newG = round(oldG /255) * 255;
          let newB = round(oldB /255) * 255;

          let errR = oldR - newR;
          let errG = oldG - newG;
          let errB = oldB - newB;

          //pixel destro
          pixels[index(x + 1 , y   ) + 0] = pixelsCopy[index(x + 1 , y   ) + 0] + errR * 7/16;
          pixels[index(x + 1 , y   ) + 1] = pixelsCopy[index(x + 1 , y   ) + 1] + errG * 7/16;
          pixels[index(x + 1 , y   ) + 2] = pixelsCopy[index(x + 1 , y   ) + 2] + errB * 7/16;
          
          //pixel diagonale sinistra
          pixels[index(x - 1 , y + 1) + 0] = pixelsCopy[index(x - 1 , y + 1) + 0] + errR * 3/16;
          pixels[index(x - 1 , y + 1) + 1] = pixelsCopy[index(x - 1 , y + 1) + 1] + errG * 3/16;
          pixels[index(x - 1 , y + 1) + 2] = pixelsCopy[index(x - 1 , y + 1) + 2] + errB * 3/16;

          //pixel sotto
          pixels[index(x     , y + 1) + 0] = pixelsCopy[index(x     , y + 1) + 0] + errR * 5/16;
          pixels[index(x     , y + 1) + 1] = pixelsCopy[index(x     , y + 1) + 1] + errG * 5/16;
          pixels[index(x     , y + 1) + 2] = pixelsCopy[index(x     , y + 1) + 2] + errB * 5/16;
    
          //pixel diagonale destra
          pixels[index(x + 1 , y + 1) + 0] = pixels[index(x + 1 , y + 1) + 0] + errR * 1/16;
          pixels[index(x + 1 , y + 1) + 1] = pixels[index(x + 1 , y + 1) + 1] + errG * 1/16;
          pixels[index(x + 1 , y + 1) + 2] = pixels[index(x + 1 , y + 1) + 2] + errB * 1/16;
          
          
          console.log(`
          pixels[${index(x, y)}]: ${[newR, newG, newB]}
          `);
          
          noLoop();

          /* 
          pixels[index(x + 1 , y   )] =  ;
          pixels[index(x - 1 , y + 1)] = ;
          pixels[index(x     , y + 1)] = ;
          pixels[index(x + 1 , y + 1)] = ;           
          */
    
        }
      }

      console.log(`
      difference: ${pixelsCopy[index] - pixels[index]}`)

      updatePixels();
      noLoop();
    }
}

function index(x,y) {
  return (x + y*width)*4
}




