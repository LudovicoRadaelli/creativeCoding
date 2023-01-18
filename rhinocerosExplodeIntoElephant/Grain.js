//DEFINIZIONE CLASSE GRAIN
class Grain {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.mass = 1;

      this.maxSpeed = 0.50;
      this.maxForce = 0.25;
  
      //this.wind = createVector(0.1 + pow((width - x) * random(-0.05, 0.05), 3), random(-0.05, 0.05));
      this.wind = createVector(random(-0.1,0.1),  random(-0.1, 0.1));
    }
  
    show() {
      rect(this.pos.x, this.pos.y, 0.1 , 0.1)
    }    

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0); 

      this.maxSpeed = min(5, 300/frameCount)
    }
  
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acc.add(f);
    }
  
    /* attractionBy(grain) {
      let f = p5.Vector.sub(grain.pos, this.pos);
      let distanceSq = constrain(f.magSq(), 100, 1000);
      let G = 1;
      let strength = G * (this.mass * grain.mass) * 0.00001* distanceSq;
      f.setMag(strength);
  
      return f
    } */

    attractionBy(grain) {
      let force = p5.Vector.sub(grain.pos, this.pos);
      force.setMag(this.maxSpeed);
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.applyForce(force);
      return force
    }
    
  }