console.log("main.js is called")


let swatch_set = []
for(let i = 0; i<colArray.length; i++) {
    for (let j = 0; j < colArray[i].length; j++) {
        let temp = new Swatch(300 + 33.33 * j, 33.33 * i, 33.33, 33.33, colArray[i][j],colArray[0][0],colArray[0][0],colArray[0][2])
        swatch_set.push(temp);
    }
}

let G = new Grid(width, height, 25, colArray[2][2], 0.3);
let R = new InteractiveButton(0,0,150,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "Rectangle", colArray[0][2]);
let E = new InteractiveButton(0,50,150,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "Ellipse", colArray[0][2]);
let L = new InteractiveButton(150,0,150,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "Line", colArray[0][2]);
let T = new InteractiveButton(150,50,150,50,colArray[2][7],colArray[1][7], colArray[0][7],colArray[0][2], "Triangle", colArray[0][2]);
let W = new InteractiveButton(600,0,200,50,colArray[2][5],colArray[1][5], colArray[0][5],colArray[0][2], "Clear Canvas", colArray[0][2]);
let U = new InteractiveButton(600,50,100,50,colArray[2][5],colArray[1][5], colArray[0][5],colArray[0][2], "Undo", colArray[0][2]);
let Re = new InteractiveButton(700,50,100,50,colArray[2][5],colArray[1][5], colArray[0][5],colArray[0][2], "Redo", colArray[0][2]);
let buttonSet = [R,E,L,T,W,U,Re];

let C = new ControlObject(canvas);
function animate(){
    ctx.clearRect(0,0, width, height);
    G.update();

    for(let i=0; i<buttonSet.length; i++){
        buttonSet[i].update();
    }

    for(let i = 0; i<swatch_set.length; i++){
        swatch_set[i].update()
    }

    C.update();

    window.requestAnimationFrame(animate);
}
animate();

