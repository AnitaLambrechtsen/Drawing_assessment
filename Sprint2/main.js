console.log("main.js is called")

let R = new InteractiveButton(0,0,150,50,colArray[1][7],colArray[0][7], colArray[0][7],colArray[0][0], "Rectangle", colArray[0][0]);
let E = new InteractiveButton(0,50,150,50,colArray[1][7],colArray[0][7], colArray[0][7],colArray[0][0], "Ellipse", colArray[0][0]);

let G = new Grid(width, height, 25, colArray[2][2], 0.3);
let C = new ControlObject(canvas);

let buttonSet = [R,E];
function animate(){
    ctx.clearRect(0,0, width, height);
    G.update();
    C.update();
    // M.update();

    for(let i=0; i<buttonSet.length; i++){
         buttonSet[i].update();
     }


    window.requestAnimationFrame(animate);
}
animate();