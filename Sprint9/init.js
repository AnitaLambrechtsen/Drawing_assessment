console.log("init.js is called")

let colArray = [
    [
        "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)",
        "rgba(196, 171, 134,1)", "rgba(250,235,215,1)", "rgba(226,185,189,1)",
        "rgba(221,160,221,1)", "rgba(176,196,222,1)", "rgba(164,202,164,1)",
        "rgba(255, 227, 115,1)", "rgba(242, 182, 111,1)", "rgba(201, 123, 134, 1)",
        "rgba(174, 163, 199,1)", "rgba(141, 151, 224,1)", "rgba(181, 251, 255,1)"
    ],
    [
        "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)",
        "rgba(196, 171, 134,0.67)", "rgba(250,235,215,0.67)", "rgba(226,185,189,0.67)",
        "rgba(221,160,221,0.67)", "rgba(176,196,222,0.67)", "rgba(164,202,164,0.67)",
        "rgba(255, 227, 115,0.67)", "rgba(242, 182, 111,0.67)", "rgba(201, 123, 134, 0.67)",
        "rgba(174, 163, 199,0.67)", "rgba(141, 151, 224,0.67)", "rgba(181, 251, 255,0.67)"
    ],
    [
        "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)",
        "rgba(196, 171, 134,0.33)", "rgba(250,235,215,0.33)", "rgba(226,185,189,0.33)",
        "rgba(221,160,221,0.33)", "rgba(176,196,222,0.33)", "rgba(164,202,164,0.33)",
        "rgba(255, 227, 115,0.33)", "rgba(242, 182, 111,0.33)", "rgba(201, 123, 134, 0.33)",
        "rgba(174, 163, 199,0.33)", "rgba(141, 151, 224,0.33)", "rgba(181, 251, 255,0.33)"
    ]
]

canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
// define height and width
let width = 950;
let height = 600;
// define scale of 1
let scale = 2;
// set the canvas width and height
canvas.width = width*scale;
canvas.height = height*scale;
//scale the canvas
ctx.scale(scale, scale);
// get the canvas element
// style here for consistency
let my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = colArray[0][0];
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "6px solid rgba(0,0,0,0.4)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = colArray[2][7];


class Grid{
    constructor(w,h,intervalWidth,strokeColour, strokeWidth) {
        this.w =w;
        this.h =h;
        this.intervalWidth = intervalWidth;
        this.strokeColour = strokeColour;
        this.strokeWidth = strokeWidth;
    }

    draw(){
        for(let i = -this.w; i <= this.w; i+=
            this.intervalWidth){
            this.drawLine(i, -this.h, i,
                this.h, this.strokeColour,
                this.strokeWidth);
        }
        for(let j = -this.h; j <= this.h; j +=
            this.intervalWidth){
            this.drawLine(-this.w,j, this.w,
                j, this.strokeColour,
                this.strokeWidth);
        }
    }
    update(){
        this.draw()
    }
    drawLine(x_1,y_1,x_2,y_2,strokeColour,strokeWidth){
        ctx.beginPath();
        ctx.moveTo(x_1,y_1);
        ctx.lineTo(x_2,y_2);
        ctx.lineCap = "round";
        ctx.strokeStyle = strokeColour;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }

}

class InteractiveObject{
    constructor(){
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        document.addEventListener('keydown', this.mKeyDown.bind(this));
        document.addEventListener('keyup', this.mKeyUp.bind(this));
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
        this.keyDown = false;
    }
    mKeyDown(e){
        //console.log("key down")
        //console.log(e.code + " down");
    }
    mKeyUp(e){
        //console.log("key up")
        //console.log(e.code + " up");
        this.keyDown = false;
    }
    mDown(e){
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseIsDown = true;
        // let output = "This mouse went down at x = " + e.offsetX + "and y = " + e.offsetY;
        // console.log (output)
    }
    mUp(e){
        this.mouseIsDown = false;
        // let output = "This mouse went up at x = " + e.offsetX + "and y = " + e.offsetY;
        //console.log(output)
    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    mLeave(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }

    mClick(e){
        this.mouseIsDown = false;
        //console.log("click");
    }
}



/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} w radius of ball
 * @param {number} h radius of ball
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected button had been clicked colour
 * @param {string} stroke stroke colour
 * @param {string} test button text
 * @param {string} text button text colour
 */

