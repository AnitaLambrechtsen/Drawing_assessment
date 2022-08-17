// 2 dimensional colour array
let colArray = [
    [
        "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)",
        "rgba(196, 171, 134,1)", "rgba(250,235,215,1)", "rgba(226,185,189,1)",
        "rgba(221,160,221,1)", "rgba(176,196,222,1)", "rgba(164,202,164,1)",
        "rgba(255, 227, 115,1)", "rgba(242, 182, 111,1)", "rgba(201, 123, 134, 1)",
        "rgba(174, 163, 199,1)", "rgba(141, 151, 224,1)", "rgba(181, 251, 255,1)"
    ],
    // same colours, with different opacities
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

// defining canvas and context
canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
// define height and width
let width = 950;
let height = 600;
// define scale of 2
let scale = 2;
// setting the canvas width and height
canvas.width = width*scale;
canvas.height = height*scale;
// scaling the canvas
ctx.scale(scale, scale);
// get the canvas element
let my_c = document.getElementById('myCanvas');
// styling canvas
my_c.style.backgroundColor = colArray[0][0];
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "6px solid rgba(0,0,0,0.4)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = colArray[2][7];


/**
 * Background Grid
 * @param {number} w width of grid
 * @param {number} h height of grid
 * @param {number} intervalWidth interval width between lines
 * @param {string} strokeColour stroke colour of lines
 * @param {string} strokeWidth stroke width of lines
 */
class Grid{
    constructor(w,h,intervalWidth,strokeColour, strokeWidth) {
        this.w = w;
        this.h = h;
        this.intervalWidth = intervalWidth;
        this.strokeColour = strokeColour;
        this.strokeWidth = strokeWidth;
    }
    // loop for drawing horizontal and vertical lines based off of w and h
    draw(){
        for(let i = -this.w; i <= this.w; i+= this.intervalWidth){
            this.drawLine(i, -this.h, i, this.h, this.strokeColour, this.strokeWidth);
        }
        for(let j = -this.h; j <= this.h; j += this.intervalWidth){
            this.drawLine(-this.w,j, this.w, j, this.strokeColour, this.strokeWidth);
        }
    }
    // update grid
    update(){
        this.draw()
    }
    // draw function for grid
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

/**
 * Parent class that all child classes inherit from for all shared functions
 */
class InteractiveObject{
    constructor(){
        // adding event listeners for mouse and keyboard operations
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        document.addEventListener('keydown', this.mKeyDown.bind(this));
        document.addEventListener('keyup', this.mKeyUp.bind(this));
        // defining initial values for variables
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
        this.keyDown = false;
    }
    // when a key on a keyboard is down
    mKeyDown(e){
        let key = e.code;
        // checking if a shift key is down
        if (key === "ShiftLeft" || key === "ShiftRight"){
            this.keyDown = true;
        }
    }
    // when a key on a keyboard is up
    mKeyUp(e){
        this.keyDown = false;
    }
    // when the mouse is down
    mDown(e){
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseIsDown = true;
    }
    // when the mouse is up
    mUp(e){
        this.mouseIsDown = false;
    }
    // when the mouse is moving
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    // when the mouse has left the canvas
    mLeave(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    // when the mouse clicks
    mClick(e){
        this.mouseIsDown = false;
    }
}


/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x x position of button
 * @param {number} y y position of button
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected button when selected colour
 * @param {string} stroke stroke colour
 * @param {string} text button text
 * @param {string} textColour button text colour
 * @param {string} altText button alternative text
 */
class InteractiveButton extends InteractiveObject{
    constructor(x, y, w, h, fill, over, selected, stroke, text, textColour, altText) {
        // accessing parent class functions (from InteractiveObject)
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
        this.inBounds = false;
        this.altText = altText;
    }
    update() {
        // defining when the mouse is within the boundaries of the button
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        let fill = this.fill
        // altering the fill colour based on the status of the button
        // when selected:
        if (InteractiveButton.selected === this) {
            fill = this.selected
            // if the parent button is not selected, then the child button cannot be selected
            if (InteractiveButton.parentButton !== this.text) {
                SecondaryButton.selected = null
            }
            InteractiveButton.parentButton = this.text
        // if the mouse is within the button boundaries, but it is not selected
        } else if (this.inBounds) {
            fill = this.over
        }
        // if the button has an alternative text and the shift key is held, the text printed becomes the alt text
        let text
        if (this.keyDown && this.altText){
            text = this.altText
        // else, the text remains the same
        } else {
            text = this.text
        }
        // drawing button with function and variables
        this.draw(this.x, this.y, this.w, this.h, fill, this.stroke, text, this.textColour)
    }
    // the button is selected if the user clicks on the button
    mClick() {
        if (this.inBounds) {
            InteractiveButton.selected = this;
        }
    }
    // getting the boundary of the button
    getBoundary(x, y, w, h, x_m, y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;

    }
    // draw function for box with text
    draw(x, y, w, h, fill, stroke, text, textColour){
        rectText(x, y, w, h, fill, stroke, text, textColour)
    }

}
// defining InteractiveButton.selected and InteractiveButton.parentButton as null
InteractiveButton.selected = null;
InteractiveButton.parentButton = null;


/**
 * Clickable Child Button
 * Includes all functions from interactive object
 * @param {number} x x position of button
 * @param {number} y y position of button
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected button when selected colour
 * @param {string} stroke stroke colour
 * @param {string} text button text
 * @param {string} textColour button text colour
 * @param {string} parentButton text of parent button
 * @param {boolean} defaultButton default button as true
 */
class SecondaryButton extends InteractiveObject{
    constructor(x, y, w, h, fill, over, selected, stroke, text, textColour, parentButton, defaultButton) {
        // accessing parent class functions (from InteractiveObject)
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
        // only select the child button if the parent button is selected and matches the child button's parent text
        if (InteractiveButton.selected && InteractiveButton.selected.text === this.parentButton) {
            // checking if mouse is inside boundary
            this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
            // if a secondary button is selected or select the default id no secondary button is selected
            if (SecondaryButton.selected === this || (this.defaultButton && SecondaryButton.selected === null )) {
                fill = this.selected
            // else if, the mouse is over the button
            } else if (this.inBounds) {
                fill = this.over
            }
        }
        // drawing child button with function and variables
        this.draw(this.x, this.y, this.w, this.h, fill, this.stroke, this.text, this.textColour)
    }
    // the button is selected if the user clicks on the button
    mClick() {
        if (this.inBounds) {
            SecondaryButton.selected = this;
        }
    }
    // get the boundary for the secondary button
    getBoundary(x, y, w, h, x_m, y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;

    }
    // draw function for box with text
    draw(x, y, w, h, fill, stroke, text, textColour){
        rectText(x, y, w, h, fill, stroke, text, textColour)
    }

}
// defining SecondaryButton.selected as null
SecondaryButton.selected = null;


/**
 * Clickable Swatch Button
 * Includes all functions from interactive object
 * @param {number} x x position of swatch
 * @param {number} y y position of swatch
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected swatch when selected colour
 * @param {string} stroke stroke colour
 */
class Swatch extends InteractiveObject{
    constructor(x, y, w, h, fill, over, selected, stroke) {
        // accessing parent class functions (from InteractiveObject)
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
        // checking if mouse is inside boundary
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        let stroke = this.stroke
        // change stroke colour instead of fill colour when selected or over
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
            // the swatch that is selected, becomes the colour that shapes are drawn with
            Swatch.selectedColour = this.fill;
        }
    }
    getBoundary(x, y, w, h, x_m, y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;
    }
    // swatch drawing function
    draw(x, y , w, h, fill, stroke){
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

/**
 * Rectangle
 * @param {number} x x position of rectangle
 * @param {number} y y position of rectangle
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */
class Rectangle{
    constructor(x,y,w,h,fill){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }
    // update basicRect function
    update(){
        this.basicRect(this.x,this.y,this.w,this.h,this.fill)
    }

}
// instantiating Rectangle class by calling the basicRect function
Rectangle.prototype.basicRect = basicRect


/**
 * Ellipse
 * @param {number} x x position of ellipse
 * @param {number} y y position of ellipse
 * @param {number} rx radius x
 * @param {number} ry radius y
 * @param {number} rotation rotation of ellipse
 * @param {number} startAngle starting angle
 * @param {number} endAngle ending angle
 * @param {string} fill fill colour
 */
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
    // update basicEllipse function
    update(){
        this.basicEllipse(this.x, this.y, this.rx, this.ry, this.rotation, this.startAngle, this.endAngle, this.fill);
    }
}
// instantiating Ellipse class by calling the basicEllipse function
Ellipse.prototype.basicEllipse = basicEllipse


/**
 * Line
 * @param {number} x_1 start x position
 * @param {number} y_1 start y position
 * @param {number} x_2 end x position
 * @param {number} y_2 end y position
 * @param {string} strokeC stroke colour of line
 * @param {number} strokeW stroke width
 */
class Line{
    constructor(x_1,y_1,x_2,y_2,strokeC,strokeW){
        this.x_1 = x_1;
        this.y_1 = y_1;
        this.x_2 = x_2;
        this.y_2 = y_2;
        this.strokeC = strokeC;
        this.strokeW = strokeW;
    }
    // update drawLine function
    update(){
        this.drawLine(this.x_1, this.y_1, this.x_2, this.y_2, this.strokeC, this.strokeW)
    }
}
// instantiating Line class by calling the drawLine function
Line.prototype.drawLine = drawLine;


/**
 * Triangle
 * @param {number} x1 start x position
 * @param {number} y1 start y position
 * @param {number} x2 second point x position
 * @param {number} y2 second y position
 * @param {number} x3 third x position
 * @param {number} y3 third y position
 * @param {string} fill fill colour
 */
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
    // update drawTriangle function
    update(){
        this.drawTriangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.fill)
    }
}
// instantiating Triangle class by calling the drawTriangle function
Triangle.prototype.drawTriangle = drawTriangle


/**
 * Rectangle with text
 * @param {number} x x position of rectangle
 * @param {number} y y position of rectangle
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {string} text text
 * @param {string} textColour text colour
 */
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
    // update rectText function
    update(){
        rectText(this.x, this.y, this.w, this.h, this.fill, this.stroke, this.text, this.textColour)
    }
}


