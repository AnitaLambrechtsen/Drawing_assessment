// looping through colArray and printing as a swatch
let swatch_set = [];
for(let i = 0; i<colArray.length; i++) {
    for (let j = 0; j < colArray[i].length; j++) {
        let temp = new Swatch(250 + 33.33 * j, 33.33 * i, 33.33, 33.33, colArray[i][j],colArray[0][0],colArray[0][0],colArray[0][2]);
        swatch_set.push(temp);
    }
}

// grid
let G = new Grid(width, height, 25, colArray[2][2], 0.3);
// sidebar rectangle
let S = new Rectangle(0,0,250,600,"rgb(240, 250, 250)");
// rectangle with text instructions
let M = new WordRect(25,25,200,25,colArray[2][7],colArray[0][2], "Hold shift for options", colArray[0][2]);
// buttons
let R = new InteractiveButton(25,50,100,50,colArray[2][13],colArray[1][13], colArray[0][13],colArray[0][2], "Rectangle", colArray[0][2], "Square");
let E = new InteractiveButton(125,50,100,50,colArray[2][13],colArray[1][13], colArray[0][13],colArray[0][2], "Ellipse", colArray[0][2], "Circle");
let L = new InteractiveButton(25,125,200,25,colArray[2][13],colArray[1][13], colArray[0][13],colArray[0][2], "Line", colArray[0][2]);
let Sm = new SecondaryButton(25,150,66.67,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "S", colArray[0][2],"Line", true);
let Me = new SecondaryButton(91.67,150,66.67,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "M", colArray[0][2],"Line", false);
let La = new SecondaryButton(158.34,150,66.67,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "L", colArray[0][2],"Line", false);
let T = new InteractiveButton(25,225,200,25,colArray[2][13],colArray[1][13], colArray[0][13],colArray[0][2], "Triangle", colArray[0][2]);
let I = new SecondaryButton(25,250,100,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "Isosceles", colArray[0][2], "Triangle",true);
let A = new SecondaryButton(125,250,100,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "Right-Angle", colArray[0][2], "Triangle",false);
let Idk = new InteractiveButton(25,325,100,50,colArray[2][13],colArray[1][13], colArray[0][13],colArray[0][2], "Moon", colArray[0][2]);
let Ball = new InteractiveButton(125,325,100,50,colArray[2][13],colArray[1][13], colArray[0][13],colArray[0][2], "Moving Ball", colArray[0][2]);
let St = new InteractiveButton(25,400,200,25,colArray[2][13],colArray[1][13], colArray[0][13],colArray[0][2], "Star", colArray[0][2]);
let S4 = new SecondaryButton(25,425,40,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "4", colArray[0][2], "Star", true);
let S5 = new SecondaryButton(65,425,40,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "5", colArray[0][2], "Star", false);
let S6 = new SecondaryButton(105,425,40,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "6", colArray[0][2], "Star", false);
let S7 = new SecondaryButton(145,425,40,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "7", colArray[0][2], "Star", false);
let S8 = new SecondaryButton(185,425,40,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "8", colArray[0][2], "Star", false);
let W = new InteractiveButton(850,0,100,100,"rgba(255,100,100,0.60)","rgba(255,100,100,0.80)", "rgba(255,100,100,1)",colArray[0][2], "Clear Canvas", colArray[0][2]);
let U = new InteractiveButton(750,0,100,50,colArray[2][5],colArray[1][5], colArray[0][5],colArray[0][2], "Undo", colArray[0][2]);
let Re = new InteractiveButton(750,50,100,50,colArray[2][8],colArray[1][8], colArray[0][8],colArray[0][2], "Redo", colArray[0][2]);
let buttonSet = [R,E,L,T,W,U,Re,I,A,Sm,Me,La,Idk,Ball,St,S4,S5,S6,S7,S8];

// ControlObject class
let C = new ControlObject(canvas);
function animate(){

    ctx.clearRect(0,0, width, height);
    G.update();
    S.update();
    M.update();

    for(let i=0; i<buttonSet.length; i++){
        buttonSet[i].update();
    }

    for(let i = 0; i<swatch_set.length; i++){
        swatch_set[i].update();
    }
    C.update();

    window.requestAnimationFrame(animate);
}
animate();

