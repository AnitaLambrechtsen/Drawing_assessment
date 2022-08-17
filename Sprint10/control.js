/**
 * Control class
 * For monitoring and extending keyboard and mouse operations
 * To calculate parameters of all shapes and guides
 */
class ControlObject extends InteractiveObject{
    constructor() {
        // accessing parent class functions (from InteractiveObject)
        super();
        this.w = 0;
        this.h = 0;
        this.sz = 0;
        this.objectSet = [];
        this.choice = "";
        this.okayDraw = false;
        this.removedSet = [];

    }

    mClick(){
        if(InteractiveButton.selected) {
            // 'choice' becomes the button that the user selected
            let choice = InteractiveButton.selected.text;
            this.choice = choice;
            if (choice === "Clear Canvas"){
                // if the user selects clear canvas, then the object array is cleared
                this.objectSet = [];
            }
            else if (choice === "Undo"){
                // if the user selects undo and then if there are objects in the object array
                if (this.objectSet.length > 0){
                    // push last object in object array to removed array
                    this.removedSet.push(this.objectSet[this.objectSet.length - 1]);
                }
                // remove the last object in the object array
                this.objectSet.pop();
                InteractiveButton.selected = null;
                SecondaryButton.selected = null;

            }
            // same as undo but opposite with objectSet and removedSet
            else if (choice === "Redo"){
                if (this.removedSet.length > 0){
                    this.objectSet.push(this.removedSet[this.removedSet.length - 1]);
                }
                this.removedSet.pop();
                InteractiveButton.selected = null;
                SecondaryButton.selected = null;
            }
        }
    }
    mDown(e) {
        super.mDown(e);
        // if the mouse goes down outside the toolbars, the shape can be drawn
        if (this.yMouse > 100 && this.xMouse > 250){
            this.okayDraw = true;
        }

    }
    mKeyDown(e) {
        super.mKeyDown(e);
        let key = e.code;
        // if the key that is pressed is either shift key
        if (key === "ShiftLeft" || key === "ShiftRight"){
            this.keyDown = true;
        }
    }
    mLeave(e){
        if(this.mouseIsDown) {
            this.mUp(e);
            // if the mouse leaves the canvas, the mouse is no long in the boundary
            this.inBounds = false;
            // the mouse is no longer considered down if outside the canvas
            this.mouseIsDown = false;
        }
    }