/**
 * Ball that moves up and down
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} r radius
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
        this.t = 0;
        this.T = T;
        this.H = H;

    }
    update(){
        // add one to the value of little t each time update is called
        this.t += 1
        this.draw()
    }
    draw(){
        // get y value from the piecewise function
        let y = this.linearinterpolate(this.t, this.T, this.H)
        this.drawCircle(this.x_b,y+this.y_b-this.H, this.r)
    }
    linearinterpolate(t,T,H){
        // make sure t is between 0 and T
        t = t%T; // modulus operator
        // set y variable and use to get value from equations
        let y;
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


/**
 * Crescent moon
 * @param {number} x1 x position for circle 1
 * @param {number} y1 y position for circle 1
 * @param {number} r1 radius for circle 1
 * @param {number} x2 x position for circle 2
 * @param {number} y2 y position for circle 2
 * @param {number} r2 radius for circle 2
 * @param {string} fillColour fill colour
 */
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


/**
 * Star
 * @param {number} cx x centre position for star
 * @param {number} cy y centre position for star
 * @param {number} spikes number of star spikes
 * @param {number} outerRadius outer radius of star spikes
 * @param {number} innerRadius inner radius of star
 * @param {string} fill fill colour
 */
class Star{
    constructor(cx, cy, spikes, outerRadius, innerRadius, fill) {
        this.cx = cx;
        this.cy = cy;
        this.spikes = spikes;
        this.outerRadius = outerRadius;
        this.innerRadius = innerRadius;
        this.fill = fill;
    }
    update(){
        this.drawStar(this.cx, this.cy, this.spikes, this.outerRadius, this.innerRadius, this.fill)
    }
}
Star.prototype.drawStar = drawStar


