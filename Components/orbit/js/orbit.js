container = document.querySelector(".container");
debugDash = document.querySelector(".debug");
objOrbit = document.querySelector(".orbitObj");

let stats = {
    mouseDownX: 0,
    mouseDownY: 0,
    mouseUpX: 0,
    mouseUpY: 0,
    mouseMoveX: 0,
    mouseMoveY: 0,
    transX: 17,
    transY: 20,
    desX: 0,
    desY: 0,

}
applyTranform(objOrbit);
updateStats(stats);

container.onpointerdown = (e) => {
    // console.log(e.x);
    stats.mouseDownX = e.x;
    stats.mouseDownY = e.y;
    updateStats(stats);

    this.onpointermove = (e) => {
        stats.mouseMoveX = e.x;
        stats.mouseMoveY = e.y;
        updateStats(stats);

        desX = stats.mouseMoveX - stats.mouseDownX;
        desY = stats.mouseMoveY - stats.mouseDownY;

        stats.transX += desX * 0.5;
        stats.transY += desY * 0.5;

        applyTranform(objOrbit)

        stats.mouseDownX = stats.mouseMoveX;
        stats.mouseDownY = stats.mouseMoveY;
    }


    this.onpointerup = (e) => {

        stats.mouseUpX = e.x;
        stats.mouseUpY = e.y;

        updateStats(stats);
        this.onpointermove = null;

    }
    return false;
}


function updateStats(obj) {
    debugDash.innerHTML = `
    <p>Mouse Down X cord: ${stats.mouseDownX}</p>
    <p>Mouse Down Y cord: ${stats.mouseDownY}</p>
    <p>Mouse Up   X cord: ${stats.mouseUpX}</p>
    <p>Mouse UP   Y cord: ${stats.mouseUpY}</p>
    <p>Mouse Move X cord: ${stats.mouseMoveX}</p>
    <p>Mouse Move Y cord: ${stats.mouseMoveY}</p>
    <p>Transition X degr: ${stats.transX}</p>
    <p>Transition Y degr: ${stats.transY}</p>
`
}


function applyTranform(obj){
    obj.style.transform = "rotateX(" + (-stats.transY) + "deg) rotateY(" + (stats.transX) + "deg)"
}