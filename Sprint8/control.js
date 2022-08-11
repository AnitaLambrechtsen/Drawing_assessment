console.log("control.js is called");

class ControlObject extends InteractiveObject{
    constructor(canvas) {
        super();
        this.w = 0;
        this.h = 0;
        this.sz = 0;
        this.objectSet = [];
        this.choice = "";
        this.okayDraw = false
        this.removedSet = [];

    }

    mClick(){
        if(InteractiveButton.selected) {
            let choice = InteractiveButton.selected.text;
            //console.log(choice+" selected")
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
                InteractiveButton.selected = null
                SecondaryButton.selected = null
                //choice = null;

            }
            else if (choice === "Redo"){
                if (this.removedSet.length > 0){
                    this.objectSet.push(this.removedSet[this.removedSet.length - 1])
                }
                //console.log(this.objectSet)
                this.removedSet.pop()
                InteractiveButton.selected = null
                SecondaryButton.selected = null
            }
        }
    }
    mDown(e) {
        super.mDown(e);
        if (this.yMouse > 100 && this.xMouse > 250){
            this.okayDraw = true
        }

    }
    mKeyDown(e) {
        super.mKeyDown(e)
        // let fillColour = Swatch.selectedColour
        let key = e.code;
        if (key === "ShiftLeft" || key === "ShiftRight"){
            this.keyDown = true;
            // if (this.choice === "Ellipse"){
            //     let temp = new Circle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour)
            //     this.objectSet.push(temp)
            // }
        }
    }
    mKeyUp(e) {
        super.mKeyUp(e);

    }
    mLeave(e){
        if(this.mouseIsDown) {
            this.mUp(e)
            this.inBounds = false
            this.mouseIsDown = false
        }
    }


    mUp(e){
        super.mUp(e);
        let fillColour = Swatch.selectedColour
        // console.log('Mouse Up ' + this.choice)
        if (this.okayDraw) {
            if (this.choice === "Rectangle") {
                if(this.keyDown){
                    //this.strokeRect(x+w/2-sz/2,y+h/2-sz/2,sz,sz, colour)
                    let x = this.xMouseStart + this.w/2-this.sz/2;
                    let y = this.yMouseStart + this.h/2-this.sz/2;
                    let temp = new Rectangle(x, y, this.sz, this.sz, fillColour)
                    this.objectSet.push(temp)


                }
                else {
                    let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour)
                    this.objectSet.push(temp)
                }
                //console.log("rectangle complete")
            } else if (this.choice === "Ellipse") {

                let temp = new Ellipse(this.xC, this.yC, this.radiusX, this.radiusY, this.rotation, this.startAngle,
                    this.endAngle, fillColour)
                this.objectSet.push(temp)
                //console.log("ellipse complete")
            }
            else if (this.choice === "Line") {
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 1)
                if (!!SecondaryButton.selected) {
                    let secondChoice = SecondaryButton.selected.text
                    if (secondChoice === "M"){
                        temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 5)
                    }
                    else if (secondChoice === "L") {
                        temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 10)
                    }
                }
                this.objectSet.push(temp)
            } else if (this.choice === "Triangle") {
                let temp = new Triangle((this.xMouseStart + this.xMouse) / 2, this.yMouseStart, this.xMouse, this.yMouse, this.xMouseStart, this.yMouse, fillColour)
                if (!!SecondaryButton.selected) {
                    let secondChoice = SecondaryButton.selected.text
                    if (secondChoice === "Right-Angle") {
                        temp = new Triangle(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, this.xMouseStart, this.yMouse, fillColour)
                    }
                }
                this.objectSet.push(temp)
            }
        else if (this.choice === "Moon") {
                let size;
                let temp;
                if (Math.abs(this.w) > Math.abs(this.h) ) {
                    size = Math.abs(this.h/2)
                } else {
                    size = Math.abs(this.w/2)
                }
                if (this.w < 1 ){
                    temp = new Crescent(this.xC+(size/2.2)-(size/2), this.yC,size,this.xC-(size/2), this.yC, size, fillColour)
                } else {
                    temp = new Crescent(this.xC, this.yC, size,this.xC+(size/2.2), this.yC,size, fillColour)
                }
                this.objectSet.push(temp)

            }
        }
        this.okayDraw = false

    }

    draw() {
        let x = this.xMouseStart
        let y = this.yMouseStart
        let w = this.w
        let h = this.h
        let colour = colArray[0][1];
        let lineW = 1;
        if (this.choice === "Rectangle" && this.keyDown === true ){

            if (Math.abs(this.w) > Math.abs(this.h) ) {
                this.sz = this.h
                //this.w = this.h
            } else {
                this.sz = this.w
                //this.h = this.w

            }
            let sz = this.sz
            this.strokeRect(x,y,w,h, colour);
            this.strokeRect(x+w/2-sz/2,y+h/2-sz/2,sz,sz, colour);
            this.drawLine(x,y,x+w, y+h, colour, lineW);
            this.drawLine(x,y+h,x+w,y, colour, lineW);
            //this.drawLine(x,y,x+sz, y+sz, colour);
            //this.drawLine(x,y+sz,x+sz,y, colour);
            //this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colour);

        }
        else if (this.choice === "Rectangle" ){
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w, y+h, colour, lineW);
            this.drawLine(x,y+h,x+w,y, colour, lineW);
            //this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colour);
        }
        else if (this.choice === "Ellipse" && this.keyDown === true){
            let min_rad
            if (this.radiusX > this.radiusY) {
                //this.radiusX = this.radiusY
                min_rad = this.radiusY
                this.radiusX = min_rad
            } else {
                min_rad = this.radiusX
                this.radiusY = min_rad
                //this.radiusY = this.radiusX
            }
            this.drawStrokeEllipse(x+w/2,y+h/2, this.radiusX,this.radiusY, colour);
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w,y+h, colour, lineW)
            this.drawLine(x,y+h,x+w,y, colour, lineW)
        }
        else if (this.choice === "Ellipse"){
            this.drawStrokeEllipse(x+w/2,y+h/2, this.radiusX,this.radiusY, colour);
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w,y+h, colour, lineW)
            this.drawLine(x,y+h,x+w,y, colour, lineW)
        }
        else if (this.choice === "Line") {
            //this.strokeRect(x,y,w,h, colour);
            // this.drawLine(x, y, x + w, y + h, colour, lineW);
            if (!!SecondaryButton.selected) {
                let secondChoice = SecondaryButton.selected.text
                if (secondChoice === "M") {
                    this.drawLine(x, y, x + w, y + h, colArray[1][1], 5)
                } else if (secondChoice === "L") {
                    this.drawLine(x, y, x + w, y + h, colArray[1][1], 10)
                } else {
                    this.drawLine(x, y, x + w, y + h, colour, lineW);
                }
            } else {
                this.drawLine(x, y, x + w, y + h, colour, lineW);
            }
        }
        else if (this.choice === "Moon"){
            let min_rad
            if (this.radiusX > this.radiusY) {
                min_rad = this.radiusY
                this.radiusX = min_rad
            } else {
                min_rad = this.radiusX
                this.radiusY = min_rad
            }
            this.drawStrokeEllipse(x+w/2,y+h/2, this.radiusX,this.radiusY, colour);
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w,y+h, colour, lineW)
            this.drawLine(x,y+h,x+w,y, colour, lineW)
            //this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colour);
        }


            //     let temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 1)
            //     if (!!SecondaryButton.selected) {
            //         let secondChoice = SecondaryButton.selected.text
            //         if (secondChoice === "M"){
            //             temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 5)
            //         }
            //         else if (secondChoice === "L") {
            //             temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 10)
            //         }
            //     }
            //     this.objectSet.push(temp)
        // }

        else if (this.choice === "Triangle"){
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w,y+h, colour, lineW)
            this.drawLine(x,y+h,x+w,y, colour, lineW)
            this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colour);
        }
        else if (this.choice === "Circle") {
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w,y+h, colour, lineW)
            this.drawLine(x,y+h,x+w,y, colour, lineW)
            this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/30), colour);
        }
    }

    update(){
        ctx.save();
        ctx.beginPath();
        ctx.rect(250,100,700,500);
        ctx.clip();
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
            //console.log("mouse is down");
            this.draw();
        }
        ctx.restore();

    }


}

ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;
ControlObject.prototype.drawStrokeEllipse = drawStrokeEllipse;