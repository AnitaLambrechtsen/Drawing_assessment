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
        let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[1][6]);
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
        let colour = colArray[0][1];
        this.strokeRect(x,y,w,h, colour);
        this.drawLine(x,y,x+w, y+h, colour);
        this.drawLine(x,y+h,x+w,y, colour);
        this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colour);
    }
}

ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;