console.log("init.js is called")

let colArray = [
    [
        "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)",
        "rgba(196, 171, 134,1)", "rgba(250,235,215,1)", "rgba(226,185,189,1)",
        "rgba(221,160,221,1)", "rgba(176,196,222,1)", "rgba(164,202,164,1)",
    ],
    [
        "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)",
        "rgba(196, 171, 134,0.67)", "rgba(250,235,215,0.67)", "rgba(226,185,189,0.67)",
        "rgba(221,160,221,0.67)", "rgba(176,196,222,0.67)", "rgba(164,202,164,0.67)",
    ],
    [
        "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)",
        "rgba(196, 171, 134,0.33)", "rgba(250,235,215,0.33)", "rgba(226,185,189,0.33)",
        "rgba(221,160,221,0.33)", "rgba(176,196,222,0.33)", "rgba(164,202,164,0.33)",
    ]
]

class Grid{
    constructor(w,h,intervalWidth,strokeColour, strokeWidth) {
        this.w =w;
        this.h =h;
        this.intervalWidth = intervalWidth;
        this.strokeColour = strokeColour;
        this.strokeWidth = strokeWidth;
    }
    update(){
        this.draw()
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

canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

// define height and width
let width = 800;
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

class InteractiveObject{
    constructor(){
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mDown(e){
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseIsDown = true;
        let output = "This mouse went down at x = " + e.offsetX + "and y = " + e.offsetY;
        console.log (output)
    }
    mUp(e){
        this.mouseIsDown = false;
        let output = "This mouse went up at x = " + e.offsetX + "and y = " + e.offsetY;
        console.log(output)
    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log("moving")
    }
    mLeave(e){
        console.log("Mouse has left the canvas")
    }

    mClick(e){
        console.log("click");
    }
}

class Rectangle{
    constructor(x,y,w,h,fill){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }

    update(){
        this.draw();
    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }

}

function strokeRect(x,y,w,h,colour = "rgb(255,255,255,200",
                    l=1){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.lineWidth = l;
    ctx.strokeStyle = colour;
    ctx.stroke();
}


function drawLine(x_1,y_1,x_2,y_2,strokeColour,strokeWidth=1,ct =ctx){
    ct.beginPath();
    ct.moveTo(x_1,y_1);
    ct.lineTo(x_2,y_2);
    ct.lineCap = "round";
    ct.strokeStyle = strokeColour;
    ct.lineWidth = strokeWidth;
    ct.stroke();
}

function drawStrokeCircle(x,y,r, strokeC, strokeW = 1){

    ctx.beginPath();
    ctx.arc(x,y, r, 0, 2*Math.PI);
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.stroke();
}