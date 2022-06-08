console.log("control.js is called");

class ControlObject extends InteractiveObject{
    constructor(canvas) {
        super();
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
        this.choice = "";
        this.okayDraw = false
        this.removedSet = [];
    }
    mClick(){
        if(InteractiveButton.selected) {
            let choice = InteractiveButton.selected.text;
            console.log(choice+" selected")
            this.choice = choice
            if (choice === "Clear Canvas"){
                // console.log('Canvas Cleared')
                this.objectSet = []
            }
            else if (choice === "Undo"){
                if (this.objectSet.length > 0){
                    this.removedSet.push(this.objectSet[this.objectSet.length - 1])
                }
                //console.log(this.objectSet)
                this.objectSet.pop()
                //InteractiveButton.select = ""
            }
            else if (choice === "Redo"){
                if (this.removedSet.length > 0){
                    this.objectSet.push(this.removedSet[this.removedSet.length - 1])
                }
                console.log(this.objectSet)
                this.removedSet.pop()
            }
        }
    }

    mDown(e) {
        super.mDown(e);
        if (this.yMouse > 100){
            this.okayDraw = true
        }

    }

    mUp(e){
        super.mUp(e);
        let fillColour = Swatch.selectedColour
        //console.log('Mouse Up ' + this.choice)
        if (this.okayDraw) {
            if (this.choice === "Rectangle") {
                let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour)
                this.objectSet.push(temp)
                //console.log("rectangle complete")
            } else if (this.choice === "Ellipse") {
                let temp = new Ellipse(this.xC, this.yC, this.radiusX, this.radiusY, this.rotation, this.startAngle,
                    this.endAngle, fillColour)
                this.objectSet.push(temp)
                //console.log("ellipse complete")
            } else if (this.choice === "Line") {
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour)
                this.objectSet.push(temp)
                // console.log("line is completed")
            } else if (this.choice === "Triangle") {
                let temp = new Triangle(this.xMouseStart + this.w / 2, this.yMouseStart, this.xMouse, this.yMouse, this.xMouseStart, this.y3, fillColour)
                this.objectSet.push(temp)
                //console.log("triangle is completed")
            }
        }
        this.okayDraw = false

    }

    update(){
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        this.radiusX = Math.abs(this.w/2);
        this.radiusY = Math.abs(this.h/2);
        this.xC = this.xMouseStart+this.w/2;
        this.yC = this.yMouseStart+this.h/2;
        //this.x3 = this.xMouseStart+this.h;
        this.y3 = this.yMouseStart+this.h;
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = Math.PI*2;
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        if (this.mouseIsDown) {
            console.log("mouse is down");
            this.draw();
        }

    }

    draw() {
        let x = this.xMouseStart
        let y = this.yMouseStart
        let w = this.w
        let h = this.h
        let colour = colArray[0][1];
        if (this.choice === "Rectangle"){
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w, y+h, colour);
            this.drawLine(x,y+h,x+w,y, colour);
            this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colour);
        }
        else if (this.choice === "Ellipse"){
            this.drawStrokeEllipse(x+w/2,y+h/2, this.radiusX,this.radiusY, colour);
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w,y+h, colour)
            this.drawLine(x,y+h,x+w,y, colour)
        }
        else if (this.choice === "Line"){
            //this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w, y+h, colour);
        }
        else if (this.choice === "Triangle"){
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w, y+h, colour);
            this.drawLine(x,y+h,x+w,y, colour);
            this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colour);
        }
    }


}

ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;
ControlObject.prototype.drawStrokeEllipse = drawStrokeEllipse;