class Clock {
    constructor(centerX, centerY,smallRayLen, bigRayLen, initialTime, color) {
        this.center = {
            x: centerX,
            y: centerY
        }
        this.smallRayLen = smallRayLen; //misura i secondi
        this.bigRayLen = bigRayLen; //misura i minuti
        this.initialTime = initialTime%3600; //lo immagino misurato in sec
        this.actualTime = initialTime%3600;
        this.bigRayAngle = Math.floor((initialTime/60)) * 6; //misurato in gradi
        this.littleRayAngle = (initialTime % 60) * 6; //misurato in gradi
        this.color = color;
        
    }

    update() {
        this.actualTime = this.initialTime + Math.floor((2*millis()/1000));
        //this.actualTime = this.initialTime + 50*(millis()/1000); //versione continua
        this.bigRayAngle = (Math.floor((this.actualTime/60) % 3600)) * 6; 
        //this.bigRayAngle = (this.actualTime/60) % 3600 * 6; //versione continua
        this.littleRayAngle = (this.actualTime % 60) * 6;
        console.log(`
        actualTime: ${this.actualTime},
        bigRayAngle: ${this.bigRayAngle},
        littleRayAngle: ${this.littleRayAngle},

        `)
    }

    show() {
        strokeWeight(3)
        //raggio secondi
        stroke(color(this.color));
        line(this.center.x, this.center.y, this.center.x + this.smallRayLen*cos(this.littleRayAngle), this.center.y + this.smallRayLen*sin(this.littleRayAngle));
        //raggio minuti        
        line(this.center.x, this.center.y, this.center.x + this.bigRayLen*cos(this.bigRayAngle), this.center.y + this.bigRayLen*sin(this.bigRayAngle));
    }
}