    // where the objects are drawn
    mUp(e){
        super.mUp(e);
        // the fill colour for the objects is dependent on what swatch is selected
        let fillColour = Swatch.selectedColour;
        if (this.okayDraw && this.w !== 0 || this.h !== 0 || this.radiusX !== 0 || this.radiusY !== 0) {
            if (this.choice === "Rectangle") {
                if (this.keyDown) {
                    // if shift is held, the rectangle becomes a square
                    // this.sz is dependent on whether w or h is greater
                    let x = this.xMouseStart + this.w / 2 - this.sz / 2;
                    let y = this.yMouseStart + this.h / 2 - this.sz / 2;
                    let temp = new Rectangle(x, y, this.sz, this.sz, fillColour);
                    this.objectSet.push(temp);
                } else {
                    // the rectangle is drawn normally if else
                    let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                    this.objectSet.push(temp);
                }
            } else if (this.choice === "Ellipse") {
                // if circle or ellipse is determined in draw()
                let temp = new Ellipse(this.xC, this.yC, this.radiusX, this.radiusY, this.rotation, this.startAngle,
                    this.endAngle, fillColour);
                this.objectSet.push(temp);
            } else if (this.choice === "Line") {
                // default line (small) secondary button
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 1);
                if (!!SecondaryButton.selected) {
                    let secondChoice = SecondaryButton.selected.text;
                    if (secondChoice === "M") {
                        // medium line width
                        temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 5);
                    } else if (secondChoice === "L") {
                        // large line width
                        temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, fillColour, 10);
                    }
                }
                this.objectSet.push(temp);
            } else if (this.choice === "Triangle") {
                // default triangle (isosceles) secondary button
                let temp = new Triangle((this.xMouseStart + this.xMouse) / 2, this.yMouseStart, this.xMouse, this.yMouse, this.xMouseStart, this.yMouse, fillColour);
                if (!!SecondaryButton.selected) {
                    let secondChoice = SecondaryButton.selected.text;
                    if (secondChoice === "Right-Angle") {
                        // right-angle triangle parameters
                        temp = new Triangle(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, this.xMouseStart, this.yMouse, fillColour);
                    }
                }
                this.objectSet.push(temp);
            } else if (this.choice === "Moon") {
                let size;
                let temp;
                // checking if the width or height is larger
                if (Math.abs(this.w) > Math.abs(this.h)) {
                    size = Math.abs(this.h / 2);
                } else {
                    size = Math.abs(this.w / 2);
                }
                // if drawing from right to left
                if (this.w < 1) {
                    temp = new Crescent(this.xC + (size / 2.2) - (size / 2), this.yC, size, this.xC - (size / 2), this.yC, size, fillColour);
                } else {
                    // drawing from left to right
                    temp = new Crescent(this.xC, this.yC, size, this.xC + (size / 2.2), this.yC, size, fillColour);
                }
                this.objectSet.push(temp);

            } else if (this.choice === "Moving Ball") {
                let midPosition;
                // setting where the ball starts in terms of x
                if (this.xMouseStart < this.xMouse) {
                    midPosition = this.xMouse - (Math.abs(this.w) / 2);
                } else {
                    midPosition = this.xMouse + (Math.abs(this.w) / 2);
                }
                // Math.floor(Math.random() * (250 - 50 + 1) + 50) to randomise the speed with max and min value
                let temp = new MovingBall(midPosition, this.yMouse, Math.abs(this.w) / 2, fillColour, Math.floor(Math.random() * (250 - 50 + 1) + 50), this.h);
                this.objectSet.push(temp);
            } else if (this.choice === "Star") {
                let radius;
                if ((Math.abs(this.w)) < (Math.abs(this.h))) {
                    radius = this.w;
                } else {
                    radius = this.h;
                }
                // default star (4-point) secondary button
                let temp = new Star(this.xC, this.yC, 4, radius / 2, radius / 4, fillColour);
                if (!!SecondaryButton.selected) {
                    let secondChoice = SecondaryButton.selected.text;
                    if (secondChoice === "5") {
                        // 5-point star
                        temp = new Star(this.xC, this.yC, 5, radius / 2, radius / 4, fillColour);
                    } else if (secondChoice === "6") {
                        // 6-point star
                        temp = new Star(this.xC, this.yC, 6, radius / 2, radius / 4, fillColour);
                    } else if (secondChoice === "7") {
                        // 7-point star
                        temp = new Star(this.xC, this.yC, 7, radius / 2, radius / 4, fillColour);
                    } else if (secondChoice === "8") {
                        // 8-point star
                        temp = new Star(this.xC, this.yC, 8, radius / 2, radius / 4, fillColour);
                    }
                }
                this.objectSet.push(temp);
            }
        }
        this.okayDraw = false;

    }

    draw() {
        let x = this.xMouseStart;
        let y = this.yMouseStart;
        let w = this.w;
        let h = this.h;
        // setting default colour, before user has selected swatch colour
        let colour = colArray[0][1];
        let lineW = 1;
        // if rectangle is selected and the shift key is held
        if (this.choice === "Rectangle" && this.keyDown === true ){
            // checking if the w is greater than the height and setting smaller value for w and h
            if (Math.abs(this.w) > Math.abs(this.h) ) {
                this.sz = this.h;
            } else {
                this.sz = this.w;
            }
            let sz = this.sz;
            // draggable guide for square
            this.strokeRect(x,y,w,h, colour);
            this.strokeRect(x+w/2-sz/2,y+h/2-sz/2,sz,sz, colour);
            this.drawLine(x,y,x+w, y+h, colour, lineW);
            this.drawLine(x,y+h,x+w,y, colour, lineW);
        }
        else if (this.choice === "Rectangle" || this.choice === "Triangle" || this.choice === "Moving Ball"){
            // draggable guide for rectangle, triangle and moving ball
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w, y+h, colour, lineW);
            this.drawLine(x,y+h,x+w,y, colour, lineW);
        }
        else if ((this.choice === "Ellipse" && this.keyDown === true) || this.choice === "Moon" || this.choice === "Star"){
            let min_rad;
            // take the lesser of the two values of radiusX or radiusY and set that to be both radius' to make a circle
            if (this.radiusX > this.radiusY) {
                min_rad = this.radiusY;
                this.radiusX = min_rad;
            } else {
                min_rad = this.radiusX;
                this.radiusY = min_rad;
            }
            this.drawStrokeEllipse(x+w/2,y+h/2, this.radiusX,this.radiusY, colour);
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w,y+h, colour, lineW);
            this.drawLine(x,y+h,x+w,y, colour, lineW);
        }
        else if (this.choice === "Ellipse"){
            // ellipse draggable guide
            this.drawStrokeEllipse(x+w/2,y+h/2, this.radiusX,this.radiusY, colour);
            this.strokeRect(x,y,w,h, colour);
            this.drawLine(x,y,x+w,y+h, colour, lineW);
            this.drawLine(x,y+h,x+w,y, colour, lineW);
        }
        else if (this.choice === "Line") {
            if (!!SecondaryButton.selected) {
                let secondChoice = SecondaryButton.selected.text;
                if (secondChoice === "M") {
                    // if medium line selected
                    this.drawLine(x,y,x+w,y+h, colArray[1][1], 5);
                } else if (secondChoice === "L") {
                    this.drawLine(x,y,x+w,y+h, colArray[1][1], 10);
                } else {
                    // if medium line selected
                    this.drawLine(x,y,x+w,y+h, colArray[1][1], lineW);
                }
            } else {
                // default guide
                this.drawLine(x,y,x+w,y+h, colArray[1][1], lineW);
            }
        }
    }

    update(){
        ctx.save();
        ctx.beginPath();
        // shapes will be clipped if they extend into this area (toolbar)
        ctx.rect(250,100,700,500);
        ctx.clip();
        // setting variables used for shape parameters
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        this.radiusX = Math.abs(this.w/2);
        this.radiusY = Math.abs(this.h/2);
        this.xC = this.xMouseStart+this.w/2;
        this.yC = this.yMouseStart+this.h/2;
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = Math.PI*2;
        // loops through and updates object array
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        // if the mouse is down, then shapes can be drawn
        if (this.mouseIsDown) {
            this.draw();
        }
        // ensures that the parts that were clipped are restored
        ctx.restore();

    }


}

// instantiating ControlObject class by calling strokeRect, drawLine, drawStrokeCircle and drawStrokeEllipse functions
ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;
ControlObject.prototype.drawStrokeEllipse = drawStrokeEllipse;