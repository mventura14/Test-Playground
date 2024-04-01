let carousel = document.querySelector('.carousel-3d')
let allplanes = Array.from(carousel.children)
let plane = carousel.querySelector('.carousel-plane')
let itemGroup = Array.from(plane.children)

console.log(itemGroup);



let settings = {
    // carousel position
    
    carouselRX: 75,
    carouselRY: 0,
    carouselRZ: 0,
    carouselTX: 0,
    carouselTY: 0,
    carouselTZ: 0,

    // General
    rotateSpeed: 100,
    autoRotate: true,
    radius: 200,
    itemsWidth: 100,
    itemsHeight: 170*2,
    
    // carousel items
    
    itemsRX: -90,
    itemsRY: 0,
    itemsRZ: 0,
    itemsTX: 0,
    itemsTY: 0,
    itemsTZ: 0,
    



}

applyTransform()

let sliders = document.querySelectorAll('.carousel-settings input')

sliders.forEach((element)=>{
    element.addEventListener('input',settingsControl)
})

console.log(sliders)


function settingsControl(e){
    let element = document.querySelector('#carouselElementSelection').value
    const selection = [carousel]
    console.log(e.currentTarget.id)
    
    if(element == 'carousel'){
        switch(e.currentTarget.id){
            case 'rotateX':
                settings.carouselRX = e.currentTarget.value
                console.log(e.currentTarget.value)
            break;
            case 'rotateY':
                settings.carouselRY = e.currentTarget.value
                console.log(settings.carouselRY)
            break;
            case 'rotateZ':
                settings.carouselRZ = e.currentTarget.value
                console.log(settings.carouselRZ)
            break;
            case 'translateX':
                settings.carouselTX = e.currentTarget.value
                console.log(settings.carouselTX)
            break;
            case 'translateY':
                settings.carouselTY = e.currentTarget.value
                console.log(settings.carouselTY)
            break;
            case 'translateZ':
                settings.carouselTZ = e.currentTarget.value
                console.log(settings.carouselTZ)
            break;
        }   
    }else if(element == 'items'){
        switch(e.currentTarget.id){
            case 'rotateX':
                settings.itemsRX = e.currentTarget.value
            break;
            case 'rotateY':
                settings.itemsRY = e.currentTarget.value
            break;
            case 'rotateZ':
                settings.itemsRZ = e.currentTarget.value   
            break;
            case 'translateX':
                settings.itemsTX = e.currentTarget.value
            break;
            case 'translateY':
                settings.itemsTY = e.currentTarget.value
            break;
            case 'translateZ':
                settings.itemsTZ = e.currentTarget.value
            break;
        }  

    }
    
    applyTransform()
}

function applySettings(){
    itemGroup.style.setProperty('--_height', `${e.currentTarget.value}px`)


}



function applyTransform(){
    carousel.style.transform = `
        translateX(${settings.carouselTX}px)
        translateY(${settings.carouselTY}px)
        translateZ(${settings.carouselTZ}px)
        rotateX(${settings.carouselRX}deg)
        rotateY(${settings.carouselRY}deg)
        rotateZ(${settings.carouselRZ}deg)
    `

    itemGroup.forEach((element,index)=>{
        element.style.transform = `
        rotateZ(${index * 360 / itemGroup.length}deg)
        translateY(${settings.radius}px)

        translateX(${settings.itemsTX}px)
        translateY(${settings.itemsTY}px)
        translateZ(${settings.itemsTZ + (settings.itemsHeight/2)}px)
        rotateX(${(settings.itemsRX)}deg) 
        rotateY(${settings.itemsRY}deg) 
        rotateZ(${settings.itemsRZ}deg)
    `
    })

}
allplanes.forEach((element)=>{
    element.style.transform = `
    translateY(10px)

`
    
})




function origin() {
    allItems.forEach((item) => {
        item.style.setProperty('--_height', `0px`);
        item.style.setProperty('--_width', `0px`);
        item.style.transform = `translateZ(400px)`;
    })
}




if (settings.autoRotate) {
    let animationName = (settings.rotateSpeed > 0 ? 'spin' : 'spinRevert');

    allplanes.forEach((element) => {
        element.style.animation = `${animationName} ${Math.abs(settings.rotateSpeed)}s infinite linear`;
    })

}

function playSpin(yes) {
    items.style.animationPlayState = (yes ? 'running' : 'paused');
}