// Crescent function found on stackoverflow at:
// https://stackoverflow.com/questions/45329292/how-to-make-a-crescent-moon-shape-in-html-canvas
// Draws a crescent from two circles if possible
// If not, then just draws the first circle
/**
 * Crescent moon calculate intercept function
 * Returns undefined if no intercept.
 * @param {number} x1 x position for circle 1
 * @param {number} y1 y position for circle 1
 * @param {number} r1 radius for circle 1
 * @param {number} x2 x position for circle 2
 * @param {number} y2 y position for circle 2
 * @param {number} r2 radius for circle 2
 */
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


/**
 * Crescent moon draw function
 * @param {number} x1 x position for circle 1
 * @param {number} y1 y position for circle 1
 * @param {number} r1 radius for circle 1
 * @param {number} x2 x position for circle 2
 * @param {number} y2 y position for circle 2
 * @param {number} r2 radius for circle 2
 * @param {string} fill fill colour
 */
function drawCrescent(x1,y1,r1,x2,y2,r2,fill){
    // The circle-circle intercept finds points
    // but finding the angle of the points does not consider
    // the rotation direction, and you end up having to do a lot of
    // checking (if statements) to determine the correct way to draw each circle
    // the following normalises the direction the circle are from each other
    // thus making the logic a lot easier
    let dist = Math.hypot(x2-x1,y2-y1);
    let ang = Math.atan2(y2-y1,x2-x1);
    let intercepts = circleCircleIntercept(x1,y1,r1,x1 + dist,y1,r2);
    if(intercepts === undefined){
        ctx.beginPath();
        ctx.arc(x1, y1, r1, 0, Math.PI*2);
        if(dist < r1){
            ctx.moveTo(x2 + r2, y2);
            ctx.arc(x2, y2, r2, 0, Math.PI*2, true);
        }
        ctx.fillStyle = fill;
        ctx.fill();
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
}


// Star function found on stackoverflow at:
// https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
/**
 * Draw Star function
 * @param {number} cx x centre position for star
 * @param {number} cy y centre position for star
 * @param {number} spikes number of star spikes
 * @param {number} outerRadius outer radius of star spikes
 * @param {number} innerRadius inner radius of star
 * @param {string} fill fill colour
 */
function drawStar(cx, cy, spikes, outerRadius, innerRadius, fill) {
    // regular polygon with alternating points on an inner and an outer radius
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    let i;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        // repeating but * innerRadius instead
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.fillStyle= fill;
    ctx.fill();
}

/**
 * Draw Basic Rectangle function
 * @param {number} x x start position
 * @param {number} y y start position
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */
function basicRect(x,y,w,h,fill){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fillStyle = fill
    ctx.fill()
}


/**
 * Draw Ellipse function
 * @param {number} x x position of ellipse
 * @param {number} y y position of ellipse
 * @param {number} rx radius x
 * @param {number} ry radius y
 * @param {number} rotation rotation of ellipse
 * @param {number} startAngle starting angle
 * @param {number} endAngle ending angle
 * @param {string} fill fill colour
 */
function basicEllipse(x,y,rx,ry, rotation, startAngle, endAngle, fill){
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rotation, startAngle, endAngle);
    ctx.fill();
}


/**
 * Draw Triangle function
 * @param {number} x1 start x position
 * @param {number} y1 start y position
 * @param {number} x2 second point x position
 * @param {number} y2 second y position
 * @param {number} x3 third x position
 * @param {number} y3 third y position
 * @param {string} fill fill colour
 */
function drawTriangle(x1, y1, x2, y2, x3, y3,fill){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.fillStyle = fill;
    ctx.fill();
}


/**
 * Draw Line function
 * @param {number} x_1 start x position
 * @param {number} y_1 start y position
 * @param {number} x_2 end x position
 * @param {number} y_2 end y position
 * @param {string} strokeC stroke colour of line
 * @param {number} strokeW stroke width
 */
function drawLine(x_1,y_1,x_2,y_2,strokeC,strokeW) {
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.stroke();
}


/**
 * Draw Rectangle with text function
 * @param {number} x x position of rectangle
 * @param {number} y y position of rectangle
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {string} text text
 * @param {string} textColour text colour
 */
function rectText(x, y, w, h, fill, stroke, text, textColour){
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


function strokeRect(x,y,w,h,colour, l=1){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.lineWidth = l;
    ctx.strokeStyle = colour;
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