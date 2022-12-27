let cnv;

function preload() {
  img = loadImage('img/brighterCat.jpg');
}

function setup() {
  cnv = createCanvas(img.width*2, img.height*2);
  cnv.parent(`sketch`);
  pixelDensity(1);
  displayDensity(1);
  
  image(img, 0, 0);

  filter(GRAY)

  console.log(pixels);

  loadPixels();

  /* DITHERING */

  background(255);

  for(let y = 1; y < height - 1; y++) {
    for(let x = 1; x < width - 1; x++) {
      
      //if(floor(random(4)) === 0) {

        let oldR = pixels[index(x, y) + 0];
        let oldG = pixels[index(x, y) + 1];
        let oldB = pixels[index(x, y) + 2];
        
        let step = 1;
        let newR = round(step * oldR /255) * floor(255 / step);
        let newG = round(step * oldG /255) * floor(255 / step);
        let newB = round(step * oldB /255) * floor(255 / step);
  
        let errR = oldR - newR;
        let errG = oldG - newG;
        let errB = oldB - newB;
  
        
        //pixel ispezionato
        pixels[index(x, y) + 0] = newR;
        pixels[index(x, y) + 1] = newG;
        pixels[index(x, y) + 2] = newB; 

  
        //pixel destro
        pixels[index(x + 1 , y   ) + 0] = pixels[index(x + 1 , y   ) + 0] + errR * 7/16;
        pixels[index(x + 1 , y   ) + 1] = pixels[index(x + 1 , y   ) + 1] + errG * 7/16;
        pixels[index(x + 1 , y   ) + 2] = pixels[index(x + 1 , y   ) + 2] + errB * 7/16;
        
        //pixel diagonale sinistra
        pixels[index(x - 1 , y + 1) + 0] = pixels[index(x - 1 , y + 1) + 0] + errR * 3/16;
        pixels[index(x - 1 , y + 1) + 1] = pixels[index(x - 1 , y + 1) + 1] + errG * 3/16;
        pixels[index(x - 1 , y + 1) + 2] = pixels[index(x - 1 , y + 1) + 2] + errB * 3/16;
  
        //pixel sotto
        pixels[index(x     , y + 1) + 0] = pixels[index(x     , y + 1) + 0] + errR * 5/16;
        pixels[index(x     , y + 1) + 1] = pixels[index(x     , y + 1) + 1] + errG * 5/16;
        pixels[index(x     , y + 1) + 2] = pixels[index(x     , y + 1) + 2] + errB * 5/16;
  
        //pixel diagonale destra
        pixels[index(x + 1 , y + 1) + 0] = pixels[index(x + 1 , y + 1) + 0] + errR * 1/16;
        pixels[index(x + 1 , y + 1) + 1] = pixels[index(x + 1 , y + 1) + 1] + errG * 1/16;
        pixels[index(x + 1 , y + 1) + 2] = pixels[index(x + 1 , y + 1) + 2] + errB * 1/16;
        
        if(floor(random(20)) === 0) {
          
          pixels[index(x, y) + 0] = 255;
          pixels[index(x, y) + 1] = 255;
          pixels[index(x, y) + 2] = 255;
          
        }
       
        console.log(`
        pixels[${index(x, y)}]: ${[newR, newG, newB]}
        `);
    }

  updatePixels();

  }
}



function index(x,y) {
  return (x + y*width)*4
}




