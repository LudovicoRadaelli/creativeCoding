//DEFINIZIONE CLASSE GRAIN
class Grain {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.mass = width - x;
  
      this.wind = createVector(0.1 + pow((width - x) * random(-0.05, 0.05), 3), random(-0.05, 0.05));
      //this.wind = createVector(random(-2,2),  random(-0.5, 0,5));
      
    }
  
    show() {
      rect(this.pos.x, this.pos.y, 0.1 , 0.1)
    }
  
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0); 
    }
  
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acc.add(f);
    }
  }