class InteractiveButton extends InteractiveObject{
    constructor(x, y, w, h, fill, over, selected, stroke, text, textColour) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.over = over;
        this.selected = selected;
        this.stroke = stroke;
        this.text = text;
        this.textColour = textColour;
        this.inBounds = false
    }
    update() {
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        let fill = this.fill
        if (InteractiveButton.selected === this) {
            fill = this.selected
            if ( InteractiveButton.parentButton !== this.text ) {
                SecondaryButton.selected = null
            }
            InteractiveButton.parentButton = this.text

        } else if (this.inBounds) {
            fill = this.over
        }
        this.draw(this.x, this.y, this.w, this.h, fill, this.stroke, this.text, this.textColour)
    }
    mClick() {
        if (this.inBounds) {
            InteractiveButton.selected = this;
        }
    }
    getBoundary(x, y, w, h, x_m, y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;

    }
    draw(x, y, w, h, fill, stroke, text, textColour){
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.stroke();
        let myFont = "16px 'Trebuchet MS', Verdana, sans-serif ";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = textColour;
        ctx.fillText(text, x+ w/2, y+h/2);
    }

}
InteractiveButton.selected = null;
InteractiveButton.parentButton = null;


class SecondaryButton extends InteractiveObject{
    constructor(x, y, w, h, fill, over, selected, stroke, text, textColour, parentButton, defaultButton) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.over = over;
        this.selected = selected;
        this.stroke = stroke;
        this.text = text;
        this.textColour = textColour;
        this.inBounds = false
        this.parentButton = parentButton
        this.defaultButton = defaultButton
    }
    update() {
        let fill = this.fill
        if ( InteractiveButton.selected && InteractiveButton.selected.text === this.parentButton ) {
            this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
            if ( this.parentButton === InteractiveButton.parentButton ) {
                if (SecondaryButton.selected === this || (this.defaultButton && SecondaryButton.selected === null )) {
                    fill = this.selected
                } else if (this.inBounds) {
                    fill = this.over
                }
            }
        }
        this.draw(this.x, this.y, this.w, this.h, fill, this.stroke, this.text, this.textColour)
    }


    //     console.log(this.parentButton + ' is parent')
    //     console.log(SecondaryButton.selected + ' is selectedbutton')
    //     this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
    //     let fill = this.fill
    //     if ( InteractiveButton.parentButton === this.parentButton ) {
    //         if (SecondaryButton.selected === this || (this.defaultButton && (SecondaryButton.selected === null || typeof(SecondaryButton.selected) === Object ))) {
    //             fill = this.selected
    //         } else if (this.inBounds) {
    //             fill = this.over
    //         }
    //     }
    //     this.draw(this.x, this.y, this.w, this.h, fill, this.stroke, this.text, this.textColour)
    // }
    mClick() {
        if (this.inBounds) {
            SecondaryButton.selected = this;
        }
    }
    getBoundary(x, y, w, h, x_m, y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;

    }
    draw(x, y, w, h, fill, stroke, text, textColour){
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.stroke();
        let myFont = "16px 'Trebuchet MS', Verdana, sans-serif ";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = textColour;
        ctx.fillText(text, x+ w/2, y+h/2);
    }

}
SecondaryButton.selected = null;


class Swatch extends InteractiveObject{
    constructor(x, y, w, h, fill, over, selected, stroke) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.over = over;
        this.selected = selected;
        this.stroke = stroke;
        this.inBounds = false
    }
    update() {
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        let stroke = this.stroke
        if (Swatch.selected === this) {
            stroke = this.selected
        } else if (this.inBounds) {
            stroke = this.over
        }
        this.draw(this.x, this.y, this.w, this.h, this.fill, stroke, this.text, this.textColour)
    }
    mClick() {

        if (this.inBounds) {
            Swatch.selected = this;
            Swatch.selectedColour = this.fill;
            //console.log(Swatch.selectedColour)
        }
    }
    getBoundary(x, y, w, h, x_m, y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;
    }
    draw(x, y , w, h, fill, stroke){
        // ctx.save();
        // ctx.beginPath();
        // ctx.rect(0,100,800,500);
        // ctx.clip();

        ctx.beginPath()
        ctx.rect(x, y, w, h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.stroke();
    }
}
Swatch.selected = null;
Swatch.selectedColour = colArray[0][2]


