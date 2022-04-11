console.log("control.js is called");

class ControlObject extends InteractiveObject{
    constructor(canvas) {
        super();
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
    }
    mUp(e){
        super.mUp(e);
        let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][5]);
        this.objectSet.push(temp);
    }

    update(){
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        if (this.mouseIsDown) {
            console.log("mouse is down");
            this.draw();
        }
    }

    draw(){
        let x = this.xMouseStart;
        let y = this.yMouseStart;
        let w = this.w;
        let h = this.h;
        this.strokeRect(x,y,w,h,colArray[0][2]);
        this.drawLine(x,y,x+w, y+h, colArray[0][2]);
        this.drawLine(x,y+h,x+w,y, colArray[0][2]);
        this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colArray[0][2]);
    }
}

ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;