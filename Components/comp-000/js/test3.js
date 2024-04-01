function Carousel(selector) {
    this.objOrbit = document.querySelectorAll(selector);
    this.items = this.objOrbit[0].children[0].children;

    this.spacing = 0;
    this.radius = 240;
    this.autoRotate = true;
    this.rotateSpeed = 60;
    this.verticalAdjust = 0;
    this.verticalTiltAdjust = -90;
    this.itemsHeight = parseFloat(window.getComputedStyle(document.querySelector('.item-con li')).height);

    this.init();
    this.setupAutoRotate();

    // Event listeners
    document.querySelector("#widthSlider").addEventListener("input", (e) => this.updateWidth(e));
    document.querySelector("#heightSlider").addEventListener("input", (e) => this.updateHeight(e));
    document.querySelector("#radiusSlider").addEventListener("input", (e) => this.updateRadius(e));
    document.querySelector("#verticalTiltAdjust").addEventListener("input", (e) => this.updateVerticalTilt(e));
    document.querySelector("#verticalAdjust").addEventListener("input", (e) => this.updateVerticalAdjust(e));
}

Carousel.prototype.init = function (delayTime) {
    for (let i = 0; i < this.items.length; i++) {
        this.items[i].style.transform = "rotateZ(" + (i * (360 / this.items.length)) + "deg) translateY(" + this.radius + "px)";
        this.items[i].style.transition = "transform 1s";
        this.items[i].style.transitionDelay = delayTime || (this.items.length - i) / 4 + "s";
    }

    setTimeout(() => {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].style.transform = `
                rotateZ(${i * (360 / this.items.length)}deg)
                translateY(${this.radius}px)
                rotateX(${this.verticalTiltAdjust}deg)
                translateY(${(this.itemsHeight / -2) - this.verticalAdjust}px)
                rotateZ(0deg)
            `;

            this.items[i].style.transition = "transform 1s";
            this.items[i].style.transitionDelay = `0`;
        }
    }, 3000);
};

Carousel.prototype.setupAutoRotate = function () {
    if (this.autoRotate) {
        let animationName = (this.rotateSpeed > 0 ? 'spin' : 'spinRevert');
        for (let items of this.objOrbit[0].children) {
            items.style.animation = `${animationName} ${Math.abs(this.rotateSpeed)}s infinite linear`;
        }
    }
};

Carousel.prototype.updateWidth = function (e) {
    for (let item of this.items) {
        item.style.setProperty('--_width', `${e.currentTarget.value}px`);
    }
};

Carousel.prototype.updateHeight = function (e) {
    for (let item of this.items) {
        item.style.setProperty('--_height', `${e.currentTarget.value}px`);
        this.itemsHeight = parseFloat(window.getComputedStyle(document.querySelector('.item-con li')).height);
        this.updateSettings();
    }
};

Carousel.prototype.updateRadius = function (e) {
    this.radius = e.currentTarget.value;
    this.updateSettings();
};

Carousel.prototype.updateVerticalTilt = function (e) {
    this.verticalTiltAdjust = e.currentTarget.value;
    this.updateSettings();
};

Carousel.prototype.updateVerticalAdjust = function (e) {
    this.verticalAdjust = e.currentTarget.value;
    this.updateSettings();
};

Carousel.prototype.updateSettings = function () {
    for (let i = 0; i < this.items.length; i++) {
        this.items[i].style.transform = `
            rotateZ(${i * (360 / this.items.length)}deg)
            translateY(${this.radius}px)
            rotateX(${this.verticalTiltAdjust}deg)
            translateY(${(this.itemsHeight / -2) - this.verticalAdjust}px)
            rotateZ(0deg)
        `;
    }
};

// Example usage
const hello = new Carousel(".objOrbit");
const water = new Carousel(".objOrbit");
