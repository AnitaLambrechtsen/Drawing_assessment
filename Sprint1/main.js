console.log("main.js is called")

let G = new Grid(width, height, 25, colArray[2][2], 0.3);
let C = new ControlObject(canvas);

function animate(t){
    ctx.clearRect(0,0, width, height);
    G.update();
    C.update();


    window.requestAnimationFrame(animate);
}
animate();