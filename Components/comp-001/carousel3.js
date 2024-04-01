

effect1(".carousel3", 100);


function effect1(elementSelector, density){
let colorEffect = document.querySelector(elementSelector)
let rotatePlane = document.createElement("div")
colorEffect.appendChild(rotatePlane)



for (let i = 0; i < density; i++) {
    const li = document.createElement('li');
    const div = document.createElement('div');

    li.appendChild(div);
    rotatePlane.appendChild(li);
}

let allItems = Array.from(rotatePlane.children)

console.log(allItems);

allItems.forEach((element, index) => {
    let max = 1000;
    let min = 20;
    let radius = (Math.floor(Math.random() * max) - min) + min
    let randomRotation = (Math.floor(Math.random() * 360) - 1) + 1
    let colors = ["#f00909", "#59e00b", "#9c0be0"]
    let randomNum = (Math.floor(Math.random() * colors.length) - 1)

    element.style.transform = `
        rotateZ(${(index * 360 / allItems.length)}deg)
        translate(${radius}px)
         rotateX(90deg)
    `

    element.firstChild.style.boxShadow = `0 0 100px 5px ${colors[randomNum]}`;
    element.firstChild.style.transform = `
        rotateY(${randomRotation}deg)
    `
}) 

}
















