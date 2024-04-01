objOrbit = document.querySelectorAll(".objOrbit")
iCon = document.querySelector(".item-con")
items =   document.querySelectorAll(".item-con li")

console.log(items)


let spacing = 0;
let radius = 240;
let autoRotate = true;
let rotateSpeed = 180;
let verticalAdjust = 0;
let verticalTiltAdjust = -90;
let itemsHeight = parseFloat(window.getComputedStyle(document.querySelector('.item-con li')).height)

console.log(itemsHeight)


// init();
// updateSettings();


if (autoRotate) {
    let animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    iCon.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

function settingsControl(){
    
}


function init(delayTime) {
    for (var i = 0; i < items.length; i++) {
        items[i].style.transform = "rotateZ(" + (i * (360 / items.length)) + "deg) translateY(" + radius + "px)";
        items[i].style.transition = "transform 1s";
        items[i].style.transitionDelay = delayTime || (items.length - i) / 4 + "s";
    }
   setTimeout(()=>{
    for (var i = 0; i < items.length; i++) {
        items[i].style.transform = ` 
        rotateZ(${i * (360/items.length)}deg) 
        translateY(${radius}px) 
        rotateX(${verticalTiltAdjust}deg) 
        translateY(${(itemsHeight/-2) - verticalAdjust }px) 
        rotateZ(0deg)
        
       ` ;


        
        items[i].style.transition = "transform 1s";
        items[i].style.transitionDelay = `0`;
    }


   
   }, 3000)
 
  }






console.log(items[1])
console.log(spacing)

document.querySelector("#widthSlider").addEventListener("input", (e)=>{
    items.forEach(item => {
        item.style.setProperty('--_width', `${e.currentTarget.value}px`);
    });
})

document.querySelector("#heightSlider").addEventListener("input", (e)=>{
    items.forEach(item => {
        item.style.setProperty('--_height', `${e.currentTarget.value}px`);
        itemsHeight = parseFloat(window.getComputedStyle(document.querySelector('.item-con li')).height)
        updateSettings()
    });
})

document.querySelector("#radiusSlider").addEventListener("input", (e)=>{
    radius = e.currentTarget.value;
    updateSettings()
})

document.querySelector("#verticalTiltAdjust").addEventListener("input", (e)=>{
    verticalTiltAdjust = e.currentTarget.value;
    updateSettings()
})

document.querySelector("#verticalAdjust").addEventListener("input", (e)=>{
    verticalAdjust = e.currentTarget.value;
    updateSettings()
})




function updateSettings(){
    for(let i = 0; i<items.length; i++){
        items[i].style.transform = ` 
        rotateZ(${i * (360/items.length)}deg) 
        translateY(${radius}px) 
        rotateX(${verticalTiltAdjust}deg) 
        translateY(${(itemsHeight/-2) - verticalAdjust }px) 
        rotateZ(0deg)
        
       ` ;
    }

}