class Rectangle{
    constructor(x,y,w,h,fill){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }

    update(){
        this.basicRect(this.x,this.y,this.w,this.h,this.fill)
    }

}
Rectangle.prototype.basicRect = basicRect

class Ellipse{
    constructor(x,y,rx,ry, rotation, startAngle, endAngle, fill){
        this.x = x;
        this.y = y;
        this.rx = rx;
        this.ry = ry;
        this.rotation = rotation;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.fill = fill;
    }
    update(){
        this.basicEllipse(this.x, this.y, this.rx, this.ry, this.rotation, this.startAngle, this.endAngle, this.fill);
    }
}
Ellipse.prototype.basicEllipse = basicEllipse

class Line{
    constructor(x_1,y_1,x_2,y_2,strokeC,strokeW){
        this.x_1 = x_1;
        this.y_1 = y_1;
        this.x_2 = x_2;
        this.y_2 = y_2;
        this.strokeC = strokeC;
        this.strokeW = strokeW;
    }
    update(){
        this.drawLine(this.x_1, this.y_1, this.x_2, this.y_2, this.strokeC, this.strokeW)
    }
}
Line.prototype.drawLine = drawLine;


class Triangle{
    constructor(x1, y1, x2, y2, x3, y3,fill) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.fill = fill;
    }
    update(){
        this.drawTriangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.fill)
    }
}
Triangle.prototype.drawTriangle = drawTriangle


class Circle {
    constructor(x, y, w, h, fill) {
        this.x = x + w / 2;
        this.y = y + h / 2;
        if(Math.abs(w) < Math.abs(h)){
            this.r = Math.abs(w)/2
        }else{
            this.r = Math.abs(h)/2
        }
        this.fill = fill;
    }

    update() {
        this.draw();
    }

    draw() {
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class WordRect {
    constructor(x, y, w, h, fill, stroke, text, textColour) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.stroke = stroke;
        this.text = text;
        this.textColour = textColour;
    }
    update(){
        this.draw(this.x, this.y, this.w, this.h, this.fill, this.stroke, this.text, this.textColour)
    }
    draw(x, y , w, h, fill, stroke, text, textColour){
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.stroke();
        let myFont = "16px 'Trebuchet MS', Verdana, sans-serif ";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = textColour;
        ctx.fillText(text, x+ w/2, y+h/2);
    }
}


/**
 * Ball that moves up down
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 */
/**
 * Ball that moves up down
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 */
class MovingBall{
    constructor(x_b,y_b,r, fillColour, T, H){
        this.x_b = x_b;
        this.y_b = y_b;
        this.r = r;
        this.fillColour = fillColour;
        // animation variables
        console.log('Constructor',(H-y_b)/2)
        this.t = 0;
        this.T = T;
        this.H = H;

    }
    update(){
        // add one to the value of little t each time update is called
        this.t += 1
        this.draw()
        //console.log("update")
    }
    draw(){
        // get y value from the piecewise function
        let y = this.linearinterpolate(this.t, this.T, this.H)
        this.drawCircle(this.x_b,y+this.y_b-this.H, this.r)
    }
    linearinterpolate(t,T,H){
        // takes parameter t, T, H
        // we could hard code in this.T etc. but is more flexible to have parameters
        // make sure t is between 0 and T
        t = t%T; // modulus operator
        // set y variable and use to get value from equations
        let y;
        // console.log(t)
        if(t<T/2){
            y = (-2*H*t)/(T) + H
        }else{
            y = (2*H*t)/(T) - H
        }
        return y
    }
    drawCircle(x,y,r){
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2*Math.PI)
        ctx.fillStyle = this.fillColour
        ctx.fill();
    }


}


// Crescent function found on stackoverflow at:
// https://stackoverflow.com/questions/45329292/how-to-make-a-crescent-moon-shape-in-html-canvas

