let carousel = document.querySelector(".carousel-3d")
let items = carousel.querySelector('.carousel-items')
let item = items.children
let itemsBg;
let itemBg;
let allItems = [...item]

let setting = {
    width: 100,
    height: 170,
    radius: 240,
    rotateSpeed: 100,
    verticalAdjust: 0,
    verticalTiltAdjust: 0,
    autoRotate: true,
    background: true,
}

dds()


if(setting.background == true){
    createCarouselBg()
}
origin()
loadDefault();
init()


function dds(){
    for(li of item){

    if(li.innerHTML == ''){
        li.classList.add('empty');
    }
}
}
function transformSpeed(){
    for(li of allItems){
        li.style.transition = "transform 0s linear";
        
    }
  
    
}






for(li of allItems){
     li.addEventListener('mouseenter', () => { playSpin(false);console.log("something happens") })
    li.addEventListener('mouseleave', () => { playSpin(true) })
}

function playSpin(yes) {
    items.style.animationPlayState = (yes ? 'running' : 'paused');
    if(setting.background == true){
        itemsBg.style.animationPlayState = (yes ? 'running' : 'paused');
    }
    
}

function origin(){
    allItems.forEach((item) => {
        item.style.setProperty('--_height', `0px`);
        item.style.setProperty('--_width', `0px`);
        item.style.transform = `translateZ(400px)`;
    })
}

function init(delayTime, call) {
    

    setTimeout(() => {
        for (var i = 0; i < item.length; i++) {
            if (setting.background == true) {
                applyTransform(i, item[i], true, delayTime);
                applyTransform(i, itemBg[i], true, delayTime);
            } else { applyTransform(i, item[i], true, delayTime) }
        }

        setTimeout(() => {
            for (var i = 0; i < item.length; i++) {
                item[i].style.transition = "transform 1s";
                item[i].style.transitionDelay = `0`;
                applyTransform(i, item[i])
                if (setting.background == true){
                    itemBg[i].style.transition = "transform 1s";
                itemBg[i].style.transitionDelay = `0`;
                applyTransform(i, itemBg[i])
                }
            }
            
            
  
            setTimeout(()=>{
               transformSpeed();
             
            }, 1) 
        }, 5000)
       
    }, 1)
    
 
    applyEventListeners()
    


}


function updateSettings() {

    for (let i = 0; i < item.length; i++) {
        applyTransform(i, item[i])
        if(setting.background == true){
             applyTransform(i, itemBg[i])
        }
       
    }
    updateStats();
}

function applyTransform(index, element, init, delayTime) {

    switch (init) {
        case true:
            element.style.transition = "transform 1s, height 2s, width 2s";
            element.style.transitionDelay = delayTime || (item.length - index) / 4 + "s";
            element.style.setProperty('--_height', `${setting.height}px`);
            element.style.setProperty('--_width', `${setting.width}px`);

            if (setting.background == true && element == itemsBg[index]) {
                element.style.transform = `rotateZ(${(index * (360 / item.length))}deg) translateY(${setting.radius - 2}px)`;
            } else { element.style.transform = `rotateZ(${(index * (360 / item.length))}deg) translateY(${setting.radius}px)`; }
            break;

        default: if (setting.background == true && element == itemBg[index]) {
            element.style.transform = `
            rotateZ(${index * (360 / item.length)}deg) 
            translateY(${setting.radius - 2}px) 
            rotateX(${setting.verticalTiltAdjust - 90}deg) 
            translateY(${(setting.height / -2) - (setting.verticalAdjust)}px) 
            rotateZ(0deg)
         `;
        } else {
            element.style.transform = `
            rotateZ(${index * (360 / item.length)}deg) 
            translateY(${setting.radius}px) 
            rotateX(${setting.verticalTiltAdjust - 90}deg) 
            translateY(${( setting.height / -2) - (setting.verticalAdjust)}px) 
            rotateZ(0deg)
         `;

        }
    }

}

function updateStats() {
    document.querySelector("#widthVal").innerText = `Width: ${setting.width} px`;
    document.querySelector("#heightVal").innerText = `Height: ${setting.height} px`;
    document.querySelector("#radiusVal").innerText = `Radius: ${setting.radius} px`;
    document.querySelector("#verticalAdjustVal").innerText = `Vertical offset: ${setting.verticalAdjust} px`;
    document.querySelector("#verticalTiltAdjustVal").innerText = `Vertical offset: ${setting.verticalTiltAdjust} deg`;
}

function loadDefault() {
    document.querySelector("#widthSlider").value = setting.width;
    document.querySelector("#heightSlider").value = setting.height;
    document.querySelector("#radiusSlider").value = setting.radius;
    document.querySelector("#verticalAdjust").value = setting.verticalAdjust;
    document.querySelector("#verticalTiltAdjust").value = setting.verticalTiltAdjust;


    updateStats();
}

function createCarouselBg() {
    let ul = document.createElement("ul");
    ul.classList.add('carousel-items-bg')

    for (let i = 0; i < item.length; i++) {
        let li = document.createElement('li');
        if (item[i].innerHTML == '') {
            li.classList.add('empty')
        } else { li.classList.add('item-bg') }

        ul.append(li)
    }

    carousel.insertBefore(ul, carousel.firstChild);

    itemsBg = ul;
    itemBg = ul.children;
    allItems = [...item, ...itemBg]
    
}
function applyEventListeners() {
    document.querySelector("#widthSlider").addEventListener("input", (e) => {
        setting.width = e.currentTarget.value

        for (li of allItems) {
            li.style.setProperty('--_width', `${setting.width}px`);
        };


        updateSettings()

    })

    document.querySelector("#heightSlider").addEventListener("input", (e) => {
        setting.height = e.currentTarget.value

        for (li of allItems) {
            li.style.setProperty('--_height', `${setting.height}px`);
        };

        updateSettings()
    })

    document.querySelector("#radiusSlider").addEventListener("input", (e) => {
        setting.radius = e.currentTarget.value;
        updateSettings()
    })

    document.querySelector("#verticalTiltAdjust").addEventListener("input", (e) => {
        setting.verticalTiltAdjust = e.currentTarget.value;
        updateSettings()
    })

    document.querySelector("#verticalAdjust").addEventListener("input", (e) => {
        setting.verticalAdjust = e.currentTarget.value;
        updateSettings()
    })
}

function editPsudo() {
    var targetElement = document.getElementById('targetElement');

    // Access the computed styles of the element
    var styles = window.getComputedStyle(targetElement, ':before');

    // You can then manipulate the styles or content of the actual element
    targetElement.style.color = 'blue';

    // Or change the content
    targetElement.innerHTML = 'New content for the element';
}


