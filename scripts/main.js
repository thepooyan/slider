$(function () {
    const mainSlider = dc.id("mainSlider");
    if (mainSlider) {
        new HomeSlider(mainSlider);
    }
})

class HomeSlider {
    constructor(container) {
        this.nextBtn = container.query("#right");
        this.prevBtn = container.query("#left");
        this.images = container.queries('img');
        this.anchor = container.query('a');
        this.dotsContainer = container.query('.dots');
        
        this.init();
    }
    get activeImage() {
        return this.images[this.activeIndex];
    }
    get activeIndex() {
       return this.activeImageIndexVal ? this.activeImageIndexVal : 0;
    }
    set activeIndex(val) {
        if (val > this.images.length-1) val = 0; 
        if (val < 0) val = this.images.length - 1;
        
        this.activeImageIndexVal = val;
    }
    init() {
        this.images[0].classList.add('active');
        this.anchor.href = this.images[0].dataset.href;
        this.createDots();

        this.nextBtn.addEventListener('click', () => {
            this.next();
        })
        this.prevBtn.addEventListener('click', () => {
            this.prev();
        })

    }
    createDots() {
        let allDots = [];

        this.images.forEach((i, index) => {
            let dot = document.createElement('span');
            allDots.push(dot);

            dot.addEventListener('click', ()=>{
                this.move(index);
                allDots.forEach(i => i.classList.remove('active'));
                dot.classList.add('active');
            });
            this.dotsContainer.appendChild(dot);
        })

        allDots[0].classList.add('active');
    }
    next() {
        let index = this.activeIndex + 1; 
        this.move(index);
    }
    prev() {
        let index = this.activeIndex - 1; 
        this.move(index);
    }
    move(index) {
        this.activeImage.classList.remove('active');
        this.activeIndex = index;
        this.activeImage.classList.add('active');
        this.anchor.href = this.activeImage.dataset.href;
    }
}