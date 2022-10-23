w = Math.max(window.innerWidth, 500);
h = window.innerWidth;
amp = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, ];
freq = [];


let osc = [];
let playing = [false, false, false, false, false, false, false, false, false, false, false, false, false];

function setup() {

  let cnv = createCanvas(1, 1);
  cnv.parent("sketch");
  for(let i = 0; i <= 12; i++) {
    osc[i] = new p5.Oscillator('sine');
  }
}


function draw() {

  for(let i = 0; i <=12; i++) {
    freq[i] = document.getElementById(`${i}`).value;
    osc[i].freq(parseFloat(freq[i]));
    osc[i].amp(0, 0.1);
    
    if (playing[i]) {
      osc[i].amp(amp[i], 0.1);
    }
  }
  
}

function keyPressed() {
  //a
  if (keyCode === 65) {
    playing[0] = true;
  } 
  //w
  if (keyCode === 87) {
    playing[1] = true;
  }
  //s
  if (keyCode === 83) {
    playing[2] = true;
  }
  //e
  if (keyCode === 69) {
    playing[3] = true;
  }
  //d
  if (keyCode === 68) {
    playing[4] = true;
  }
  //f
  if (keyCode === 70) {
    playing[5] = true;
  }
  //t
  if (keyCode === 84) {
    playing[6] = true;
  }
  //g
  if (keyCode === 71) {
    playing[7] = true;
  }
  //y
  if (keyCode === 89) {
    playing[8] = true;
  }
  //h
  if (keyCode === 72) {
    playing[9] = true;
  }
  //u
  if (keyCode === 85) {
    playing[10] = true;
  }
  //j
  if (keyCode === 74) {
    playing[11] = true;
  }
  //k
  if (keyCode === 75) {
    playing[12] = true;
  }  
}

function keyReleased() {

  //a
  if (keyCode === 65) {
    osc[0].amp(0, 0.1);
    playing[0] = false;
  } 
  //w
  if (keyCode === 87) {
    osc[1].amp(0, 0.1);
    playing[1] = false;
  }
  //s
  if (keyCode === 83) {
    osc[2].amp(0, 0.1);
    playing[2] = false;
  }
  //e
  if (keyCode === 69) {
    osc[3].amp(0, 0.1);
    playing[3] = false;
  }
  //d
  if (keyCode === 68) {
    osc[4].amp(0, 0.1);
    playing[4] = false;
  }
  //f
  if (keyCode === 70) {
    osc[5].amp(0, 0.1);
    playing[5] = false;    
  }
  //t
  if (keyCode === 84) {
    osc[6].amp(0, 0.1);
    playing[6] = false;    
  }
  //g
  if (keyCode === 71) {
    osc[7].amp(0, 0.1);
    playing[7] = false;    
  }
  //y
  if (keyCode === 89) {
    osc[8].amp(0, 0.1);
    playing[8] = false;    
  }
  //h
  if (keyCode === 72) {
    osc[9].amp(0, 0.1);
    playing[9] = false;    
  }
  //u
  if (keyCode === 85) {
    osc[10].amp(0, 0.1);
    playing[10] = false;
  }
  //j
  if (keyCode === 74) {
    osc[11].amp(0, 0.1);
    playing[11] = false;
  }
  //k
  if (keyCode === 75) {
    osc[12].amp(0, 0.1);
    playing[12] = false;
  }  


}

function startOscillators() {
  for(let i = 0; i <= 12; i++) {
    osc[i].start();
  }
}