// generic circle circle intercept function. Returns undefined if
// no intercept.
// Circle 1 is center x1,y1 and radius r1
// Circle 2 is center x2,y2 and radius r2
// If points found returns {x1,y1,x2,y2} as two points.
function circleCircleIntercept(x1,y1,r1,x2,y2,r2){
    let x = x2 - x1;
    let y = y2 - y1;
    let dist = Math.sqrt(x * x + y * y);
    if(dist > r1 + r2 || dist < Math.abs(r1-r2)){
        return;  // no intercept return undefined
    }
    let a = (dist * dist - r1 * r1 + r2 *r2) / ( 2 * dist);
    let b = Math.sqrt(r2 * r2 - a * a);
    a /= dist;
    x *= a;
    y *= a;
    let mx = x2 - x;
    let my = y2 - y;
    dist = b / Math.sqrt(x * x + y * y);
    x *= dist;
    y *= dist;
    return {
        x1 : mx-y,
        y1 : my+x,
        x2 : mx+y,
        y2 : my-x,
    };
}
// draws a crescent from two circles if possible
// If not then just draws the first circle


class Crescent{
    constructor(x1, y1, r1, x2, y2, r2, fill) {
        this.x1 = x1;
        this.y1 = y1;
        this.r1 = r1;
        this.x2 = x2;
        this.y2 = y2;
        this.r2 = r2;
        this.fill = fill;
    }
    update(){
        this.drawCrescent(this.x1, this.y1, this.r1, this.x2, this.y2, this.r2, this.fill)
    }
}
Crescent.prototype.drawCrescent = drawCrescent


function drawCrescent(x1,y1,r1,x2,y2,r2,fill){
    // The circle circle intercept finds points
    // but finding the angle of the points does not consider
    // the rotation direction and you end up having to do a lot of
    // checking (if statments) to determin the correct way to draw each circle
    // the following normalises the direction the circle are from each other
    // thus making the logic a lot easier

    let dist = Math.hypot(x2-x1,y2-y1);
    let ang = Math.atan2(y2-y1,x2-x1);
    let intercepts = circleCircleIntercept(x1,y1,r1,x1 + dist,y1,r2);
    if(intercepts === undefined){
        ctx.beginPath();
        ctx.arc(x1, y1, r1, 0, PI2);
        if(dist < r1){
            ctx.moveTo(x2 + r2, y2);
            ctx.arc(x2, y2, r2, 0, PI2, true);
        }
        ctx.fillStyle = fill;
        ctx.fill();
        //ctx.stroke();
        return;
    }
    // get the start end angles for outer then inner circles
    const p = intercepts;
    let startA1 = Math.atan2(p.y1 - y1, p.x1 - x1) + ang;
    let endA1 = Math.atan2(p.y2 - y1, p.x2 - x1) + ang;
    let startA2 = Math.atan2(p.y1 - y1, p.x1 - (x1 + dist)) + ang;
    let endA2 = Math.atan2(p.y2 - y1, p.x2 - (x1 + dist)) + ang;

    ctx.beginPath();
    if(endA1 < startA1){
        ctx.arc(x1, y1, r1, startA1, endA1);
        ctx.arc(x2, y2, r2, endA2, startA2, true);
    }else{
        ctx.arc(x2, y2, r2, endA2, startA2);
        ctx.arc(x1, y1, r1, startA1, endA1,true);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    //ctx.stroke();
}




function basicRect(x,y,w,h,fill){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fillStyle = fill
    ctx.fill()
}

function basicEllipse(x,y,rx,ry, rotation, startAngle, endAngle, fill){
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rotation, startAngle, endAngle, fill);
    ctx.fill();
}

function strokeRect(x,y,w,h,colour, l=1){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.lineWidth = l;
    ctx.strokeStyle = colour;
    ctx.stroke();
}

function drawLine(x_1,y_1,x_2,y_2,strokeC,strokeW) {
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.stroke();
}

function drawStrokeCircle(x,y,r, strokeC, strokeW = 1){
    ctx.beginPath();
    ctx.arc(x,y, r, 0, 2*Math.PI);
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.stroke();
}

function drawStrokeEllipse(x,y,rx, ry, strokeC, strokeW = 1){
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI*2);
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.stroke();
}

function drawTriangle(x1, y1, x2, y2, x3, y3,fill){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.fillStyle = fill;
    ctx.fill();
}
